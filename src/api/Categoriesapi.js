const BASE_URL = "http://gezaret-elgharbia.com/core/pages/";
const ENDPOINT = `${BASE_URL}cat.php`;

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
      console.error(`[categoriesApi] "${dedupKey}" failed:`, err);
      throw err;
    })
    .finally(() => _pending.delete(dedupKey));

  _pending.set(dedupKey, promise);
  return promise;
}

/** Fetch all categories (active + archived) with product_count */
export async function getAllCategories() {
  const data = await _request("cat:getAll", { type: "getAll" });
  if (!Array.isArray(data)) return [];
  return data.map((row) => ({
    id: Number(row.id_cat),
    name: row.name_cat ?? "",
    products: Number(row.product_count ?? 0),
    archived: row.active_cat === "1" || row.active_cat === 1,
    description: row.desc_cat ?? "",
  }));
}
