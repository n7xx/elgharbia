import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/common/ThemeToggle";
import CartSheet from "@/components/store/CartSheet";
import logo from "@/assets/logo-transparent.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: "/", label: "الرئيسية" },
    { href: "/products", label: "المنتجات" },
    { href: "/offers", label: "العروض" },
    { href: "/about", label: "من نحن" },
    { href: "/contact", label: "تواصل معنا" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="no-print sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container-rtl flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <a href="tel:19026" className="flex items-center gap-1 hover:text-gold transition-colors">
              <Phone className="w-4 h-4" />
              <span className="font-bold">الخط الساخن: 19026</span>
            </a>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-primary-foreground/80">
            <MapPin className="w-4 h-4" />
            <span>الإسكندرية - توصيل لجميع المناطق</span>
          </div>
        </div>
      </div>

      <div className="container-rtl py-1.5">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="جزارة الغربية - اسم يعني الثقة" className="h-18 sm:h-16 w-auto object-contain drop-shadow-md" />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive(link.href) ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <CartSheet />
            <Button variant="whatsapp" size="sm" asChild>
              <a href="https://wa.me/201111880162" target="_blank" rel="noopener noreferrer">واتساب</a>
            </Button>
            <Button variant="call" size="sm" asChild>
              <a href="tel:19026"><Phone className="w-4 h-4" />19026</a>
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <CartSheet />
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-lg hover:bg-muted transition-colors" aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-border pt-4 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link key={link.href} to={link.href} onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${isActive(link.href) ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`}>
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 mt-4">
                <Button variant="whatsapp" className="flex-1" asChild>
                  <a href="https://wa.me/201111880162" target="_blank" rel="noopener noreferrer">واتساب</a>
                </Button>
                <Button variant="call" className="flex-1" asChild>
                  <a href="tel:19026"><Phone className="w-4 h-4" />19026</a>
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
