// src/api/product.ts
import { products } from "./mockData";

// Get all products
export const getProducts = async () => {
  return { products };
};
