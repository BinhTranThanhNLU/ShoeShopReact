import type { OrderModel } from "../models/OrderModel";
import type { CheckoutRequest } from "../modelRequest/CheckoutRequest";
import axiosClient from "./axiosClient";

export const orderApi = {
  // Create a new order from checkout
    createOrder: async (data: CheckoutRequest): Promise<OrderModel> => {
      const response = await axiosClient.post("/orders", data);
      return response.data;
    },

  // Get user's orders
  getUserOrders: async (): Promise<OrderModel[]> => {
    const response = await axiosClient.get("/orders/my");
    return response.data;
  },

  // Get order details
  getOrderDetails: async (orderId: number): Promise<OrderModel> => {
    const response = await axiosClient.get(`/orders/${orderId}`);
    return response.data;
  },

  // Process payment for COD
  processCODPayment: async (orderId: number): Promise<{ success: boolean; message: string }> => {
    const response = await axiosClient.post(`/orders/${orderId}/payment/cod`);
    return response.data;
  },

  // Process payment for Bank Transfer
  processBankTransfer: async (
    orderId: number,
    data: { bankCode: string; transactionRef: string }
  ): Promise<{ success: boolean; message: string }> => {
    const response = await axiosClient.post(`/orders/${orderId}/payment/bank-transfer`, data);
    return response.data;
  },

  // Process payment for MoMo
  processMoMoPayment: async (orderId: number): Promise<{ paymentUrl: string }> => {
    const response = await axiosClient.post(`/orders/${orderId}/payment/momo`);
    return response.data;
  },

  // Process payment for ZaloPay
  processZaloPayPayment: async (orderId: number): Promise<{ paymentUrl: string }> => {
    const response = await axiosClient.post(`/orders/${orderId}/payment/zalopay`);
    return response.data;
  },

  // Process payment for VNPay
  processVNPayPayment: async (orderId: number): Promise<{ paymentUrl: string }> => {
    const response = await axiosClient.post(`/orders/${orderId}/payment/vnpay`);
    return response.data;
  },

  // Handle payment callback
  handlePaymentCallback: async (
    orderId: number,
    paymentMethod: string,
    callbackData: Record<string, string>
  ): Promise<{ success: boolean; message: string }> => {
    const response = await axiosClient.post(`/orders/${orderId}/payment/callback`, {
      paymentMethod,
      callbackData,
    });
    return response.data;
  },

  // Cancel order
  cancelOrder: async (orderId: number): Promise<{ success: boolean; message: string }> => {
    const response = await axiosClient.put(`/orders/${orderId}/cancel`);
    return response.data;
  },
};

