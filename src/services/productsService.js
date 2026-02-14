import { products, categories } from "@/data/products";

export function getProducts() {
  return Promise.resolve(products);
}

export function getCategories() {
  return Promise.resolve(categories);
}

export function getProductById(id) {
  const product = products.find((p) => p.id === id) || null;
  return Promise.resolve(product);
}

export function getCategoryById(id) {
  const category = categories.find((c) => c.id === id) || null;
  return Promise.resolve(category);
}
