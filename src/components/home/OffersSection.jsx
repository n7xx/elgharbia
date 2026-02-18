import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Flame, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      };
    }
  } else {
    const fixed = parseFloat(discountRaw);
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

const OffersSection = () => {
  const [offerProducts, setOfferProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
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
        setOfferProducts(offers.slice(0, 3)); // show max 3 in section
      })
      .catch((err) => console.error("[OffersSection] fetch error:", err))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Don't render section at all if no offers
  if (!loading && offerProducts.length === 0) return null;

  return (
    <section className="section-padding bg-brand-cream relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container-rtl relative z-10">
        <AnimatedSection className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-4 py-2 mb-4">
            <Flame className="w-5 h-5" />
            <span className="font-bold">شوف عروضنا النهارده</span>
          </div>
          <h2 className="text-2xl sm:text-2xl lg:text-4xl font-bold text-foreground mb-3">
            ادخل شوف العروض الحصرية اللي بنقدمها كل يوم
          </h2>
          <p className="text-muted-foreground text-lg">
            عروضنا بتتجدد يوميًا عشان نضمنلك أفضل الأسعار وأجود اللحوم والمشويات
          </p>
        </AnimatedSection>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-16 gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>جارٍ تحميل العروض…</span>
          </div>
        )}

        {/* Offer cards */}
        {!loading && (
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {offerProducts.map((product, index) => {
              const info = getDiscountInfo(product);
              return (
                <AnimatedItem key={product.id} index={index}>
                  <div className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover border border-border hover:-translate-y-1 transition-all duration-300">
                    <div className="aspect-square relative overflow-hidden">
                      {product.img ? (
                        <img
                          src={product.img}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <Flame className="w-10 h-10 text-muted-foreground opacity-30" />
                        </div>
                      )}
                      {/* Discount badge */}
                      <div className="absolute top-3 right-3">
                        <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                          <Flame className="w-3 h-3" />
                          {info?.badge ?? "عرض"}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {product.name}
                      </h3>
                      {product.description && (
                        <p className="text-muted-foreground mb-3 line-clamp-2">
                          {product.description}
                        </p>
                      )}
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-primary">
                          {info?.displayPrice ?? product.price} ج.م/
                          {product.unit}
                        </span>
                        {info?.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {info.originalPrice} ج.م
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </AnimatedItem>
              );
            })}
          </div>
        )}

        <AnimatedSection delay={0.4}>
          <div className="text-center">
            <Button variant="cta" size="lg" asChild>
              <Link to="/offers">
                ادخل شوف كل العروض
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default OffersSection;
