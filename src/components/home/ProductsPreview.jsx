import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/common/SectionHeader";
import AnimatedSection from "@/components/common/AnimatedSection";
import AnimatedItem from "@/components/common/AnimatedItem";
import meatSlices from "@/assets/meat-slices.jpg";
import kabab from "@/assets/kabab-420.jpg";
import ketf from "@/assets/ketf-350.jpg";
import sogo2 from "@/assets/sogo2-330.jpg";

const categories = [
  {
    id: 1,
    title: "لحم مليس",
    description: "لحم بلدي طازة بدون عظم",
    image: meatSlices,
    price: "380 جنيه/كيلو",
  },
  {
    id: 2,
    title: "كباب حلة",
    description: "قطع كباب مميزة للطبخ",
    image: kabab,
    price: "420 جنيه/كيلو",
  },
  {
    id: 3,
    title: "كتف",
    description: "لحم كتف طازة",
    image: ketf,
    price: "350 جنيه/كيلو",
  },
  {
    id: 4,
    title: "سجق",
    description: "سجق بلدي طازة",
    image: sogo2,
    price: "330 جنيه/كيلو",
  },
];

const ProductsPreview = () => {
  return (
    <section className="section-padding bg-muted">
      <div className="container-rtl">
        <AnimatedSection>
          <SectionHeader
            title="منتجاتنا"
            subtitle="تشكيلة متنوعة من اللحوم الطازة والمشويات اللذيذة"
          />
        </AnimatedSection>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-10">
          {categories.map((category, index) => (
            <AnimatedItem key={category.id} index={index}>
              <Link
                to="/products"
                className="group block bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 right-3 left-3">
                    <span className="inline-block bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-md">
                      {category.price}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-foreground mb-1">{category.title}</h3>
                  <p className="text-muted-foreground text-sm">{category.description}</p>
                </div>
              </Link>
            </AnimatedItem>
          ))}
        </div>

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
