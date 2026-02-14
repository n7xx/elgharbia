import { useCart } from "@/contexts/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { calculateLineTotal, parseWeightInput, MIN_WEIGHT_KG } from "@/lib/priceUtils";

const CartSheet = () => {
  const { items, totalItems, subtotal, deliveryFee, total, updateQuantity, removeItem } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -left-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle>سلة المشتريات ({totalItems})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            السلة فارغة
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto space-y-3 py-4">
              {items.map((item) => {
                const isKilo = item.unit === "كيلو";
                const step = isKilo ? 0.5 : 1;
                const lineTotal = calculateLineTotal(item.price, item.quantity);
                return (
                  <div key={item.productId} className="flex gap-3 bg-muted rounded-lg p-3">
                    {item.imageUrl && (
                      <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    )}
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.price} ج.م/{item.unit}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => {
                            const next = item.quantity - step;
                            if (next < MIN_WEIGHT_KG) updateQuantity(item.productId, 0);
                            else updateQuantity(item.productId, next);
                          }}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        {isKilo ? (
                          <input
                            type="number"
                            min={MIN_WEIGHT_KG}
                            step="0.25"
                            inputMode="decimal"
                            value={item.quantity}
                            onChange={(e) => {
                              const parsed = parseWeightInput(e.target.value);
                              if (parsed !== null) updateQuantity(item.productId, parsed);
                            }}
                            onBlur={(e) => {
                              const parsed = parseWeightInput(e.target.value);
                              if (parsed !== null) updateQuantity(item.productId, parsed);
                              else updateQuantity(item.productId, item.quantity);
                            }}
                            className="w-12 text-center rounded border border-input bg-background py-0.5 text-xs font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            aria-label="الكمية بالكيلو"
                          />
                        ) : (
                          <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        )}
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.productId, item.quantity + step)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 mr-auto" onClick={() => removeItem(item.productId)}>
                          <Trash2 className="w-3 h-3 text-destructive" />
                        </Button>
                      </div>
                    </div>
                    <div className="font-bold text-sm">{lineTotal.toFixed(2)} ج.م</div>
                  </div>
                );
              })}
            </div>
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm"><span>المجموع:</span><span>{subtotal.toFixed(2)} ج.م</span></div>
              <div className="flex justify-between text-sm"><span>التوصيل:</span><span>{deliveryFee} ج.م</span></div>
              <div className="flex justify-between font-bold text-lg"><span>الإجمالي:</span><span>{total.toFixed(2)} ج.م</span></div>
              <Button asChild className="w-full" size="lg">
                <Link to="/checkout">إتمام الطلب</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
