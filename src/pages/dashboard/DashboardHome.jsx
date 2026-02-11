import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, DollarSign, Clock } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const DashboardHome = () => {
  const [stats, setStats] = useState({ products: 0, orders: 0, pending: 0, revenue: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [productsRes, ordersRes, pendingRes] = await Promise.all([
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("orders").select("id, total", { count: "exact" }),
        supabase.from("orders").select("id", { count: "exact", head: true }).eq("status", "pending"),
      ]);
      const revenue = ordersRes.data?.reduce((sum, o) => sum + (o.total || 0), 0) || 0;
      setStats({
        products: productsRes.count || 0,
        orders: ordersRes.count || 0,
        pending: pendingRes.count || 0,
        revenue,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { title: "المنتجات", value: stats.products, icon: Package, color: "text-brand-blue" },
    { title: "إجمالي الأوردرات", value: stats.orders, icon: ShoppingCart, color: "text-primary" },
    { title: "أوردرات معلقة", value: stats.pending, icon: Clock, color: "text-gold" },
    { title: "الإيرادات", value: `${stats.revenue.toLocaleString()} ج.م`, icon: DollarSign, color: "text-green-600" },
  ];

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">لوحة التحكم</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default DashboardHome;
