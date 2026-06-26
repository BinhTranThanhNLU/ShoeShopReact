import type { ProductPageResponse } from "../modelResponse/ProductPageResponse";
import type { ProductModel } from "../models/ProductModel";
import axiosClient from "./axiosClient";

export const productApi = {
    
  getRecommendedProducts: async (id: number): Promise<ProductModel[]> => {
    const response = await axiosClient.get(`/products/${id}/recommendations`);
    return response.data;
  },

  getAllProducts: async (): Promise<ProductModel[]> => {
    const response = await axiosClient.get("/products");
    return response.data;
  },

  getByCategory: async (
    id: number,
    page: number,
  ): Promise<ProductPageResponse> => {
    const response = await axiosClient.get(`/products/category/${id}`, {
      params: { page },
    });
    return response.data;
  },

  getProductsWithFilters: async (
    id: number,
    page: number,
    filters: any,
  ): Promise<ProductPageResponse> => {
    const params: any = {
      page,
      size: 9,
    };

    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;

    if (filters.brands?.length) {
      params.brandIds = filters.brands.join(",");
    }

    if (filters.colors?.length) {
      params.colors = filters.colors.join(",");
    }

    const response = await axiosClient.get(`/products/category/${id}/filter`, {
      params,
    });

    return response.data;
  },

  getProductById: async (id: number): Promise<ProductModel> => {
    const response = await axiosClient.get(`/products/product/${id}`);
    return response.data;
  },
};
