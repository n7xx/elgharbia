import Layout from "@/components/layout/Layout";
import { Phone, MessageCircle, MapPin, Clock, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpg";

const Contact = () => {
  return (
    <Layout>
      {/* Hero Banner */}
      <section className="bg-gradient-hero py-12 lg:py-16">
        <div className="container-rtl text-center text-white">
          <img 
            src={logo} 
            alt="جزارة الغربية" 
            className="h-20 w-auto mx-auto mb-4 bg-white rounded-xl p-2"
          />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">تواصل معنا</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            نحن هنا لخدمتك - اتصل أو ابعتلنا في أي وقت
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-background">
        <div className="container-rtl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                معلومات التواصل
              </h2>

              <div className="space-y-6">
                {/* Phone */}
                <a
                  href="tel:19026"
                  className="flex items-start gap-4 p-4 bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-brand-blue rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">الخط الساخن</h3>
                    <p className="text-primary text-2xl font-black" dir="ltr">19026</p>
                    <p className="text-sm text-muted-foreground">اضغط للاتصال مباشرة</p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/201234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">واتساب</h3>
                    <p className="text-muted-foreground text-lg">ابعتلنا رسالة</p>
                    <p className="text-sm text-muted-foreground">رد سريع على جميع الاستفسارات</p>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-start gap-4 p-4 bg-card rounded-xl shadow-card">
                  <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">العنوان</h3>
                    <p className="text-muted-foreground">الإسكندرية</p>
                    <p className="text-sm text-muted-foreground">توصيل لجميع مناطق الإسكندرية</p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4 p-4 bg-card rounded-xl shadow-card">
                  <div className="w-12 h-12 bg-gold rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-gold-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">مواعيد العمل</h3>
                    <p className="text-muted-foreground">يوميًا من 8 صباحًا - 12 منتصف الليل</p>
                    <p className="text-sm text-muted-foreground">متاحين 7 أيام في الأسبوع</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <h3 className="font-bold text-foreground mb-4">تابعنا على</h3>
                <div className="flex gap-3">
                  <a
                    href="https://www.facebook.com/profile.php?id=100088041447494"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-brand-blue rounded-xl flex items-center justify-center shadow-card hover:scale-110 transition-transform text-white"
                    aria-label="فيسبوك"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-card rounded-xl flex items-center justify-center shadow-card hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="انستجرام"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                </div>
              </div>

              {/* Quick CTA */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button variant="cta" size="lg" className="flex-1" asChild>
                  <a href="tel:19026">
                    <Phone className="w-5 h-5" />
                    الخط الساخن 19026
                  </a>
                </Button>
                <Button variant="whatsapp" size="lg" className="flex-1" asChild>
                  <a href="https://wa.me/201234567890" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5" />
                    واتساب
                  </a>
                </Button>
              </div>
            </div>

            {/* Map */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                موقعنا
              </h2>
              <div className="bg-card rounded-xl overflow-hidden shadow-lg h-[400px] lg:h-[500px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109375.65772649!2d29.86180839999999!3d31.2000682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f5c49126710fd3%3A0xb4e0cda629ee6bb9!2sAlexandria%2C%20Alexandria%20Governorate%2C%20Egypt!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="موقع جزارة الغربية في الإسكندرية"
                />
              </div>
              <p className="text-muted-foreground text-sm mt-4 text-center">
                نوصل لجميع مناطق الإسكندرية - اتصل بينا لمعرفة تفاصيل التوصيل
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
