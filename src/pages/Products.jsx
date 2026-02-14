import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, Beef, Flame, UtensilsCrossed, ChefHat } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { products, categories } from "@/data/products";
import OptimizedImage from "@/components/common/OptimizedImage";

const CATEGORY_ICONS = {
  "لحوم بلدي": <Beef className="w-4 h-4" />,
  "لحوم ضاني": <Beef className="w-4 h-4" />,
  "الحلويات والأحشاء": <Beef className="w-4 h-4" />,
  "المشويات": <Flame className="w-4 h-4" />,
  "الطواجن": <ChefHat className="w-4 h-4" />,
  "الوجبات": <UtensilsCrossed className="w-4 h-4" />,
  "صواني قصر الغربية": <UtensilsCrossed className="w-4 h-4" />,
};

const Products = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || null);
  const { addItem, items, updateQuantity } = useCart();

  const availableProducts = products.filter((p) => p.is_available);

  const getCartQuantity = (productId) =>
    items.find((i) => i.productId === productId)?.quantity || 0;

  const filteredProducts = activeCategory
    ? availableProducts.filter((p) => p.category_id === activeCategory)
    : availableProducts;

  const activeCategoryName = categories.find((c) => c.id === activeCategory)?.name || "";

  return (
    <Layout>
      <section className="bg-gradient-hero py-10 lg:py-14">
        <div className="container-rtl text-center text-primary-foreground">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3">منتجاتنا</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            ملوك اللحمة البلدي في مصر - تشكيلة متنوعة من اللحوم الطازة والمشويات والأكل الجاهز
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-rtl">
          <div className="mb-8 -mx-4 px-4">
            <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                const count = availableProducts.filter((p) => p.category_id === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-200 border-2 shrink-0",
                      isActive
                        ? "bg-primary text-primary-foreground border-primary shadow-md"
                        : "bg-card text-foreground border-border hover:border-primary/40 hover:bg-muted"
                    )}
                  >
                    {CATEGORY_ICONS[cat.name] || <ShoppingCart className="w-4 h-4" />}
                    <span>{cat.name}</span>
                    <span className={cn(
                      "text-xs px-1.5 py-0.5 rounded-md",
                      isActive ? "bg-primary-foreground/20" : "bg-muted text-muted-foreground"
                    )}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {activeCategoryName && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground">{activeCategoryName}</h2>
              {categories.find((c) => c.id === activeCategory)?.description && (
                <p className="text-muted-foreground mt-1">
                  {categories.find((c) => c.id === activeCategory)?.description}
                </p>
              )}
              <div className="mt-2 h-1 w-16 bg-primary rounded-full" />
            </div>
          )}

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

const ProductCard = ({ product, cartQty, addItem, updateQuantity }) => {
  const handleAdd = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      unit: product.unit,
      imageUrl: product.image_url,
    });
  };

  return (
    <div className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col">
      <Link to={`/product/${product.id}`} className="aspect-[4/3] relative overflow-hidden bg-muted block">
        <OptimizedImage
          src={product.image_url}
          alt={product.name}
          className="w-full h-full group-hover:[&>img]:scale-105"
          imgClassName="transition-transform duration-500"
        />
        {product.is_offer && (
          <div className="absolute top-2 right-2">
            <span className="bg-destructive text-destructive-foreground text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <Flame className="w-3 h-3" />
              {product.offer_badge || "عرض"}
            </span>
          </div>
        )}
        <div className="absolute bottom-2 right-2">
          <span className="bg-primary text-primary-foreground text-xs sm:text-sm font-bold px-2.5 py-1 rounded-lg shadow-md">
            {product.price} ج.م
          </span>
        </div>
      </Link>

      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <Link to={`/product/${product.id}`} className="block">
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
            <Button size="sm" className="w-full gap-1.5 text-xs sm:text-sm" onClick={handleAdd}>
              <Plus className="w-3.5 h-3.5" /> أضف للسلة
            </Button>
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
              <span className="font-bold text-base sm:text-lg w-6 text-center">{cartQty}</span>
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
