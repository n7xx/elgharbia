/**
 * productsApi.js
 * API layer for the Products PHP backend.
 */

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://gezaret-elgharbia.com/core/pages/";
const ENDPOINT = `${BASE_URL}pro.php`;

const _pending = new Map();

async function _request(dedupKey, payload) {
  if (_pending.has(dedupKey)) return _pending.get(dedupKey);

  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) formData.append(key, value);
  });

  const promise = fetch(ENDPOINT, { method: "POST", body: formData })
    .then(async (res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      const text = await res.text();
      try {
        return JSON.parse(text);
      } catch {
        throw new Error(`Invalid JSON: ${text.slice(0, 200)}`);
      }
    })
    .catch((err) => {
      console.error(`[productsApi] "${dedupKey}" failed:`, err);
      throw err;
    })
    .finally(() => _pending.delete(dedupKey));

  _pending.set(dedupKey, promise);
  return promise;
}

/** Fetch ALL products (joined with categories) */
export async function getAllProducts() {
  const data = await _request("getAll", { type: "getAll" });
  return Array.isArray(data) ? data : [];
}

/** Fetch single product by id */
export async function getProductById(id) {
  const data = await _request(`getProById:${id}`, { type: "getProById", id });
  return Array.isArray(data) && data.length > 0 ? data[0] : null;
}

/** Fetch products by category id */
export async function getProductsByCategory(id_cat) {
  const data = await _request(`getProByCat:${id_cat}`, {
    type: "getProByCat",
    id_cat,
  });
  return Array.isArray(data) ? data : [];
}
