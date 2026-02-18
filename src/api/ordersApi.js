/**
 * ordersApi.js
 * API layer for the Orders PHP backend.
 * Endpoint: http://localhost/nasho/pages/order.php
 */

const ENDPOINT = "http://gezaret-elgharbia.com/core/pages/order.php";

async function _request(payload) {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) formData.append(key, value);
  });

  const res = await fetch(ENDPOINT, { method: "POST", body: formData });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Invalid JSON: ${text.slice(0, 200)}`);
  }
}

// ─── Normalise DB row → UI shape ──────────────────────────────────────────────
function normaliseOrder(row) {
  // PK column is id_order_header
  const rawId = row.id_order_header ?? row.id_order ?? row.id;
  return {
    id: `#${rawId}`,
    _id: Number(rawId), // raw numeric id for API calls
    customer: row.name_cus ?? "",
    phone: row.phone_cus ?? "",
    address: row.address_cus ?? "",
    notes: row.notes ?? "",
    payment: row.payment ?? "cash",
    status: row.status ?? "new",
    delivery: Number(row.delivery ?? 30),
    total: Number(row.total_price ?? 0),
    count: Number(row.count_item ?? 0),
    date: row.created_at
      ? new Date(row.created_at).toLocaleDateString("ar-EG")
      : "",
    items: [], // populated separately via getOrderItems()
  };
}

function normaliseItem(row) {
  return {
    name: row.name_pro ?? row.pro_name_db ?? "",
    qty: Number(row.count_pro ?? 1),
    price: Number(row.price_pro ?? 0),
  };
}

// ─── Public API ───────────────────────────────────────────────────────────────

/** Submit a new order from the website checkout */
export async function submitOrder({
  customer,
  items,
  summary,
  payment,
  delivery,
}) {
  const data = await _request({
    type: "newOrder",
    name: customer.name,
    phone: customer.phone,
    address: customer.address,
    notes: customer.notes ?? "",
    count_item: items.length,
    total_price: summary.total,
    delivery: delivery ?? summary.deliveryFee ?? 0,
    payment: payment ?? "cash",
    items: JSON.stringify(items), // sent as JSON string, decoded in PHP
  });
  return { success: data?.a === 1, id: data?.id ?? null };
}

/** Fetch all orders (dashboard) */
export async function getAllOrders() {
  const data = await _request({ type: "getAll" });
  if (!Array.isArray(data)) return [];
  return data.map(normaliseOrder);
}

/** Fetch items for a single order */
export async function getOrderItems(orderId) {
  const data = await _request({ type: "getOrder", id: orderId });
  if (!Array.isArray(data)) return [];
  return data.map(normaliseItem);
}

/** Poll only NEW orders since last_id (for realtime) */
export async function getNewOrders(lastId) {
  const data = await _request({ type: "getNew", last_id: lastId });
  if (!Array.isArray(data)) return [];
  return data.map(normaliseOrder);
}

/** Update order status */
export async function updateOrderStatus(orderId, status) {
  const data = await _request({ type: "updateStatus", id: orderId, status });
  return data?.a === 1;
}
