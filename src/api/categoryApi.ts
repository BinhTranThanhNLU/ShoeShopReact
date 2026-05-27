import type { CategoryModel } from "../models/CategoryModel";
import axiosClient from "./axiosClient";

export const categoryApi = {
  getAllCategories: async (): Promise<CategoryModel[]> => {
    const response = await axiosClient.get("/categories");
    return response.data;
  },

  getCategoryById: async (id: number): Promise<CategoryModel> => {
    const response = await axiosClient.get(`/admin/categories/${id}`);
    return response.data;
  },

  createCategory: async (data: {
    name: string;
    description: string;
    parentId?: number | null;
  }): Promise<CategoryModel> => {
    const response = await axiosClient.post("/admin/categories", data);
    return response.data;
  },

  updateCategory: async (
    id: number,
    data: {
      name: string;
      description: string;
      parentId?: number | null;
    },
  ): Promise<CategoryModel> => {
    const response = await axiosClient.patch(`/admin/categories/${id}`, data);
    return response.data;
  },

  deleteCategory: async (id: number): Promise<{ message: string }> => {
    const response = await axiosClient.delete(`/admin/categories/${id}`);
    return response.data;
  },
};
