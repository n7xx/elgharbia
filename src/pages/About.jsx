import Layout from "@/components/layout/Layout";
import { Shield, Award, Users, Truck, Clock, Heart, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import shopTeam from "@/assets/shop-team.jpg";
import logo from "@/assets/logo.jpg";

const values = [
  {
    icon: Shield,
    title: "جودة مضمونة",
    description: "بنختار لحومنا بعناية من أجود المصادر. كل قطعة لحم بتمر بفحص دقيق عشان نضمنلك أحسن جودة.",
  },
  {
    icon: Award,
    title: "خبرة سنين",
    description: "خبرة طويلة في مجال الجزارة والمشويات. نعرف ازاي نختار ونحضر اللحمة صح.",
  },
  {
    icon: Users,
    title: "آلاف العملاء",
    description: "ثقة آلاف الأسر في الإسكندرية اللي بتعتمد علينا في احتياجاتها من اللحوم.",
  },
  {
    icon: Truck,
    title: "توصيل سريع",
    description: "نوصلك طلبك لحد البيت في أسرع وقت. التوصيل متاح لجميع مناطق الإسكندرية.",
  },
  {
    icon: Clock,
    title: "متاحين دايمًا",
    description: "موجودين من 8 الصبح لـ 12 بالليل كل يوم عشان نخدمك في أي وقت.",
  },
  {
    icon: Heart,
    title: "خدمة بقلب",
    description: "بنحب شغلنا وبنحب نخدم عملائنا. رضاك هو هدفنا الأول.",
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Banner */}
      <section className="bg-gradient-hero py-12 lg:py-16">
        <div className="container-rtl text-center text-white">
          <img 
            src={logo} 
            alt="جزارة الغربية" 
            className="h-24 w-auto mx-auto mb-4 bg-white rounded-xl p-2"
          />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">من نحن</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            جزارة الغربية - اسم يعني الثقة - ملوك اللحمة البلدي في مصر
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-background">
        <div className="container-rtl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6">
                قصتنا
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  جزارة الغربية - اسم يعني الثقة. بدأنا رحلتنا بهدف واحد بسيط: نقدم للعميل لحمة بلدي طازة بجودة عالية وسعر مناسب.
                </p>
                <p>
                  تحت إدارة <strong className="text-foreground">خلف محمد خالد</strong>، أصبحنا ملوك اللحمة البلدي في مصر. نفتخر بتقديم أجود أنواع اللحوم الطازة لعملائنا في الإسكندرية.
                </p>
                <p>
                  النهارده، إحنا فخورين بثقة آلاف الأسر اللي بتعتمد علينا يوميًا. وده اللي بيدفعنا نستمر ونطور أكتر.
                </p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button variant="cta" size="lg" asChild>
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
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-accent rounded-2xl blur-2xl opacity-20" />
              <img
                src={shopTeam}
                alt="فريق جزارة الغربية"
                className="relative rounded-2xl shadow-lg w-full aspect-[4/5] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-muted">
        <div className="container-rtl">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              ليه تختارنا؟
            </h2>
            <p className="text-muted-foreground text-lg">
              القيم اللي بتميزنا وبتخلي عملائنا يرجعولنا
            </p>
            <div className="mt-4 h-1 w-20 bg-gradient-accent rounded-full mx-auto" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <div className="w-14 h-14 bg-brand-blue rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-hero">
        <div className="container-rtl text-center text-white">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            جاهز تجرب؟
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
            اتصل بينا دلوقتي واطلب أول طلب. هنوريك الفرق بنفسك!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <a href="tel:19026">
                <Phone className="w-6 h-6" />
                الخط الساخن 19026
              </a>
            </Button>
            <Button variant="whatsapp" size="xl" asChild>
              <a href="https://wa.me/201234567890" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-6 h-6" />
                واتساب
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
