import { Phone, MessageCircle, Truck, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroImage from "@/assets/grilled-meat.jpg";
import logo from "@/assets/logo-transparent.png";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero min-h-[600px] lg:min-h-[700px]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-rtl relative z-10 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <motion.div 
            className="text-white text-center lg:text-right order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Logo Badge with decorative organic shape */}
            <motion.div 
              className="inline-block mb-6 relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Organic blob shape behind logo */}
              <svg 
                className="absolute -inset-8 w-[calc(100%+4rem)] h-[calc(100%+4rem)] opacity-90"
                viewBox="0 0 200 200" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  fill="rgba(255,255,255,0.95)" 
                  d="M47.5,-57.2C59.9,-45.8,67.5,-29.5,71.2,-11.8C74.9,5.9,74.7,25,66.1,39.4C57.5,53.8,40.5,63.5,22.6,68.7C4.7,73.9,-14.1,74.6,-30.4,68.1C-46.7,61.6,-60.5,47.9,-68.4,31.3C-76.3,14.7,-78.3,-4.8,-73.1,-22.4C-67.9,-40,-55.5,-55.7,-40.7,-66.5C-25.9,-77.3,-8.7,-83.2,5.4,-79.7C19.5,-76.2,35.1,-63.3,47.5,-57.2Z" 
                  transform="translate(100 100)" 
                />
              </svg>
              <img 
                src={logo} 
                alt="جزارة الغربية" 
                className="relative h-48 w-auto object-contain drop-shadow-2xl"
              />
            </motion.div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight mb-4">
              ملوك اللحمة البلدي
              <br />
              <span className="text-gold">في مصر</span>
            </h1>

            <p className="text-xl lg:text-2xl text-white/90 mb-2 font-bold">
              اسم يعني الثقة
            </p>

            <p className="text-lg text-white/80 mb-8 max-w-lg mx-auto lg:mx-0 lg:mr-0">
              جزارة الغربية - اختيارك الأول للحوم الطازة والمشويات الشهية. 
              توصيل سريع لجميع مناطق الإسكندرية.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Button variant="hero" size="xl" asChild>
                <a href="tel:19026">
                  <Phone className="w-6 h-6" />
                  الخط الساخن 19026
                </a>
              </Button>
              <Button variant="whatsapp" size="xl" asChild>
                <a href="https://wa.me/201234567890" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-6 h-6" />
                  اطلب عبر واتساب
                </a>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-white/80">
                <Truck className="w-5 h-5 text-gold" />
                <span className="text-sm">توصيل سريع</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Clock className="w-5 h-5 text-gold" />
                <span className="text-sm">متاحين يوميًا</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Shield className="w-5 h-5 text-gold" />
                <span className="text-sm">جودة مضمونة</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div 
            className="order-1 lg:order-2 flex justify-center lg:justify-start"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gold/20 rounded-full blur-3xl" />
              <img
                src={heroImage}
                alt="فريق جزارة الغربية - لحوم طازة ومشويات شهية"
                className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl shadow-2xl object-cover aspect-[5/4]"
              />
              {/* Floating Price Badge */}
              <motion.div 
                className="absolute -bottom-4 -right-4 bg-brand-blue text-white rounded-xl p-4 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <p className="text-sm font-medium">كيلو اللحمة</p>
                <p className="text-2xl font-black">380 جنيه</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 50L48 45.8C96 41.7 192 33.3 288 29.2C384 25 480 25 576 33.3C672 41.7 768 58.3 864 62.5C960 66.7 1056 58.3 1152 50C1248 41.7 1344 33.3 1392 29.2L1440 25V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
