import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Printer, Eye } from "lucide-react";
import InvoicePrint from "@/components/dashboard/InvoicePrint";

const statusLabels = {
  pending: "معلق",
  confirmed: "مؤكد",
  preparing: "جاري التحضير",
  delivering: "جاري التوصيل",
  delivered: "تم التوصيل",
  cancelled: "ملغي",
};

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  preparing: "bg-orange-100 text-orange-800",
  delivering: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const DashboardOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [detailOpen, setDetailOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const audioRef = useRef(null);
  const prevOrderCount = useRef(0);
  const printRef = useRef(null);

  const fetchOrders = async () => {
    let query = supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (filterStatus !== "all") query = query.eq("status", filterStatus);
    const { data } = await query;
    if (data) {
      if (prevOrderCount.current > 0 && data.length > prevOrderCount.current) {
        playSound();
      }
      prevOrderCount.current = data.length;
      setOrders(data);
    }
  };

  const playSound = () => {
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 800;
      osc.type = "sine";
      gain.gain.value = 0.3;
      osc.start();
      setTimeout(() => { osc.frequency.value = 1000; }, 200);
      setTimeout(() => { osc.frequency.value = 1200; }, 400);
      setTimeout(() => { osc.stop(); ctx.close(); }, 600);
    } catch {}
  };

  useEffect(() => {
    fetchOrders();
    const channel = supabase
      .channel("orders-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, () => {
        fetchOrders();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [filterStatus]);

  const viewOrder = async (order) => {
    setSelectedOrder(order);
    const { data } = await supabase.from("order_items").select("*").eq("order_id", order.id);
    if (data) setOrderItems(data);
    setDetailOpen(true);
  };

  const updateStatus = async (orderId, status) => {
    const { error } = await supabase.from("orders").update({ status, handled_by: user?.id }).eq("id", orderId);
    if (error) toast({ title: "خطأ", description: error.message, variant: "destructive" });
    else { toast({ title: `تم تحديث الحالة إلى ${statusLabels[status]}` }); fetchOrders(); }
  };

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;
    const win = window.open("", "", "width=400,height=600");
    if (!win) return;
    win.document.write(`<html dir="rtl"><head><title>فاتورة</title><style>
      body { font-family: 'IBM Plex Sans Arabic', sans-serif; padding: 20px; font-size: 12px; }
      table { width: 100%; border-collapse: collapse; }
      th, td { border-bottom: 1px dashed #ccc; padding: 4px 8px; text-align: right; }
      .text-center { text-align: center; }
      .font-bold { font-weight: bold; }
      .mt-4 { margin-top: 16px; }
      .mb-2 { margin-bottom: 8px; }
      img { max-height: 60px; }
    </style></head><body>`);
    win.document.write(printContent.innerHTML);
    win.document.write("</body></html>");
    win.document.close();
    win.print();
    win.close();
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-bold">الأوردرات</h1>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">الكل</SelectItem>
            {Object.entries(statusLabels).map(([k, v]) => (
              <SelectItem key={k} value={k}>{v}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {orders.map((order) => (
          <Card key={order.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <span className="font-bold text-lg">#{order.order_number}</span>
                  <span className="text-muted-foreground text-sm mr-3">{order.customer_name}</span>
                  <span className="text-muted-foreground text-sm mr-3">{order.customer_phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={statusColors[order.status]}>{statusLabels[order.status]}</Badge>
                  <span className="font-bold">{order.total} ج.م</span>
                  <Badge variant={order.payment_method === "stripe" ? "default" : "secondary"}>
                    {order.payment_method === "stripe" ? "بطاقة" : "كاش"}
                  </Badge>
                  <Button variant="ghost" size="icon" onClick={() => viewOrder(order)}><Eye className="w-4 h-4" /></Button>
                </div>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {new Date(order.created_at).toLocaleString("ar-EG")}
                {order.customer_address && ` • ${order.customer_address}`}
              </div>
            </CardContent>
          </Card>
        ))}
        {orders.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">لا توجد أوردرات</div>
        )}
      </div>

      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>تفاصيل الأوردر #{selectedOrder?.order_number}</DialogTitle></DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><strong>العميل:</strong> {selectedOrder.customer_name}</div>
                <div><strong>التليفون:</strong> {selectedOrder.customer_phone}</div>
                <div className="col-span-2"><strong>العنوان:</strong> {selectedOrder.customer_address}</div>
                {selectedOrder.notes && <div className="col-span-2"><strong>ملاحظات:</strong> {selectedOrder.notes}</div>}
              </div>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="p-2 text-right">المنتج</th>
                      <th className="p-2 text-right">الكمية</th>
                      <th className="p-2 text-right">السعر</th>
                      <th className="p-2 text-right">الإجمالي</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.map((item) => (
                      <tr key={item.id} className="border-t">
                        <td className="p-2">{item.product_name}</td>
                        <td className="p-2">{item.quantity}</td>
                        <td className="p-2">{item.unit_price} ج.م</td>
                        <td className="p-2">{item.total_price} ج.م</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-sm space-y-1">
                <div className="flex justify-between"><span>المجموع:</span><span>{selectedOrder.subtotal} ج.م</span></div>
                <div className="flex justify-between"><span>التوصيل:</span><span>{selectedOrder.delivery_fee} ج.م</span></div>
                <div className="flex justify-between font-bold text-lg border-t pt-2"><span>الإجمالي:</span><span>{selectedOrder.total} ج.م</span></div>
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">تغيير الحالة:</Label>
                <Select value={selectedOrder.status} onValueChange={(v) => updateStatus(selectedOrder.id, v)}>
                  <SelectTrigger className="flex-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(statusLabels).map(([k, v]) => (
                      <SelectItem key={k} value={k}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" className="w-full gap-2" onClick={handlePrint}>
                <Printer className="w-4 h-4" /> طباعة الفاتورة
              </Button>
              <div className="hidden">
                <div ref={printRef}>
                  <InvoicePrint order={selectedOrder} items={orderItems} staffName={profile?.full_name || ""} />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default DashboardOrders;
