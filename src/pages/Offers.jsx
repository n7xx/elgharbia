import { useCart } from "@/contexts/CartContext";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Flame, Clock, Plus, Minus, Beef, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "@/data/products";
import OptimizedImage from "@/components/common/OptimizedImage";

const Offers = () => {
  const offerProducts = products.filter((p) => p.is_available && p.is_offer);
  const { addItem, items, updateQuantity } = useCart();

  const getCartQty = (productId) =>
    items.find((i) => i.productId === productId)?.quantity || 0;

  const handleAdd = (product) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      unit: product.unit,
      imageUrl: product.image_url,
    });
  };

  return (
    <Layout>
      <section className="bg-gradient-hero py-12 lg:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container-rtl text-center text-primary-foreground relative z-10">
          <div className="inline-flex items-center gap-2 bg-gold text-charcoal rounded-full px-4 py-2 mb-4">
            <Flame className="w-5 h-5" />
            <span className="font-bold">عروض مميزة</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">عروض الغربية</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            عروض حصرية على أجود أنواع اللحوم - اطلب دلوقتي واستفيد
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-gold">
            <Clock className="w-5 h-5" />
            <span>العروض محدودة - اطلب قبل ما تخلص</span>
          </div>
        </div>
      </section>

      {offerProducts.length === 0 ? (
        <div className="section-padding text-center">
          <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-muted-foreground/40" />
          <p className="text-lg text-muted-foreground">لا توجد عروض حالياً - تابعنا للعروض الجديدة</p>
        </div>
      ) : (
        <section className="section-padding bg-background">
          <div className="container-rtl">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {offerProducts.map((product) => {
                const cartQty = getCartQty(product.id);
                return (
                  <div
                    key={product.id}
                    className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col border-2 border-gold/30"
                  >
                    <Link to={`/product/${product.id}`} className="aspect-[4/3] relative overflow-hidden bg-muted block">
                      <OptimizedImage
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full group-hover:[&>img]:scale-105"
                        imgClassName="transition-transform duration-500"
                      />
                      <div className="absolute top-2 right-2">
                        <span className="bg-destructive text-destructive-foreground text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                          <Flame className="w-3 h-3" />
                          {product.offer_badge || "عرض"}
                        </span>
                      </div>
                      <div className="absolute bottom-2 right-2">
                        <span className="bg-primary text-primary-foreground text-xs sm:text-sm font-bold px-2.5 py-1 rounded-lg shadow-md">
                          {product.price} ج.م
                        </span>
                      </div>
                    </Link>

                    <div className="p-3 sm:p-4 flex flex-col flex-1">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-bold text-foreground text-sm sm:text-base mb-0.5 line-clamp-2 hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-muted-foreground text-xs mb-1">/{product.unit}</p>
                      {product.description && (
                        <p className="text-muted-foreground text-xs mb-2 line-clamp-2">{product.description}</p>
                      )}

                      <div className="mt-auto pt-2">
                        {cartQty === 0 ? (
                          <Button size="sm" className="w-full gap-1.5 text-xs sm:text-sm" onClick={() => handleAdd(product)}>
                            <Plus className="w-3.5 h-3.5" /> أضف للسلة
                          </Button>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <Button variant="outline" size="icon" className="h-7 w-7 sm:h-8 sm:w-8" onClick={() => updateQuantity(product.id, cartQty - 1)}>
                              <Minus className="w-3.5 h-3.5" />
                            </Button>
                            <span className="font-bold text-base sm:text-lg w-6 text-center">{cartQty}</span>
                            <Button variant="outline" size="icon" className="h-7 w-7 sm:h-8 sm:w-8" onClick={() => updateQuantity(product.id, cartQty + 1)}>
                              <Plus className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Offers;
