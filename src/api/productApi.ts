import type { ProductModel } from "../models/ProductModel";
import axiosClient from "./axiosClient";

export const getAllProducts = async (): Promise<ProductModel[]> => {
    const response = await axiosClient.get("/products");
    return response.data;
}

