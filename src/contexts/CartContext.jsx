import { createContext, useContext, useState } from "react";
import { roundMoney, calculateLineTotal } from "@/lib/priceUtils";

const DELIVERY_FEE = 30;

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addItem = (item, quantity = 1) => {
    const qty = Number(quantity);
    const safeQty = Number.isFinite(qty) && qty > 0 ? qty : 1;
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId ? { ...i, quantity: i.quantity + safeQty } : i
        );
      }
      return [...prev, { ...item, quantity: safeQty }];
    });
  };

  const removeItem = (productId) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    const qty = Number(quantity);
    if (!Number.isFinite(qty) || qty <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) => prev.map((i) => (i.productId === productId ? { ...i, quantity: qty } : i)));
  };

  const clearCart = () => setItems([]);

  /** عدد الطلبات (أسطر السلة) — يعرض فوق أيقونة السلة بدون كسور */
  const totalItems = items.length;
  const subtotal = roundMoney(
    items.reduce((sum, i) => sum + calculateLineTotal(i.price, i.quantity), 0)
  );
  const deliveryFee = items.length > 0 ? DELIVERY_FEE : 0;
  const total = roundMoney(subtotal + deliveryFee);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal, deliveryFee, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
