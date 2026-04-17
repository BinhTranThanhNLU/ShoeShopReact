import type { ProductModel } from "./ProductModel";

export interface ProductPageResponse {
  products: ProductModel[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}
