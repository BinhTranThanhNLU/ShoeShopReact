import type { CategoryModel } from "../models/CategoryModel";
import axiosClient from "./axiosClient";

export const categoryApi = {

  getAllCategories: async (): Promise<CategoryModel[]> => {
    const response = await axiosClient.get("/categories");
    return response.data;
  },
  
};
