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