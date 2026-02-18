import { useState, useCallback, useEffect, useMemo } from "react";
import { useCart } from "@/contexts/CartContext";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Plus,
  Minus,
  Beef,
  Flame,
  UtensilsCrossed,
  ChefHat,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import {
  calculateLineTotal,
  parseWeightInput,
  clampWeight,
  MIN_WEIGHT_KG,
} from "@/lib/priceUtils";
import { getAllProducts } from "@/api/productsApi";
import { getAllCategories } from "@/api/categoriesApi";

// ─── Category icon map (extend as needed) ────────────────────────────────────
const CATEGORY_ICONS = {
  "لحوم بلدي": <Beef className="w-4 h-4" />,
  "لحوم ضاني": <Beef className="w-4 h-4" />,
  "الحلويات والأحشاء": <Beef className="w-4 h-4" />,
  المشويات: <Flame className="w-4 h-4" />,
  الطواجن: <ChefHat className="w-4 h-4" />,
  الوجبات: <UtensilsCrossed className="w-4 h-4" />,
  "صواني قصر الغربية": <UtensilsCrossed className="w-4 h-4" />,
};

// ─── Normalise raw DB row → UI-friendly shape ─────────────────────────────────
function normaliseProduct(row) {
  return {
    id: Number(row.id_pro ?? row.id),
    name: row.name_pro ?? row.name ?? "",
    price: Number(row.price_pro ?? row.price ?? 0),
    category: row.name_cat ?? row.category ?? "",
    id_cat: Number(row.id_cat ?? 0),
    description: row.desc_pro ?? row.description ?? "",
    img: row.img_pro ?? row.img ?? null,
    unit: row.unit_pro ?? row.unit ?? "قطعة",
    is_available: row.active_pro !== "1" && row.active_pro !== 1,
    is_offer: row.is_offer === "1" || row.is_offer === 1,
    offer_badge: row.offer_badge ?? "",
    discount_pro: row.discount_pro ?? "",
  };
}

// ─── Compute display price (supports percent / fixed discount) ────────────────
function getDisplayPrice(product) {
  const price = product.price;
  const discountRaw = product.discount_pro ?? "";

  if (!discountRaw) return { displayPrice: price, originalPrice: null };

  if (discountRaw.includes("%")) {
    const pct = parseFloat(discountRaw);
    if (Number.isFinite(pct) && pct > 0) {
      return {
        displayPrice: Math.round(price * (1 - pct / 100) * 100) / 100,
        originalPrice: price,
      };
    }
  } else {
    const fixed = parseFloat(discountRaw);
    if (Number.isFinite(fixed) && fixed > 0 && fixed < price) {
      return { displayPrice: price - fixed, originalPrice: price };
    }
  }

  return { displayPrice: price, originalPrice: null };
}

