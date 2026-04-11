import type { BrandModel } from "../models/BrandModel";
import axiosClient from "./axiosClient";

export const getAllBrands = async (): Promise<BrandModel[]> => {
    const response = await axiosClient.get("/brands");
    return response.data;
}