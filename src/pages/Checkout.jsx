import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Banknote, CheckCircle } from "lucide-react";

const Checkout = () => {
  const { items, subtotal, deliveryFee, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
    paymentMethod: "cash",
  });

  if (items.length === 0 && !success) {
    return (
      <Layout>
        <div className="container-rtl section-padding text-center">
          <h1 className="text-2xl font-bold mb-4">السلة فارغة</h1>
          <Button onClick={() => navigate("/products")}>تصفح المنتجات</Button>
        </div>
      </Layout>
    );
  }

  if (success) {
    return (
      <Layout>
        <div className="container-rtl section-padding text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">تم استلام طلبك بنجاح!</h1>
          <p className="text-muted-foreground mb-6">هنتواصل معاك في أقرب وقت لتأكيد الطلب</p>
          <Button onClick={() => navigate("/")}>العودة للرئيسية</Button>
        </div>
      </Layout>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Create order
      const { data: order, error: orderError } = await supabase.from("orders").insert({
        customer_name: form.name,
        customer_phone: form.phone,
        customer_address: form.address,
        notes: form.notes || null,
        payment_method: form.paymentMethod,
        subtotal,
        delivery_fee: deliveryFee,
        total,
        user_id: user?.id || null,
      }).select().single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.productId,
        product_name: item.name,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity,
      }));

      const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
      if (itemsError) throw itemsError;

      clearCart();
      setSuccess(true);
      toast({ title: "تم إرسال طلبك بنجاح!" });
    } catch (err) {
      toast({ title: "خطأ", description: err.message, variant: "destructive" });
    }
    setLoading(false);
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-rtl max-w-3xl">
          <h1 className="text-2xl font-bold mb-6">إتمام الطلب</h1>
          <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
            <Card className="md:col-span-1">
              <CardHeader><CardTitle className="text-lg">بيانات التوصيل</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>الاسم بالكامل</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label>رقم التليفون</Label>
                  <Input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label>العنوان بالتفصيل</Label>
                  <Textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required rows={3} />
                </div>
                <div className="space-y-2">
                  <Label>ملاحظات (اختياري)</Label>
                  <Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader><CardTitle className="text-lg">طريقة الدفع</CardTitle></CardHeader>
                <CardContent>
                  <RadioGroup value={form.paymentMethod} onValueChange={(v) => setForm({ ...form, paymentMethod: v })}>
                    <div className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-muted">
                      <RadioGroupItem value="cash" id="cash" />
                      <Banknote className="w-5 h-5 text-green-600" />
                      <Label htmlFor="cash" className="cursor-pointer flex-1">كاش عند الاستلام</Label>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-muted mt-2">
                      <RadioGroupItem value="stripe" id="stripe" />
                      <CreditCard className="w-5 h-5 text-brand-blue" />
                      <Label htmlFor="stripe" className="cursor-pointer flex-1">بطاقة إلكترونية (قريباً)</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-lg">ملخص الطلب</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {items.map((item) => (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <span>{item.name} × {item.quantity}</span>
                      <span>{(item.price * item.quantity).toFixed(2)} ج.م</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-2 space-y-1">
                    <div className="flex justify-between text-sm"><span>المجموع:</span><span>{subtotal.toFixed(2)} ج.م</span></div>
                    <div className="flex justify-between text-sm"><span>التوصيل:</span><span>{deliveryFee} ج.م</span></div>
                    <div className="flex justify-between font-bold text-lg"><span>الإجمالي:</span><span>{total.toFixed(2)} ج.م</span></div>
                  </div>
                  <Button type="submit" size="lg" className="w-full mt-4" disabled={loading}>
                    {loading ? "جاري الإرسال..." : "تأكيد الطلب"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Checkout;
