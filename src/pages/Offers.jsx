import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, Flame, Loader2, Tag } from "lucide-react";
import { getAllProducts } from "@/api/productsApi";
import {
  calculateLineTotal,
  parseWeightInput,
  clampWeight,
  MIN_WEIGHT_KG,
} from "@/lib/priceUtils";

function normaliseProduct(row) {
  return {
    id: Number(row.id_pro ?? row.id),
    name: row.name_pro ?? row.name ?? "",
    price: Number(row.price_pro ?? row.price ?? 0),
    category: row.name_cat ?? row.category ?? "",
    description: row.desc_pro ?? row.description ?? "",
    img: row.img_pro ?? row.img ?? null,
    unit: row.unit_pro ?? row.unit ?? "قطعة",
    discount_pro: row.discount_pro ?? "",
    is_available: row.active_pro !== "1" && row.active_pro !== 1,
  };
}
function getDiscountInfo(product) {
  const price = product.price;
  const discountRaw = product.discount_pro ?? "";
  if (!discountRaw) return null;

  if (discountRaw.includes("%")) {
    const pct = parseFloat(discountRaw);
    if (Number.isFinite(pct) && pct > 0) {
      return {
        displayPrice: Math.round(price * (1 - pct / 100) * 100) / 100,
        originalPrice: price,
        badge: `خصم ${pct}%`,
        pct,
      };
    }
  } else {
    const fixed = parseFloat(discountRaw);
    if (Number.isFinite(fixed) && fixed > 0 && fixed < price) {
      return {
        displayPrice: price - fixed,
        originalPrice: price,
        badge: `وفّر ${fixed} ج.م`,
        pct: Math.round((fixed / price) * 100),
      };
    }
  }
  return null;
}

const isByKilo = (unit) => unit === "كيلو";
const WEIGHT_STEP = 0.5;

