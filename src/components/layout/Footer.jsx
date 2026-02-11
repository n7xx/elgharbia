import { Link } from "react-router-dom";
import { Phone, MapPin, Clock, Facebook, Instagram } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-charcoal text-secondary-foreground">
      {/* Main Footer */}
      <div className="container-rtl section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={logo} 
                alt="جزارة الغربية" 
                className="h-16 w-auto object-contain bg-white rounded-lg p-1"
              />
            </div>
            <p className="text-secondary-foreground/80 leading-relaxed mb-2">
              جزارة الغربية - اسم يعني الثقة
            </p>
            <p className="text-secondary-foreground/70 text-sm leading-relaxed">
              ملوك اللحمة البلدي في مصر. لحوم طازة ومشويات مميزة بأفضل الأسعار.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "الرئيسية" },
                { href: "/products", label: "المنتجات" },
                { href: "/offers", label: "العروض" },
                { href: "/about", label: "من نحن" },
                { href: "/contact", label: "تواصل معنا" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-secondary-foreground/80 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">تواصل معنا</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:19026"
                  className="flex items-center gap-2 text-secondary-foreground/80 hover:text-gold transition-colors"
                >
                  <Phone className="w-5 h-5 text-gold" />
                  <span className="font-bold text-lg">الخط الساخن: 19026</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-secondary-foreground/80">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span>الإسكندرية - توصيل لجميع المناطق</span>
              </li>
              <li className="flex items-center gap-2 text-secondary-foreground/80">
                <Clock className="w-5 h-5 text-gold" />
                <span>يوميًا من 8 صباحًا - 12 منتصف الليل</span>
              </li>
            </ul>
          </div>

          {/* Social & Hours */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">تابعنا</h4>
            <div className="flex gap-3 mb-6">
              <a
                href="https://www.facebook.com/profile.php?id=100088041447494"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary/50 rounded-full flex items-center justify-center hover:bg-brand-blue transition-colors group"
                aria-label="فيسبوك"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-secondary/50 rounded-full flex items-center justify-center hover:bg-gold transition-colors group"
                aria-label="انستجرام"
              >
                <Instagram className="w-5 h-5 group-hover:text-charcoal" />
              </a>
            </div>
            <div className="bg-secondary/30 rounded-lg p-4">
              <p className="text-gold font-semibold mb-1">اطلب الآن!</p>
              <p className="text-sm text-secondary-foreground/80">التوصيل متاح لجميع مناطق الإسكندرية</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary/30">
        <div className="container-rtl py-4">
          <p className="text-center text-secondary-foreground/60 text-sm">
            © {new Date().getFullYear()} جزارة الغربية - خلف محمد خالد - جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
