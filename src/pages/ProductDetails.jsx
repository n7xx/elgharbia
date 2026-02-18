import { useState, useCallback, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Minus,
  ArrowRight,
  Share2,
  Check,
  Flame,
  Loader2,
  ShoppingCart,
} from "lucide-react";
import { getProductById } from "@/api/productsApi";
import {
  calculateLineTotal,
  parseWeightInput,
  clampWeight,
  MIN_WEIGHT_KG,
} from "@/lib/priceUtils";

// ─── Helpers ──────────────────────────────────────────────────────────────────

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
  const raw = product.discount_pro ?? "";
  if (!raw) return null;

  if (raw.includes("%")) {
    const pct = parseFloat(raw);
    if (Number.isFinite(pct) && pct > 0) {
      return {
        displayPrice: Math.round(price * (1 - pct / 100) * 100) / 100,
        originalPrice: price,
        badge: `خصم ${pct}%`,
      };
    }
  } else {
    const fixed = parseFloat(raw);
    if (Number.isFinite(fixed) && fixed > 0 && fixed < price) {
      return {
        displayPrice: price - fixed,
        originalPrice: price,
        badge: `وفّر ${fixed} ج.م`,
      };
    }
  }
  return null;
}

// ─── Component ────────────────────────────────────────────────────────────────

const ProductDetails = () => {
  const { id } = useParams();
  const { addItem, items, updateQuantity } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [weightKg, setWeightKg] = useState(1);
  const [weightInput, setWeightInput] = useState("1");

  // ── Fetch product from API ─────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    getProductById(id)
      .then((row) => {
        if (cancelled) return;
        if (!row) {
          setError("notfound");
          return;
        }
        setProduct(normaliseProduct(row));
      })
      .catch(() => {
        if (!cancelled) setError("fetch");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const byKilo = product?.unit === "كيلو";
  const discountInfo = product ? getDiscountInfo(product) : null;
  const basePrice = discountInfo?.displayPrice ?? product?.price ?? 0;
  const shownPrice = byKilo
    ? calculateLineTotal(basePrice, weightKg)
    : basePrice;

  const cartQty = product
    ? items.find((i) => i.productId === product.id)?.quantity || 0
    : 0;

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

  const handleAdd = () => {
    if (!product) return;
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

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: product?.name, url });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center gap-3 text-muted-foreground">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>جارٍ تحميل المنتج…</span>
        </div>
      </Layout>
    );
  }

  // ── Not found / error ──────────────────────────────────────────────────────
  if (error || !product) {
    return (
      <Layout>
        <div className="section-padding text-center min-h-[60vh] flex items-center justify-center flex-col gap-4">
          <ShoppingCart className="w-16 h-16 text-muted-foreground/30" />
          <p className="text-xl text-muted-foreground">
            {error === "notfound" ? "المنتج غير موجود" : "تعذّر تحميل المنتج"}
          </p>
          <Link to="/products">
            <Button variant="outline" className="gap-2">
              <ArrowRight className="w-4 h-4" />
              العودة للمنتجات
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  // ── Main render ────────────────────────────────────────────────────────────
  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-muted/50 border-b border-border">
        <div className="container-rtl py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">
              الرئيسية
            </Link>
            <span>/</span>
            <Link
              to="/products"
              className="hover:text-primary transition-colors"
            >
              المنتجات
            </Link>
            {product.category && (
              <>
                <span>/</span>
                <Link
                  to="/products"
                  className="hover:text-primary transition-colors"
                >
                  {product.category}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-foreground font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <section className="section-padding bg-background">
        <div className="container-rtl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            {/* Image */}
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted relative">
              {product.img ? (
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <ShoppingCart className="w-16 h-16 opacity-20" />
                </div>
              )}

              {/* Discount badge */}
              {discountInfo && (
                <div className="absolute top-3 right-3">
                  <span className="bg-destructive text-destructive-foreground text-sm font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <Flame className="w-4 h-4" />
                    {discountInfo.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col">
              {product.category && (
                <span className="text-sm text-primary font-semibold mb-2">
                  {product.category}
                </span>
              )}

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground mb-3">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-black text-primary">
                  {shownPrice} ج.م
                </span>
                <span className="text-muted-foreground">/ {product.unit}</span>
                {discountInfo?.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {byKilo
                      ? calculateLineTotal(discountInfo.originalPrice, weightKg)
                      : discountInfo.originalPrice}{" "}
                    ج.م
                  </span>
                )}
              </div>

              {/* Weight input for kilo products */}
              {byKilo && (
                <div className="mb-4">
                  <label className="text-sm font-medium text-foreground block mb-2">
                    الوزن (كيلو)
                  </label>
                  <input
                    type="number"
                    min={MIN_WEIGHT_KG}
                    step="0.25"
                    inputMode="decimal"
                    value={weightInput}
                    onChange={handleWeightChange}
                    onBlur={handleWeightBlur}
                    className="w-32 rounded-md border border-input bg-background px-3 py-2 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              )}

              {/* Description */}
              {product.description && (
                <div className="mb-6">
                  <h3 className="font-bold text-foreground mb-2">التفاصيل</h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Cart controls */}
              <div className="mt-auto flex flex-col gap-3 pt-4 border-t border-border">
                {cartQty === 0 ? (
                  <Button
                    size="lg"
                    className="w-full gap-2 text-base"
                    onClick={handleAdd}
                  >
                    <Plus className="w-5 h-5" /> أضف للسلة
                  </Button>
                ) : byKilo ? (
                  <div className="flex items-center justify-center gap-4 bg-muted rounded-xl p-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10"
                      onClick={() => {
                        const next = cartQty - 0.5;
                        if (next < MIN_WEIGHT_KG) updateQuantity(product.id, 0);
                        else updateQuantity(product.id, next);
                      }}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <input
                      type="number"
                      min={MIN_WEIGHT_KG}
                      step="0.25"
                      inputMode="decimal"
                      value={cartQty}
                      onChange={(e) => {
                        const parsed = parseWeightInput(e.target.value);
                        if (parsed !== null) updateQuantity(product.id, parsed);
                      }}
                      onBlur={(e) => {
                        const parsed = parseWeightInput(e.target.value);
                        if (parsed !== null) updateQuantity(product.id, parsed);
                        else updateQuantity(product.id, cartQty);
                      }}
                      className="w-16 text-center rounded-md border border-input bg-background py-2 text-lg font-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10"
                      onClick={() => updateQuantity(product.id, cartQty + 0.5)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-4 bg-muted rounded-xl p-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10"
                      onClick={() => updateQuantity(product.id, cartQty - 1)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="font-black text-2xl w-8 text-center">
                      {cartQty}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10"
                      onClick={() => updateQuantity(product.id, cartQty + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                )}

                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={handleShare}
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                  {copied ? "تم نسخ الرابط" : "مشاركة المنتج"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetails;