// ─── Main component ───────────────────────────────────────────────────────────
const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addItem, items, updateQuantity } = useCart();

  // ── Fetch products + categories in parallel on mount ──────────────────────
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.all([getAllProducts(), getAllCategories()])
      .then(([rawProducts, rawCategories]) => {
        if (cancelled) return;

        const normProducts = rawProducts.map(normaliseProduct);

        // Only active (non-archived) categories
        const activeCats = rawCategories.filter((c) => !c.archived);

        // Count only available products per category
        const catsWithCount = activeCats.map((cat) => ({
          ...cat,
          productCount: normProducts.filter((p) => {
            const raw = String(p.discount_pro ?? "").trim();
            const discounted =
              raw && Number.isFinite(parseFloat(raw)) && parseFloat(raw) > 0;
            return p.id_cat === cat.id && p.is_available && !discounted;
          }).length,
        }));

        // Only show categories that have at least 1 available product
        const catsToShow = catsWithCount.filter((c) => c.productCount > 0);

        setProducts(normProducts);
        setCategories(catsToShow);
        setActiveCategory(catsToShow[0]?.id ?? null);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("[Products] fetch error:", err);
        setError("تعذّر تحميل المنتجات. يرجى التحقق من الاتصال بالخادم.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // A product "has discount" only if discount_pro is a number > 0 or a percent > 0%
  const hasDiscount = (p) => {
    const raw = String(p.discount_pro ?? "").trim();
    if (!raw) return false;
    const val = parseFloat(raw);
    return Number.isFinite(val) && val > 0;
  };

  // Exclude discounted products — they appear in the Offers page only
  const availableProducts = useMemo(
    () => products.filter((p) => p.is_available && !hasDiscount(p)),
    [products],
  );

  const filteredProducts = useMemo(
    () =>
      activeCategory
        ? availableProducts.filter((p) => p.id_cat === activeCategory)
        : availableProducts,
    [availableProducts, activeCategory],
  );

  const activeCategoryData = useMemo(
    () => categories.find((c) => c.id === activeCategory),
    [categories, activeCategory],
  );

  const getCartQuantity = useCallback(
    (productId) => items.find((i) => i.productId === productId)?.quantity || 0,
    [items],
  );

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <Layout>
        <section className="bg-gradient-hero py-10 lg:py-14">
          <div className="container-rtl text-center text-primary-foreground">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3">
              منتجاتنا
            </h1>
          </div>
        </section>
        <section className="section-padding bg-background">
          <div className="flex items-center justify-center py-24 gap-3 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>جارٍ تحميل المنتجات…</span>
          </div>
        </section>
      </Layout>
    );
  }

  // ── Error state ────────────────────────────────────────────────────────────
  if (error) {
    return (
      <Layout>
        <section className="section-padding bg-background">
          <div className="text-center py-24 text-destructive">{error}</div>
        </section>
      </Layout>
    );
  }

  // ── Main render ────────────────────────────────────────────────────────────
  return (
    <Layout>
      <section className="bg-gradient-hero py-10 lg:py-14">
        <div className="container-rtl text-center text-primary-foreground">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3">
            منتجاتنا
          </h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            ملوك اللحمة البلدي في مصر - تشكيلة متنوعة من اللحوم الطازة والمشويات
            والأكل الجاهز
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-rtl">
          {/* ── Category tabs ─────────────────────────────────────────────── */}
          {categories.length > 0 && (
            <div className="mb-8 -mx-4 px-4">
              <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-200 border-2 shrink-0",
                        isActive
                          ? "bg-primary text-primary-foreground border-primary shadow-md"
                          : "bg-card text-foreground border-border hover:border-primary/40 hover:bg-muted",
                      )}
                    >
                      {CATEGORY_ICONS[cat.name] || (
                        <ShoppingCart className="w-4 h-4" />
                      )}
                      <span>{cat.name}</span>
                      <span
                        className={cn(
                          "text-xs px-1.5 py-0.5 rounded-md",
                          isActive
                            ? "bg-primary-foreground/20"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        {cat.productCount}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Active category title ──────────────────────────────────────── */}
          {activeCategoryData && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {activeCategoryData.name}
              </h2>
              {activeCategoryData.description && (
                <p className="text-muted-foreground mt-1">
                  {activeCategoryData.description}
                </p>
              )}
              <div className="mt-2 h-1 w-16 bg-primary rounded-full" />
            </div>
          )}

          {/* ── Products grid ──────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                cartQty={getCartQuantity(product.id)}
                addItem={addItem}
                updateQuantity={updateQuantity}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p className="text-lg">لا توجد منتجات في هذا التصنيف حالياً</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

// ─── Product Card ─────────────────────────────────────────────────────────────

const WEIGHT_STEP = 0.5;
const isByKilo = (unit) => unit === "كيلو";

const ProductCard = ({ product, cartQty, addItem, updateQuantity }) => {
  const [weightKg, setWeightKg] = useState(1);
  const [weightInput, setWeightInput] = useState("1");

  const byKilo = isByKilo(product.unit);
  const { displayPrice, originalPrice } = getDisplayPrice(product);
  const shownPrice = byKilo
    ? calculateLineTotal(displayPrice, weightKg)
    : displayPrice;

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
    } else if (/^\d*\.?\d*$/.test(raw)) {
      setWeightInput(raw);
    }
  }, []);

  const handleWeightBlur = useCallback(() => {
    const parsed = parseWeightInput(weightInput);
    const clamped = parsed !== null ? clampWeight(parsed) : MIN_WEIGHT_KG;
    setWeightKg(clamped);
    setWeightInput(String(clamped));
  }, [weightInput]);

  const handleAdd = () => {
    addItem(
      {
        productId: product.id,
        name: product.name,
        price: displayPrice,
        unit: product.unit,
        imageUrl: product.img,
      },
      byKilo ? weightKg : 1,
    );
  };

  const handleCartQtyChange = useCallback(
    (newVal) => {
      const n = Number(newVal);
      if (!Number.isFinite(n) || n < MIN_WEIGHT_KG) {
        updateQuantity(product.id, 0);
        return;
      }
      updateQuantity(product.id, n);
    },
    [product.id, updateQuantity],
  );

  const handleCartWeightBlur = useCallback(
    (e) => {
      const parsed = parseWeightInput(e.target.value);
      if (parsed !== null) handleCartQtyChange(parsed);
      else handleCartQtyChange(cartQty);
    },
    [cartQty, handleCartQtyChange],
  );

  return (
    <div className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col">
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
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <ShoppingCart className="w-10 h-10 opacity-30" />
          </div>
        )}

        {/* Offer badge */}
        {product.is_offer && (
          <div className="absolute top-2 right-2">
            <span className="bg-destructive text-destructive-foreground text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <Flame className="w-3 h-3" />
              {product.offer_badge || "عرض"}
            </span>
          </div>
        )}

        {/* Price badge */}
        <div className="absolute bottom-2 right-2">
          {originalPrice ? (
            <span className="bg-primary text-primary-foreground text-xs sm:text-sm font-bold px-2.5 py-1 rounded-lg shadow-md flex flex-col items-end leading-tight">
              <span className="line-through text-[10px] opacity-70">
                {originalPrice} ج.م
              </span>
              <span>{shownPrice} ج.م</span>
            </span>
          ) : (
            <span className="bg-primary text-primary-foreground text-xs sm:text-sm font-bold px-2.5 py-1 rounded-lg shadow-md">
              {shownPrice} ج.م
            </span>
          )}
        </div>
      </Link>

      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-bold text-foreground text-sm sm:text-base mb-0.5 line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-muted-foreground text-xs mb-1">/{product.unit}</p>

        {/* Weight input for kilo products */}
        {byKilo && (
          <div className="mb-2">
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
              aria-label="الوزن بالكيلو"
            />
          </div>
        )}

        {product.description && (
          <p className="text-muted-foreground text-xs mb-2 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Cart controls */}
        <div className="mt-auto pt-2">
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
                onClick={() => {
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
                aria-label="الكمية بالكيلو"
              />
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 sm:h-8 sm:w-8"
                onClick={() =>
                  updateQuantity(product.id, cartQty + WEIGHT_STEP)
                }
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
                onClick={() => updateQuantity(product.id, cartQty - 1)}
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
                onClick={() => updateQuantity(product.id, cartQty + 1)}
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

export default Products;
