import type { AddToCartRequest } from "../modelRequest/AddToCartRequest";
import type { CartModel } from "../models/CartModel";
import axiosClient from "./axiosClient";

export const cartApi = {
  addItemToCart: async (data: AddToCartRequest): Promise<CartModel> => {
    const response = await axiosClient.post("/cart/items", data);
    return response.data;
  },

  getMyCart: async (): Promise<CartModel> => {
    const response = await axiosClient.get("/cart");
    return response.data;
  },

  clearMyCart: async (): Promise<CartModel> => {
    const response = await axiosClient.delete("/cart");
    return response.data;
  },

  removeCartItem: async (cartItemId: number): Promise<CartModel> => {
    const response = await axiosClient.delete(`/cart/items/${cartItemId}`);
    return response.data;
  },
};