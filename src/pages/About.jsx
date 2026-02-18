import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Shield, Award, Users, Truck, Clock, Heart, Phone, MessageCircle, MapPin, ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import shopTeam from "@/assets/AboutSection.jpeg";
import logo from "@/assets/logo.jpg";

const values = [
  {
    icon: Shield,
    title: "جودة مضمونة",
    description: "بنختار لحومنا بعناية من مزارعنا عشان نضمنلك أفضل جودة. ",
  },
  {
    icon: Award,
    title: "خبرة سنين",
    description: "خبرة طويلة في مجال الجزارة والمشويات نعرف ازاي نختار ونحضر اللحمة صح.",
  },
  {
    icon: Users,
    title: "آلاف العملاء",
    description: "ثقة آلاف الأسر في الإسكندرية اللي بتعتمد علينا في احتياجاتها من اللحوم.",
  },
  {
    icon: Truck,
    title: "توصيل سريع",
    description: "نوصلك طلبك لحد البيت في أسرع وقت. التوصيل متاح لجميع انحاء الإسكندرية.",
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

const branches = [
  {
    name: "فرع العصافرة (الفرع الرئيسي)",
    address: "جمال عبد الناصر العصافرة بحري بعد عروس دمشق ناصية شارع سيدي كمال",
    phones: ["01044476413","01111880575","035514631", "035514830","035514931"],
    mapQuery: "جمال+عبد+الناصر+العصافرة+بحري+الاسكندرية",
  },
  {
    name: "فرع البيطاش",
    address: "البيطاش الرئيسي - أمام شارع عين شمس",
    phones: ["01278548266"],
    mapQuery: "البيطاش+الاسكندرية",
  },
  {
    name: "فرع فضة",
    address: "فضة بجوار صيدلية فضة",
    phones: ["0122748223", "01002103430", "435506"],
    mapQuery: "فضة+الاسكندرية",
  },
  {
    name: "فرع الدرابسة",
    address: "الدرابسة - أمام مدرسة النموذجية",
    phones: ["01200099137"],
    mapQuery: "الدرابسة+الاسكندرية",
  },
  {
    name: "فرع أبو يوسف",
    address: "أبو يوسف - بجوار مدرسة الأورمان",
    phones: ["01288657000", "4327121"],
    mapQuery: "ابو+يوسف+الاسكندرية",
  },
  {
    name: "قرية قصر الغربية",
    address: "مدخل اسكندرية الصحراوي - بجوار بوابة الرسوم",
    phones: ["01207188881", "01281321166", "01205558230"],
    mapQuery: "قصر+الغربية+الاسكندرية+الصحراوي",
  },
];

const About = () => {
  return (
    <Layout>
      <section className="bg-gradient-hero py-12 lg:py-16">
        <div className="container-rtl text-center text-primary-foreground">
          <img
            src={logo}
            alt="جزارة الغربية"
            className="h-16 w-auto mx-auto mb-4 bg-card rounded-xl p-2"
          />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            من نحن
          </h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            جزارة الغربية - اسم يعني الثقة - ملوك اللحمة البلدي في مصر
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-rtl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6">
                قصتنا
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  من أول يوم، هدفنا كان واضح نقدم لحمة بلدي طازة بجودة عالية
                  وسعر مناسب.
                </p>
                <p>
                  في جزارة الغربية، الاسم مرتبط بالثقة. عشان كده احنا بنهتم بأدق
                  التفاصيل، وبنختار أفضل أنواع اللحوم، وبنحافظ على نفس الجودة كل
                  يوم.
                </p>
                <p>
                  بفضل ثقة آلاف الأسر في الإسكندرية، بقينا الاختيار الأول لناس
                  كتير.
                  <br />
                  <br />
                  <strong className="text-primary"> جزارة الغربية</strong>
                  <br />
                  اسم يعني الثقة.
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
                  <a
                    href="https://wa.me/201111880162"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
                className="relative rounded-2xl shadow-lg w-full aspect-[4/4] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="container-rtl">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              فروعنا
            </h2>
            <p className="text-muted-foreground text-lg">
              6 فروع في الإسكندرية لخدمتك - الخط الساخن للفروع: <strong className="text-primary">19026</strong>
            </p>
            <div className="mt-4 h-1 w-20 bg-primary rounded-full mx-auto" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {branches.map((branch, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-primary-foreground" />
                  </div>
                  {branch.name}
                </h3>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${branch.mapQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground text-sm hover:text-primary transition-colors block mb-3"
                >
                  📍 {branch.address}
                </a>
                <div className="flex flex-wrap gap-2">
                  {branch.phones.map((phone, i) => (
                    <a
                      key={i}
                      href={`tel:${phone}`}
                      className="inline-flex items-center gap-1 text-xs bg-muted text-foreground px-2.5 py-1.5 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors font-medium"
                    >
                      <Phone className="w-3 h-3" />
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
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
                <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-hero">
        <div className="container-rtl text-center text-primary-foreground">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            جاهز تجرب؟
          </h2>
          <p className="text-primary-foreground/90 text-lg mb-8 max-w-xl mx-auto">
            اطلب دلوقتي و هنوريك الفرق بنفسك!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/products">
                <ShoppingBag className="w-6 h-6" />
                اطلب الآن
              </Link>
            </Button>
            <Button variant="gold" size="xl" asChild>
              <Link to="/offers">
                <Sparkles className="w-6 h-6" />
                شوف عروضنا
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
