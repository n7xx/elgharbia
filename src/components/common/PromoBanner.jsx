import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Flame, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const PROMOS = [
  {
    text: "🔥 عروض حصرية على اللحوم البلدي - وفّر دلوقتي!",
    link: "/offers",
    cta: "شوف العروض",
    icon: <Flame className="w-4 h-4" />,
  },
  {
    text: "🥩 تشكيلة متنوعة من اللحوم الطازة - اطلب أونلاين",
    link: "/products",
    cta: "تسوق الآن",
    icon: <ShoppingCart className="w-4 h-4" />,
  },
];

const SHOW_INTERVAL = 30000;
const DISPLAY_DURATION = 8000;

const PromoBanner = () => {
  const [visible, setVisible] = useState(false);
  const [promoIndex, setPromoIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const initialTimeout = setTimeout(() => {
      setVisible(true);
    }, 5000);

    return () => clearTimeout(initialTimeout);
  }, [dismissed]);

  useEffect(() => {
    if (dismissed) return;

    if (visible) {
      const hideTimeout = setTimeout(() => {
        setVisible(false);
      }, DISPLAY_DURATION);
      return () => clearTimeout(hideTimeout);
    } else {
      const showTimeout = setTimeout(() => {
        setPromoIndex((prev) => (prev + 1) % PROMOS.length);
        setVisible(true);
      }, SHOW_INTERVAL);
      return () => clearTimeout(showTimeout);
    }
  }, [visible, dismissed]);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
  };

  const promo = PROMOS[promoIndex];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-50"
        >
          <div className="bg-card border-2 border-primary/30 rounded-2xl shadow-2xl p-4 relative">
            <button
              onClick={handleDismiss}
              className="absolute top-2 left-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <p className="text-sm font-bold text-foreground mb-3 pr-2">{promo.text}</p>
            <Link to={promo.link} onClick={() => setVisible(false)}>
              <Button size="sm" className="w-full gap-2">
                {promo.icon}
                {promo.cta}
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PromoBanner;
