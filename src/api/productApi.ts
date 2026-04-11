import type { ProductModel } from "../models/ProductModel";
import type { ProductPageResponse } from "../models/ProductPageResponse";
import axiosClient from "./axiosClient";

export const getAllProducts = async (): Promise<ProductModel[]> => {
    const response = await axiosClient.get("/products");
    return response.data;
}

export const getProductsByCategory = async (id: number, page: number): Promise<ProductPageResponse> => {
    const response = await axiosClient.get(`/products/category/${id}`, {params: {page}});
    return response.data;
}

export const getProductsWithFilters = async (
  id: number, 
  page: number, 
  filters: any
): Promise<ProductPageResponse> => {
  // 1. Tạo object params chuẩn bị gửi đi
  const params: any = {
    page,
    size: 9,
  };

  // 2. Chỉ nhét thêm data vào params nếu nó tồn tại
  if (filters.minPrice) params.minPrice = filters.minPrice;
  if (filters.maxPrice) params.maxPrice = filters.maxPrice;
  
  // Kiểm tra mảng có phần tử thì mới join
  if (filters.brands && filters.brands.length > 0) {
    params.brandIds = filters.brands.join(',');
  }
  if (filters.colors && filters.colors.length > 0) {
    params.colors = filters.colors.join(',');
  }

  const response = await axiosClient.get(`/products/category/${id}/filter`, { params });
  return response.data;
};

export const getProductById = async (id: number): Promise<ProductModel> => {
  const response = await axiosClient.get(`/products/product/${id}`);
  return response.data;
}