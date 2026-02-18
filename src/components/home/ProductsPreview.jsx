import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/common/SectionHeader";
import AnimatedSection from "@/components/common/AnimatedSection";
import AnimatedItem from "@/components/common/AnimatedItem";
import { getAllProducts } from "@/api/productsApi";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function normaliseProduct(row) {
  return {
    id: Number(row.id_pro ?? row.id),
    name: row.name_pro ?? row.name ?? "",
    price: Number(row.price_pro ?? row.price ?? 0),
    description: row.desc_pro ?? row.description ?? "",
    img: row.img_pro ?? row.img ?? null,
    unit: row.unit_pro ?? row.unit ?? "قطعة",
    discount_pro: row.discount_pro ?? "",
    is_available: row.active_pro !== "1" && row.active_pro !== 1,
  };
}

function hasDiscount(p) {
  const raw = String(p.discount_pro ?? "").trim();
  return raw && Number.isFinite(parseFloat(raw)) && parseFloat(raw) > 0;
}

// ─── Component ────────────────────────────────────────────────────────────────

const ProductsPreview = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getAllProducts()
      .then((rows) => {
        if (cancelled) return;
        const available = rows
          .map(normaliseProduct)
          .filter((p) => p.is_available && !hasDiscount(p)); // no discounted products
        setProducts(available.slice(0, 4)); // max 4 in preview
      })
      .catch((err) => console.error("[ProductsPreview] fetch error:", err))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="section-padding bg-muted">
      <div className="container-rtl">
        <AnimatedSection>
          <SectionHeader
            title="منتجاتنا"
            subtitle="تشكيلة متنوعة من اللحوم البلدي والمشويات اللي قلبك يحبها"
          />
        </AnimatedSection>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-16 gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm">جارٍ تحميل المنتجات…</span>
          </div>
        )}

        {/* Grid */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-10">
            {products.map((product, index) => (
              <AnimatedItem key={product.id} index={index}>
                <Link
                  to="/products"
                  className="group block bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-square relative overflow-hidden">
                    {product.img ? (
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <ShoppingCart className="w-10 h-10 text-muted-foreground opacity-30" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-3 right-3 left-3">
                      <span className="inline-block bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-md">
                        {product.price} ج.م/{product.unit}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-foreground mb-1">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {product.description || ""}
                    </p>
                  </div>
                </Link>
              </AnimatedItem>
            ))}
          </div>
        )}

        <AnimatedSection delay={0.4}>
          <div className="text-center">
            <Button variant="cta" size="lg" asChild>
              <Link to="/products">
                شوف كل المنتجات
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ProductsPreview;
