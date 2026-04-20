import type { AddToCartRequest } from "../modelRequest/AddToCartRequest";
import type { UpdateCartItemRequest } from "../modelRequest/UpdateCartItemRequest";
import type { UpdateShippingRequest } from "../modelRequest/UpdateShippingRequest";
import type { CartModel } from "../models/CartModel";
import type { ShippingMethodModel } from "../models/ShippingMethodModel";
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

  updateCartItem: async (
    cartItemId: number,
    data: UpdateCartItemRequest,
  ): Promise<CartModel> => {
    const response = await axiosClient.put(`/cart/items/${cartItemId}`, data);
    return response.data;
  },

  getShippingMethods: async (): Promise<ShippingMethodModel[]> => {
    const response = await axiosClient.get("/cart/shipping-methods");
    return response.data;
  },

  updateShippingMethod: async (data: UpdateShippingRequest): Promise<CartModel> => {
    const response = await axiosClient.put("/cart/shipping", data);
    return response.data;
  },
};