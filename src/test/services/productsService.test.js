import { describe, it, expect } from "vitest";
import { getProducts, getCategories, getProductById, getCategoryById } from "../../services/productsService";

describe("productsService mock", () => {
  it("getProducts returns array with product shape", async () => {
    const products = await getProducts();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
    const first = products[0];
    expect(first).toHaveProperty("id");
    expect(first).toHaveProperty("name");
    expect(first).toHaveProperty("price");
    expect(first).toHaveProperty("unit");
    expect(first).toHaveProperty("image_url");
    expect(first).toHaveProperty("category_id");
    expect(first).toHaveProperty("is_available");
    expect(first).toHaveProperty("is_offer");
  });

  it("getCategories returns array with category shape", async () => {
    const categories = await getCategories();
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);
    const first = categories[0];
    expect(first).toHaveProperty("id");
    expect(first).toHaveProperty("name");
    expect(first).toHaveProperty("description");
    expect(first).toHaveProperty("sort_order");
  });

  it("getProductById returns product or null", async () => {
    const products = await getProducts();
    const id = products[0].id;
    const product = await getProductById(id);
    expect(product).not.toBeNull();
    expect(product.id).toBe(id);
    const missing = await getProductById("nonexistent");
    expect(missing).toBeNull();
  });

  it("getCategoryById returns category or null", async () => {
    const categories = await getCategories();
    const id = categories[0].id;
    const category = await getCategoryById(id);
    expect(category).not.toBeNull();
    expect(category.id).toBe(id);
    const missing = await getCategoryById("nonexistent");
    expect(missing).toBeNull();
  });
});
