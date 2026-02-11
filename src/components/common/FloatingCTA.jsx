import { Phone, MessageCircle } from "lucide-react";

const FloatingCTA = () => {
  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-3">
      <a
        href="https://wa.me/201234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-pulse-slow"
        aria-label="تواصل عبر واتساب"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
      <a
        href="tel:19026"
        className="w-14 h-14 bg-brand-blue text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="اتصل الآن"
      >
        <Phone className="w-7 h-7" />
      </a>
    </div>
  );
};

export default FloatingCTA;
