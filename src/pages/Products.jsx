import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/contexts/CartContext";
import Layout from "@/components/layout/Layout";
import SectionHeader from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem, items, updateQuantity } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      const [p, c] = await Promise.all([
        supabase.from("products").select("*").eq("is_available", true).order("sort_order"),
        supabase.from("categories").select("*").order("sort_order"),
      ]);
      if (p.data) setProducts(p.data);
      if (c.data) setCategories(c.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const getCartQuantity = (productId) => items.find((i) => i.productId === productId)?.quantity || 0;

  const groupedProducts = categories.map((cat) => ({
    ...cat,
    products: products.filter((p) => p.category_id === cat.id),
  })).filter((g) => g.products.length > 0);

  const uncategorized = products.filter((p) => !p.category_id);

  return (
    <Layout>
      <section className="bg-gradient-hero py-12 lg:py-16">
        <div className="container-rtl text-center text-primary-foreground">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">منتجاتنا</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            ملوك اللحمة البلدي في مصر - تشكيلة متنوعة من اللحوم الطازة بأفضل الأسعار
          </p>
        </div>
      </section>

      {loading ? (
        <div className="section-padding text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
        </div>
      ) : (
        <>
          {groupedProducts.map((group) => (
            <section key={group.id} className="section-padding odd:bg-background even:bg-muted">
              <div className="container-rtl">
                <SectionHeader title={group.name} subtitle={group.description || undefined} />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                  {group.products.map((product) => (
                    <ProductCard key={product.id} product={product} cartQty={getCartQuantity(product.id)} addItem={addItem} updateQuantity={updateQuantity} />
                  ))}
                </div>
              </div>
            </section>
          ))}

          {uncategorized.length > 0 && (
            <section className="section-padding bg-background">
              <div className="container-rtl">
                <SectionHeader title="منتجات أخرى" />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                  {uncategorized.map((product) => (
                    <ProductCard key={product.id} product={product} cartQty={getCartQuantity(product.id)} addItem={addItem} updateQuantity={updateQuantity} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {products.length === 0 && (
            <div className="section-padding text-center text-muted-foreground">
              لا توجد منتجات متاحة حالياً
            </div>
          )}
        </>
      )}
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
    <div className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-square relative overflow-hidden">
        {product.image_url ? (
          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
            <ShoppingCart className="w-12 h-12" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-3 right-3">
          <span className="bg-secondary text-secondary-foreground text-sm font-bold px-3 py-1 rounded-md">
            {product.price} ج.م/{product.unit}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-foreground mb-1">{product.name}</h3>
        {product.description && <p className="text-muted-foreground text-sm mb-3">{product.description}</p>}
        {cartQty === 0 ? (
          <Button size="sm" className="w-full gap-2" onClick={handleAdd}>
            <Plus className="w-4 h-4" /> أضف للسلة
          </Button>
        ) : (
          <div className="flex items-center justify-center gap-3">
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(product.id, cartQty - 1)}>
              <Minus className="w-4 h-4" />
            </Button>
            <span className="font-bold text-lg">{cartQty}</span>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(product.id, cartQty + 1)}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
