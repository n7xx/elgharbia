import { useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Beef, ArrowRight, Share2, Check, Flame } from "lucide-react";
import { products, categories } from "@/data/products";
import OptimizedImage from "@/components/common/OptimizedImage";
import { calculateLineTotal, parseWeightInput, clampWeight, MIN_WEIGHT_KG } from "@/lib/priceUtils";

const ProductDetails = () => {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  const { addItem, items, updateQuantity } = useCart();

  const product = products.find((p) => p.id === id) || null;
  const category = product?.category_id
    ? categories.find((c) => c.id === product.category_id) || null
    : null;

  const cartQty = product
    ? items.find((i) => i.productId === product.id)?.quantity || 0
    : 0;

  const byKilo = product?.unit === "كيلو";
  const [weightKg, setWeightKg] = useState(1);
  const [weightInput, setWeightInput] = useState("1");

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
    const qty = byKilo ? weightKg : 1;
    addItem(
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        unit: product.unit,
        imageUrl: product.image_url,
      },
      qty
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

  if (!product) {
    return (
      <Layout>
        <div className="section-padding text-center min-h-[60vh] flex items-center justify-center flex-col gap-4">
          <Beef className="w-16 h-16 text-muted-foreground/30" />
          <p className="text-xl text-muted-foreground">المنتج غير موجود</p>
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

  return (
    <Layout>
      <div className="bg-muted/50 border-b border-border">
        <div className="container-rtl py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-primary transition-colors">المنتجات</Link>
            {category && (
              <>
                <span>/</span>
                <Link to="/products" className="hover:text-primary transition-colors">{category.name}</Link>
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
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted relative">
              <OptimizedImage
                src={product.image_url}
                alt={product.name}
                className="w-full h-full rounded-2xl"
                aspectRatio="1"
              />
              {product.is_offer && (
                <div className="absolute top-3 right-3">
                  <span className="bg-destructive text-destructive-foreground text-sm font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <Flame className="w-4 h-4" />
                    {product.offer_badge || "عرض"}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col">
              {category && (
                <span className="text-sm text-primary font-semibold mb-2">{category.name}</span>
              )}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground mb-3">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-black text-primary">
                  {byKilo ? calculateLineTotal(product.price, weightKg) : product.price} ج.م
                </span>
                <span className="text-muted-foreground">/ {product.unit}</span>
              </div>

              {byKilo && (
                <div className="mb-4">
                  <label className="text-sm font-medium text-foreground block mb-2">الوزن (كيلو)</label>
                  <input
                    type="number"
                    min={MIN_WEIGHT_KG}
                    step="0.25"
                    inputMode="decimal"
                    value={weightInput}
                    onChange={handleWeightChange}
                    onBlur={handleWeightBlur}
                    className="w-32 rounded-md border border-input bg-background px-3 py-2 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    aria-label="الوزن بالكيلو"
                  />
                </div>
              )}

              {product.description && (
                <div className="mb-6">
                  <h3 className="font-bold text-foreground mb-2">التفاصيل</h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              )}

              <div className="mt-auto flex flex-col gap-3 pt-4 border-t border-border">
                {cartQty === 0 ? (
                  <Button size="lg" className="w-full gap-2 text-base" onClick={handleAdd}>
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
                      aria-label="الكمية بالكيلو"
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
                    <span className="font-black text-2xl w-8 text-center">{cartQty}</span>
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

                <Button variant="outline" className="gap-2" onClick={handleShare}>
                  {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
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
