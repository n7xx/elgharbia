import Layout from "@/components/layout/Layout";
import { Flame, Phone, MessageCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import meat380 from "@/assets/meat-380.jpg";
import beefsteak from "@/assets/beefsteak-420.jpg";
import kabab from "@/assets/kabab-420.jpg";
import meatKhodar from "@/assets/meat-khodar-380.jpg";
import ketf from "@/assets/ketf-350.jpg";
import sogo2 from "@/assets/sogo2-330.jpg";

const offers = [
  {
    id: 1,
    title: "لحمة مليس",
    description: "لحم بلدي طازة بدون عظم",
    price: "380 جنيه/كيلو",
    image: meat380,
    badge: "الأكثر طلبًا",
  },
  {
    id: 2,
    title: "لحمة خضار",
    description: "لحم بلدي مقطع للخضار",
    price: "380 جنيه/كيلو",
    image: meatKhodar,
    badge: "عرض مميز",
  },
  {
    id: 3,
    title: "بفتيك",
    description: "شرائح بفتيك مميزة",
    price: "420 جنيه/كيلو",
    image: beefsteak,
    badge: "جودة ممتازة",
  },
  {
    id: 4,
    title: "كباب حلة",
    description: "قطع كباب للطبخ",
    price: "420 جنيه/كيلو",
    image: kabab,
    badge: "مميز",
  },
  {
    id: 5,
    title: "كتف",
    description: "لحم كتف طازة",
    price: "350 جنيه/كيلو",
    image: ketf,
    badge: "سعر خاص",
  },
  {
    id: 6,
    title: "سجق",
    description: "سجق بلدي طازة",
    price: "330 جنيه/كيلو",
    image: sogo2,
    badge: "شعبي",
  },
];

const Offers = () => {
  return (
    <Layout>
      {/* Hero Banner */}
      <section className="bg-gradient-hero py-12 lg:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container-rtl text-center text-white relative z-10">
          <div className="inline-flex items-center gap-2 bg-gold text-charcoal rounded-full px-4 py-2 mb-4">
            <Flame className="w-5 h-5" />
            <span className="font-bold">أسعار اليوم</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">أسعار لحوم الغربية</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            أسعار ثابتة وجودة مضمونة - ملوك اللحمة البلدي في مصر
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-gold">
            <Clock className="w-5 h-5" />
            <span>الأسعار محدثة يوميًا</span>
          </div>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="section-padding bg-background">
        <div className="container-rtl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-border"
              >
                <div className="relative aspect-square">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-full">
                      {offer.badge}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{offer.title}</h3>
                  <p className="text-muted-foreground mb-4">{offer.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-primary">{offer.price}</span>
                    <Button variant="cta" size="sm" asChild>
                      <a href="tel:19026">
                        <Phone className="w-4 h-4" />
                        اطلب
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-muted">
        <div className="container-rtl">
          <div className="bg-gradient-blue rounded-2xl p-8 lg:p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                عايز تطلب كمية؟
              </h2>
              <p className="text-white/80 mb-6 max-w-xl mx-auto">
                اتصل بينا وهنعملك سعر خاص على الكميات الكبيرة
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg" asChild>
                  <a href="tel:19026">
                    <Phone className="w-5 h-5" />
                    الخط الساخن 19026
                  </a>
                </Button>
                <Button variant="whatsapp" size="lg" asChild>
                  <a href="https://wa.me/201234567890" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5" />
                    واتساب
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Offers;
