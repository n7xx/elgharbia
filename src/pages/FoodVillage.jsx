import { Link } from "react-router-dom";
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import qasrElgharbiaImage from "@/assets/qasr-elgharbia-building.png";
const FOOD_VILLAGE_LOCATION =
  "اسكندريه القاهره الصحراوي، قطعة النهضة، العامرية 1، محافظة الإسكندرية 5253006";
const MAP_URL = "https://maps.app.goo.gl/y4NdnsqkhdWPFU2M7";

const CONTACT_NUMBERS = [
  {
    label: "للحجز والاستعلام",
    numbers: ["01207188881", "01207188882", "01205558230"],
    tel: true,
  },
  { label: "طلبات تيك أواي", numbers: ["01281321166"], whatsapp: true },
  { label: "حفلات ومناسبات", numbers: ["01281321166"], whatsapp: true },
];
const FoodVillage = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative bg-gradient-hero py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M0 20h40M20 0v40'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="container-rtl relative z-10 text-center text-primary-foreground">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4">
            قرية المأكولات
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-2">
            قصر الغربية للمأكولات البدوية والمشويات والأسماك
          </p>
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
            <Clock className="w-4 h-4 text-gold" />
            مفتوح 24 ساعة
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="section-padding bg-background -mt-2">
        <div className="container-rtl max-w-5xl">
          {/* صورة قصر الغربية */}
          <div className="rounded-2xl overflow-hidden shadow-card border border-border mb-10">
            <div className="aspect-[16/10] sm:aspect-video bg-muted">
              <img
                src={qasrElgharbiaImage}
                alt="قصر الغربية للمأكولات البدوية والمشويات والأسماك"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-card p-6 sm:p-8">
              <h2 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                العنوان
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {FOOD_VILLAGE_LOCATION}
              </p>
              <Button asChild variant="outline" size="sm" className="gap-2">
                <a href={MAP_URL} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  فتح في خرائط جوجل
                </a>
              </Button>
            </div>
          </div>

          {/* Info grid */}
          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            <div className="mt-12 bg-card rounded-2xl p-6 shadow-card">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                أوقات العمل
              </h3>
              <p className="text-foreground font-medium">مفتوح 24 ساعة</p>
              <p className="text-muted-foreground text-sm mt-1">
                كل أيام الأسبوع
              </p>
            </div>

            <div className="mt-12 bg-card rounded-2xl p-6 shadow-card">
              <h2 className="text-xl font-bold text-foreground mb-4">
                للحجز والاستعلام
              </h2>
              <div className="space-y-4">
                {CONTACT_NUMBERS.map((block) => (
                  <div key={block.label}>
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      {block.label}:
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {block.numbers.map((num) => (
                        <a
                          key={num}
                          href={
                            block.whatsapp
                              ? `https://wa.me/20${num.replace(/^0/, "")}`
                              : `tel:${num}`
                          }
                          target={block.whatsapp ? "_blank" : undefined}
                          rel={
                            block.whatsapp ? "noopener noreferrer" : undefined
                          }
                          className="inline-flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors"
                        >
                          {block.whatsapp ? (
                            <MessageCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <Phone className="w-4 h-4" />
                          )}
                          {num}
                          {block.whatsapp && (
                            <span className="text-xs text-muted-foreground">
                              (واتساب)
                            </span>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-card rounded-2xl p-8 border border-border shadow-card">
            <p className="text-muted-foreground mb-4">
              لعرض منيو المأكولات والمشروبات
            </p>
            <Button asChild size="lg" className="gap-2">
              <Link to="/menu">عرض المنيو</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FoodVillage;
