import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, MessageCircle, Phone, Banknote, CreditCard, Wallet, ShoppingCart, Loader2, AlertCircle } from "lucide-react";

const WHATSAPP_NUMBER = "201111880162";

const Checkout = () => {
  const { items, subtotal, deliveryFee, total, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [success, setSuccess] = useState(false);
  const [whatsappSuccess, setWhatsappSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWhatsAppConfirm, setShowWhatsAppConfirm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cash");

  if (items.length === 0 && !success && !whatsappSuccess) {
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
          <h1 className="text-2xl font-bold mb-2">تم إتمام الطلب بنجاح</h1>
          <p className="text-muted-foreground mb-6">هنتواصل معاك في أقرب وقت لتأكيد الطلب</p>
          <Button onClick={() => navigate("/")}>العودة للرئيسية</Button>
        </div>
      </Layout>
    );
  }

  if (whatsappSuccess) {
    return (
      <Layout>
        <div className="container-rtl section-padding text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2">تم إرسال الطلب على الواتساب بنجاح</h1>
            <p className="text-muted-foreground mb-6">
              تم فتح الواتساب مع رسالة طلبك. اضغط "إرسال" في الواتساب لإتمام الطلب.
            </p>
            <div className="flex gap-3 justify-center">
              <Button onClick={() => navigate("/")}>العودة للرئيسية</Button>
              <Button variant="outline" onClick={() => navigate("/products")}>
                تصفح المنتجات
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const validateForm = () => {
    const name = form.name.trim();
    const phone = form.phone.replace(/\s/g, "");
    const address = form.address.trim();

    if (!name || name.length < 3) {
      toast({ title: "خطأ", description: "برجاء إدخال الاسم بالكامل", variant: "destructive" });
      return false;
    }
    if (!/^01[0-9]{9}$/.test(phone)) {
      toast({ title: "خطأ", description: "برجاء إدخال رقم تليفون صحيح", variant: "destructive" });
      return false;
    }
    if (!address || address.length < 10) {
      toast({ title: "خطأ", description: "برجاء إدخال العنوان بالتفصيل", variant: "destructive" });
      return false;
    }
    return true;
  };

  const buildWhatsAppMessage = () => {
    let msg = `🛒 *طلب جديد*\n\n`;
    msg += `👤 *بيانات العميل:*\n`;
    msg += `الاسم: ${form.name.trim()}\n`;
    msg += `التليفون: ${form.phone.replace(/\s/g, "")}\n`;
    msg += `العنوان: ${form.address.trim()}\n\n`;
    msg += `📦 *تفاصيل الطلب:*\n`;
    items.forEach((item) => {
      const lineTotal = (item.price * item.quantity).toFixed(2);
      msg += `• ${item.name} × ${item.quantity} - ${lineTotal} ج.م\n`;
    });
    msg += `\n💰 *ملخص الفاتورة:*\n`;
    msg += `المجموع: ${subtotal.toFixed(2)} ج.م\n`;
    msg += `التوصيل: ${deliveryFee} ج.م\n`;
    msg += `━━━━━━━━━━━━\n`;
    msg += `الإجمالي: ${total.toFixed(2)} ج.م\n\n`;
    msg += `💳 *طريقة الدفع:* كاش عند الاستلام\n\n`;
    msg += `📝 *ملاحظات:* ${form.notes.trim() || "لا توجد"}`;
    return encodeURIComponent(msg);
  };

  // دالة إرسال الطلب للـ Dashboard/Backend
  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // تجهيز بيانات الطلب
      const orderData = {
        customer: {
          name: form.name.trim(),
          phone: form.phone.replace(/\s/g, ""),
          address: form.address.trim(),
          notes: form.notes.trim() || null,
        },
        items: items.map(item => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          total: item.price * item.quantity,
        })),
        summary: {
          subtotal: parseFloat(subtotal.toFixed(2)),
          deliveryFee: deliveryFee,
          total: parseFloat(total.toFixed(2)),
        },
        paymentMethod: paymentMethod,
        status: "pending", // حالة الطلب: pending, confirmed, delivered, cancelled
        createdAt: new Date().toISOString(),
      };

      // هنا هتحط الـ API call للـ Backend
      // مثال:
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("فشل في إرسال الطلب");
      }

      const result = await response.json();

      // مسح السلة
      clearCart();

      // عرض رسالة نجاح
      toast({ 
        title: "تم إرسال الطلب بنجاح!", 
        description: `رقم الطلب: ${result.orderId || ""}` 
      });

      // الانتقال لصفحة النجاح
      setSuccess(true);

    } catch (error) {
      console.error("Order submission error:", error);
      toast({ 
        title: "خطأ في إرسال الطلب", 
        description: "حاول مرة أخرى أو تواصل معنا عبر الواتساب",
        variant: "destructive" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // دالة فتح الواتساب بالرسالة الجاهزة
  const handleWhatsAppContact = () => {
    if (!validateForm()) return;
    
    // فتح نافذة التأكيد
    setShowWhatsAppConfirm(true);
  };

  // دالة التأكيد وفتح الواتساب
  const confirmWhatsAppSend = () => {
    const waMsg = buildWhatsAppMessage();
    
    // فتح الواتساب
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`, "_blank");
    
    // مسح السلة
    clearCart();
    
    // إغلاق نافذة التأكيد
    setShowWhatsAppConfirm(false);
    
    // عرض صفحة النجاح
    setWhatsappSuccess(true);
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-rtl max-w-3xl">
          <h1 className="text-2xl font-bold mb-6">إتمام الطلب</h1>
          <form onSubmit={handleOrderSubmit} className="grid gap-6 md:grid-cols-2">
            {/* بيانات التوصيل */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">بيانات التوصيل</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم بالكامل</Label>
                  <Input 
                    id="name"
                    value={form.name} 
                    onChange={(e) => setForm({ ...form, name: e.target.value })} 
                    placeholder="أدخل الاسم بالكامل"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">رقم التليفون</Label>
                  <Input 
                    id="phone"
                    type="tel" 
                    value={form.phone} 
                    onChange={(e) => setForm({ ...form, phone: e.target.value })} 
                    placeholder="01xxxxxxxxx"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">العنوان بالتفصيل</Label>
                  <Textarea 
                    id="address"
                    value={form.address} 
                    onChange={(e) => setForm({ ...form, address: e.target.value })} 
                    placeholder="المدينة، الحي، الشارع، رقم المبنى..."
                    required 
                    rows={3} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">ملاحظات (اختياري)</Label>
                  <Textarea 
                    id="notes"
                    value={form.notes} 
                    onChange={(e) => setForm({ ...form, notes: e.target.value })} 
                    placeholder="أي ملاحظات إضافية..."
                    rows={2} 
                  />
                </div>
              </CardContent>
            </Card>

            {/* ملخص الطلب وطرق الدفع */}
            <div className="space-y-6">
              {/* طرق الدفع */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">طرق الدفع</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {/* كاش عند الاستلام */}
                  <div
                    onClick={() => setPaymentMethod("cash")}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === "cash" 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      paymentMethod === "cash" ? "border-primary" : "border-muted-foreground"
                    }`}>
                      {paymentMethod === "cash" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                      )}
                    </div>
                    <Banknote className="w-6 h-6 text-primary" />
                    <div>
                      <span className="font-bold">كاش عند الاستلام</span>
                    </div>
                  </div>

                  {/* فيزا ومحافظ إلكترونية (معطل) */}
                  <div className="flex items-center gap-3 p-4 rounded-xl border-2 border-border bg-muted/30 opacity-55 cursor-not-allowed pointer-events-none">
                    <div className="w-5 h-5 rounded-full border-2 border-muted-foreground flex items-center justify-center shrink-0" />
                    <div className="flex gap-1">
                      <CreditCard className="w-6 h-6 text-muted-foreground" />
                      <Wallet className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-muted-foreground">
                        فيزا و محافظ إلكترونية
                      </span>
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-md">
                        قريباً
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* ملخص الطلب */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">ملخص الطلب</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {/* المنتجات */}
                  {items.map((item) => (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <span>{item.name} × {item.quantity}</span>
                      <span>{(item.price * item.quantity).toFixed(2)} ج.م</span>
                    </div>
                  ))}
                  
                  {/* الإجمالي */}
                  <div className="border-t pt-2 mt-2 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>المجموع:</span>
                      <span>{subtotal.toFixed(2)} ج.م</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>التوصيل:</span>
                      <span>{deliveryFee} ج.م</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>الإجمالي:</span>
                      <span>{total.toFixed(2)} ج.م</span>
                    </div>
                  </div>

                  {/* زرار اطلب الآن - يرسل للـ Backend */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-4 flex items-center justify-center gap-2 min-h-[52px] py-3 px-4 rounded-xl bg-[#C41E3A] hover:bg-[#A81830] disabled:bg-[#C41E3A]/50 disabled:cursor-not-allowed text-white font-bold transition-colors touch-manipulation"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 shrink-0 animate-spin" />
                        جاري إرسال الطلب...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5 shrink-0" />
                        اطلب الآن
                      </>
                    )}
                  </button>

                  {/* زرار الواتساب - يفتح الواتساب مباشرة */}
                  <button
                    type="button"
                    onClick={handleWhatsAppContact}
                    disabled={isSubmitting}
                    className="w-full mt-3 flex items-center justify-center gap-2 min-h-[52px] py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] disabled:bg-[#25D366]/50 disabled:cursor-not-allowed text-white font-bold transition-colors touch-manipulation"
                  >
                    <MessageCircle className="w-5 h-5 shrink-0" />
                    تواصل معنا على الواتساب
                  </button>

                  {/* الخط الساخن */}
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-muted-foreground text-center">
                      أو اتصل بنا مباشرة
                    </p>
                    <Button 
                      type="button"
                      variant="outline" 
                      size="sm" 
                      className="w-full gap-2" 
                      asChild
                    >
                      <a href="tel:19026">
                        <Phone className="w-4 h-4" /> 
                        الخط الساخن 19026
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </form>
        </div>
      </section>

      {/* نافذة التأكيد قبل إرسال الواتساب */}
      <AlertDialog open={showWhatsAppConfirm} onOpenChange={setShowWhatsAppConfirm}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
              <AlertDialogTitle className="text-xl">تأكيد إرسال الطلب</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-right space-y-3 text-base">
              <p className="font-medium text-foreground">
                سيتم تحويلك إلى الواتساب لإتمام الطلب.
              </p>
              <div className="bg-muted p-3 rounded-lg space-y-2">
                <p className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>سيتم إفراغ السلة تلقائياً</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>بيانات طلبك ستُرسل عبر الواتساب</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>اضغط "إرسال" في الواتساب لإتمام الطلب</span>
                </p>
              </div>
              <p className="font-semibold text-foreground pt-2">
                هل أنت متأكد من المتابعة؟
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row gap-2 sm:gap-2">
            <AlertDialogCancel className="flex-1 m-0">
              لا، إلغاء
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmWhatsAppSend}
              className="flex-1 bg-[#25D366] hover:bg-[#20BD5A]"
            >
              <MessageCircle className="w-4 h-4 ml-2" />
              نعم، متأكد
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default Checkout;