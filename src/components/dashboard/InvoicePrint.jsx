import logo from "@/assets/logo-transparent.png";

const InvoicePrint = ({ order, items, staffName }) => {
  const now = new Date();
  const shift = now.getHours() < 12 ? "صباحي" : now.getHours() < 18 ? "مسائي" : "ليلي";

  return (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", padding: "10px", maxWidth: "300px", margin: "0 auto" }}>
      <div className="text-center mb-2">
        <img src={logo} alt="Logo" style={{ maxHeight: "50px", margin: "0 auto" }} />
        <h2 style={{ margin: "8px 0 4px", fontSize: "16px" }}>جزارة الغربية</h2>
        <p style={{ fontSize: "11px", color: "#666" }}>الخط الساخن: 19026</p>
      </div>

      <div style={{ borderTop: "1px dashed #999", margin: "8px 0", paddingTop: "8px", fontSize: "11px" }}>
        <div>رقم الفاتورة: #{order.order_number}</div>
        <div>التاريخ: {new Date(order.created_at).toLocaleDateString("ar-EG")}</div>
        <div>الساعة: {new Date(order.created_at).toLocaleTimeString("ar-EG")}</div>
        <div>الشيفت: {shift}</div>
        <div>الموظف: {staffName}</div>
      </div>

      <div style={{ borderTop: "1px dashed #999", margin: "8px 0", paddingTop: "8px", fontSize: "11px" }}>
        <div>العميل: {order.customer_name}</div>
        <div>التليفون: {order.customer_phone}</div>
        <div>العنوان: {order.customer_address}</div>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px", marginTop: "8px" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #999" }}>
            <th style={{ textAlign: "right", padding: "4px" }}>المنتج</th>
            <th style={{ textAlign: "right", padding: "4px" }}>الكمية</th>
            <th style={{ textAlign: "right", padding: "4px" }}>الإجمالي</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} style={{ borderBottom: "1px dashed #ddd" }}>
              <td style={{ padding: "4px" }}>{item.product_name}</td>
              <td style={{ padding: "4px" }}>{item.quantity}</td>
              <td style={{ padding: "4px" }}>{item.total_price} ج.م</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ borderTop: "1px dashed #999", marginTop: "8px", paddingTop: "8px", fontSize: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>المجموع:</span><span>{order.subtotal} ج.م</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>التوصيل:</span><span>{order.delivery_fee} ج.م</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "14px", borderTop: "1px solid #999", paddingTop: "4px", marginTop: "4px" }}>
          <span>الإجمالي:</span><span>{order.total} ج.م</span>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "12px", fontSize: "10px", color: "#888" }}>
        <p>الدفع: {order.payment_method === "stripe" ? "بطاقة إلكترونية" : "كاش عند الاستلام"}</p>
        <p style={{ marginTop: "8px" }}>شكراً لتعاملكم معنا 🥩</p>
        <p>جزارة الغربية - اسم يعني الثقة</p>
      </div>
    </div>
  );
};

export default InvoicePrint;