const Offers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addItem, items, updateQuantity } = useCart();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getAllProducts()
      .then((rows) => {
        if (cancelled) return;
        const offers = rows.map(normaliseProduct).filter((p) => {
          const raw = String(p.discount_pro ?? "").trim();
          return (
            p.is_available &&
            raw &&
            Number.isFinite(parseFloat(raw)) &&
            parseFloat(raw) > 0
          );
        });
        setProducts(offers);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("[Offers] fetch error:", err);
        setError("تعذّر تحميل العروض. يرجى التحقق من الاتصال.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const getCartQty = useCallback(
    (id) => items.find((i) => i.productId === id)?.quantity || 0,
    [items],
  );

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-hero py-10 lg:py-14">
        <div className="container-rtl text-center text-primary-foreground">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/20 rounded-full px-4 py-2 mb-4">
            <Flame className="w-5 h-5" />
            <span className="font-bold">عروض حصرية</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3">
            كل العروض
          </h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            أفضل الأسعار على أجود اللحوم — عروض بتتجدد باستمرار
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-rtl">
          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-24 gap-3 text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>جارٍ تحميل العروض…</span>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="text-center py-24 text-destructive">{error}</div>
          )}

          {/* Empty */}
          {!loading && !error && products.length === 0 && (
            <div className="text-center py-24 text-muted-foreground">
              <Tag className="w-14 h-14 mx-auto mb-4 opacity-30" />
              <p className="text-xl font-bold mb-2">مفيش عروض دلوقتي</p>
              <p className="text-sm">
                متابعنا عشان تعرف أول ما تنزل عروض جديدة
              </p>
            </div>
          )}

          {!loading && !error && products.length > 0 && (
            <>
              <p className="text-muted-foreground mb-6 text-sm">
                {products.length}{" "}
                {products.length === 1 ? "عرض متاح" : "عرض متاح"}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                {products.map((product) => (
                  <OfferCard
                    key={product.id}
                    product={product}
                    cartQty={getCartQty(product.id)}
                    addItem={addItem}
                    updateQuantity={updateQuantity}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

const OfferCard = ({ product, cartQty, addItem, updateQuantity }) => {
  const [weightKg, setWeightKg] = useState(1);
  const [weightInput, setWeightInput] = useState("1");

  const byKilo = isByKilo(product.unit);
  const info = getDiscountInfo(product);
  const basePrice = info?.displayPrice ?? product.price;
  const shownPrice = byKilo
    ? calculateLineTotal(basePrice, weightKg)
    : basePrice;

  const handleWeightChange = useCallback((e) => {
    const raw = e.target.value;
    if (raw === "" || raw === ".") {
      setWeightInput(raw);
      return;
    }
    const parsed = parseWeightInput(raw);
    if (parsed !== null) {
      setWeightKg(parsed);
      setWeightInput(String(parsed));
    } else if (/^\d*\.?\d*$/.test(raw)) setWeightInput(raw);
  }, []);

  const handleWeightBlur = useCallback(() => {
    const parsed = parseWeightInput(weightInput);
    const clamped = parsed !== null ? clampWeight(parsed) : MIN_WEIGHT_KG;
    setWeightKg(clamped);
    setWeightInput(String(clamped));
  }, [weightInput]);

  const handleAdd = (e) => {
    e.preventDefault();
    addItem(
      {
        productId: product.id,
        name: product.name,
        price: basePrice,
        unit: product.unit,
        imageUrl: product.img,
      },
      byKilo ? weightKg : 1,
    );
  };

  const handleCartWeightBlur = useCallback(
    (e) => {
      const parsed = parseWeightInput(e.target.value);
      if (parsed !== null) updateQuantity(product.id, parsed);
      else updateQuantity(product.id, cartQty);
    },
    [cartQty, product.id, updateQuantity],
  );

  const stopProp = (e) => e.preventDefault();
  return (
    <div className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col border border-border">
      {/* ── Image — قابلة للضغط وتفتح التفاصيل ── */}
      <Link
        to={`/product/${product.id}`}
        className="aspect-[4/3] relative overflow-hidden bg-muted block"
      >
        {product.img ? (
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingCart className="w-10 h-10 text-muted-foreground opacity-30" />
          </div>
        )}

        {/* Discount badge */}
        {info && (
          <div className="absolute top-2 right-2">
            <span className="bg-destructive text-destructive-foreground text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <Flame className="w-3 h-3" />
              {info.badge}
            </span>
          </div>
        )}

        {/* Price badge */}
        <div className="absolute bottom-2 right-2">
          <span className="bg-primary text-primary-foreground text-xs sm:text-sm font-bold px-2.5 py-1 rounded-lg shadow-md flex flex-col items-end leading-tight">
            {info?.originalPrice && (
              <span className="line-through text-[10px] opacity-70">
                {info.originalPrice} ج.م
              </span>
            )}
            <span>{shownPrice} ج.م</span>
          </span>
        </div>
      </Link>

      {/* ── Info ── */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-bold text-foreground text-sm sm:text-base mb-0.5 line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-muted-foreground text-xs mb-1">/{product.unit}</p>
        {byKilo && (
          <div className="mb-2" onClick={stopProp}>
            <span className="text-muted-foreground text-xs block mb-1">
              الوزن:
            </span>
            <input
              type="number"
              min={MIN_WEIGHT_KG}
              step="0.25"
              inputMode="decimal"
              value={weightInput}
              onChange={handleWeightChange}
              onBlur={handleWeightBlur}
              className="w-full rounded-md border border-input bg-background px-2 py-1.5 text-xs font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        )}

        {product.description && (
          <p className="text-muted-foreground text-xs mb-2 line-clamp-2">
            {product.description}
          </p>
        )}
        <div className="mt-auto pt-2" onClick={stopProp}>
          {cartQty === 0 ? (
            <Button
              size="sm"
              className="w-full gap-1.5 text-xs sm:text-sm"
              onClick={handleAdd}
            >
              <Plus className="w-3.5 h-3.5" /> أضف للسلة
            </Button>
          ) : byKilo ? (
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 sm:h-8 sm:w-8"
                onClick={(e) => {
                  e.preventDefault();
                  const next = cartQty - WEIGHT_STEP;
                  if (next < MIN_WEIGHT_KG) updateQuantity(product.id, 0);
                  else updateQuantity(product.id, next);
                }}
              >
                <Minus className="w-3.5 h-3.5" />
              </Button>
              <input
                type="number"
                min={MIN_WEIGHT_KG}
                step="0.25"
                inputMode="decimal"
                value={cartQty}
                onChange={(e) => {
                  const v = e.target.value;
                  if (v === "" || v === ".") return;
                  const parsed = parseWeightInput(v);
                  if (parsed !== null) updateQuantity(product.id, parsed);
                }}
                onBlur={handleCartWeightBlur}
                className="w-12 sm:w-14 text-center rounded-md border border-input bg-background py-1 text-sm font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 sm:h-8 sm:w-8"
                onClick={(e) => {
                  e.preventDefault();
                  updateQuantity(product.id, cartQty + WEIGHT_STEP);
                }}
              >
                <Plus className="w-3.5 h-3.5" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 sm:h-8 sm:w-8"
                onClick={(e) => {
                  e.preventDefault();
                  updateQuantity(product.id, cartQty - 1);
                }}
              >
                <Minus className="w-3.5 h-3.5" />
              </Button>
              <span className="font-bold text-base sm:text-lg w-6 text-center">
                {cartQty}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 sm:h-8 sm:w-8"
                onClick={(e) => {
                  e.preventDefault();
                  updateQuantity(product.id, cartQty + 1);
                }}
              >
                <Plus className="w-3.5 h-3.5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Offers;
