import { Link } from "react-router-dom";
import { Phone, MapPin, Clock, Facebook, Linkedin } from "lucide-react";
import logo from "@/assets/logo.jpg";
import fourCreativeDark from "@/assets/4creative-darkmode-logo.png";


const branches = [
  {
    name: "العصافرة (الرئيسي)",
    phone: "5514931",
    phones: ["01044476413", "01111880575", "035514631", "035514830", "035514839", "035514931"],
    address: "جمال عبد الناصر العصافرة بحري",
    mapQuery: "العصافرة+بحري+الاسكندرية",
  },
  { name: "البيطاش", phone: "01278548266", address: "أمام شارع عين شمس", mapQuery: "البيطاش+الاسكندرية" },
  { name: "فضة", phone: "0122748223", address: "بجوار صيدلية فضة", mapQuery: "فضة+الاسكندرية" },
  { name: "الدرابسة", phone: "01200099137", address: "أمام مدرسة النموذجية", mapQuery: "الدرابسة+الاسكندرية" },
  { name: "أبو يوسف", phone: "01288657000", address: "بجوار مدرسة الأورمان", mapQuery: "ابو+يوسف+الاسكندرية" },
  { name: "قصر الغربية", phone: "01207188881", address: "مدخل الصحراوي", mapQuery: "قصر+الغربية+الاسكندرية" },
];

const Footer = () => {
  return (
    <footer className="no-print bg-charcoal text-secondary-foreground">
      <div className="container-rtl section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt="جزارة الغربية"
                className="h-10 w-auto object-contain bg-card rounded-lg p-1"
              />
            </div>
            <p className="text-secondary-foreground/80 leading-relaxed mb-2">
              جزارة الغربية - اسم يعني الثقة
            </p>
            <p className="text-secondary-foreground/70 text-sm leading-relaxed">
              ملوك اللحمة البلدي في مصر. لحوم طازة ومشويات مميزة بأفضل الأسعار.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold text-secondary-foreground mb-4">
              روابط سريعة
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "الرئيسية" },
                { href: "/products", label: "المنتجات" },
                { href: "/offers", label: "العروض" },
                { href: "/about", label: "من نحن" },
                { href: "/contact", label: "تواصل معنا" },
                {
                  href: "/food-village",
                  label: "قصر الغربية",
                  highlight: true,
                },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className={
                      link.highlight
                        ? "text-amber-400 hover:text-amber-300 transition-colors font-medium"
                        : "text-secondary-foreground/80 hover:text-gold transition-colors"
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-secondary-foreground mb-4">
              فروعنا
            </h4>
            <ul className="space-y-2.5">
              {branches.map((branch, i) => (
                <li key={i} className="text-sm">
                  <span className="font-semibold text-secondary-foreground/90 block">
                    {branch.name}
                  </span>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${branch.mapQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary-foreground/60 hover:text-gold transition-colors text-xs flex items-center gap-1"
                  >
                    <MapPin className="w-3 h-3 shrink-0" />
                    {branch.address}
                  </a>
                  {(branch.phones || [branch.phone]).map((p) => (
                    <a
                      key={p}
                      href={`tel:${p.replace(/\s/g, "")}`}
                      className="text-gold hover:text-gold/80 transition-colors text-xs flex items-center gap-1 mt-0.5 block"
                    >
                      <Phone className="w-3 h-3" />
                      {p}
                    </a>
                  ))}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-secondary-foreground mb-4">
              تواصل معنا
            </h4>
            <ul className="space-y-3 mb-6">
              <li>
                <a
                  href="tel:19026"
                  className="flex items-center gap-2 text-secondary-foreground/80 hover:text-gold transition-colors"
                >
                  <Phone className="w-5 h-5 text-gold" />
                  <span className="font-bold text-lg">الخط الساخن: 19026</span>
                </a>
              </li>
              <li className="flex items-center gap-2 text-secondary-foreground/80">
                <Clock className="w-5 h-5 text-gold" />
                <span>يوميًا من 8 صباحًا - 12 منتصف الليل</span>
              </li>
            </ul>
            <h4 className="text-sm font-bold text-secondary-foreground mb-3">
              تابعنا
            </h4>
            <div className="flex gap-3 mb-4">
              <a
                href="https://www.facebook.com/profile.php?id=100088041447494"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary/50 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="فيسبوك"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
            <div className="bg-secondary/30 rounded-lg p-4">
              <p className="text-gold font-semibold mb-1">اطلب الآن!</p>
              <p className="text-sm text-secondary-foreground/80">
                التوصيل متاح لجميع مناطق الإسكندرية
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary/30">
        <div className="container-rtl py-4 space-y-1">
          <p className="text-center text-secondary-foreground/60 text-sm">
            © {new Date().getFullYear()} جزارة و مشويات الغربية - جميع الحقوق
            محفوظة
          </p>

          {/* 4Creative Credit */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <a
                href="https://4creative.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
              >
                <img
                  src={fourCreativeDark}
                  alt="4Creative"
                  className="h-14 w-auto object-contain"
                />
              </a>
              <p className="text-center text-secondary-foreground/60 text-sm">
                تم تطوير هذا الموقع بواسطة 4Creative
                - فريق متخصص في تصميم
                وتطوير المواقع.
              </p>
            </div>
            <p className="text-secondary-foreground/50 text-xs flex items-center gap-1 flex-wrap justify-center">
              Developed by
              <a
                href="https://www.linkedin.com/in/yousefelgendy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-foreground/70 hover:text-gold transition-colors font-medium inline-flex items-center gap-0.5"
              >
                <Linkedin className="w-3 h-3" />
                Yousef Elgendy
              </a>
              &
              <a
                href="https://www.linkedin.com/in/n7xx/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-foreground/70 hover:text-gold transition-colors font-medium inline-flex items-center gap-0.5"
              >
                <Linkedin className="w-3 h-3" />
                Nashaat Fathy
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
