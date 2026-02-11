import { Truck, Shield, Clock, Percent, Award, Users } from "lucide-react";
import AnimatedSection from "@/components/common/AnimatedSection";
import AnimatedItem from "@/components/common/AnimatedItem";

const features = [
  {
    icon: Shield,
    title: "جودة مضمونة",
    description: "لحوم بلدي طازة من أجود المصادر",
  },
  {
    icon: Truck,
    title: "توصيل سريع",
    description: "نوصلك لحد البيت في أسرع وقت",
  },
  {
    icon: Percent,
    title: "أسعار منافسة",
    description: "أفضل الأسعار في السوق مع عروض مستمرة",
  },
  {
    icon: Clock,
    title: "متاحين دائمًا",
    description: "من 8 الصبح لـ 12 بالليل كل يوم",
  },
  {
    icon: Award,
    title: "خبرة سنين",
    description: "خبرة طويلة في مجال الجزارة والمشويات",
  },
  {
    icon: Users,
    title: "آلاف العملاء",
    description: "ثقة آلاف الأسر في الإسكندرية",
  },
];

const FeaturesSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-rtl">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            ليه تختار جزارة الغربية؟
          </h2>
          <p className="text-muted-foreground text-lg">
            أسباب تخليك تثق فينا دايمًا
          </p>
          <div className="mt-4 h-1 w-20 bg-gradient-accent rounded-full mx-auto" />
        </AnimatedSection>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {features.map((feature, index) => (
            <AnimatedItem key={index} index={index}>
              <div className="group bg-card rounded-xl p-5 lg:p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 h-full">
                <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="font-bold text-foreground text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
