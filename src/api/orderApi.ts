import type { OrderModel } from "../models/OrderModel";
import type { CheckoutRequest } from "../modelRequest/CheckoutRequest";
import axiosClient from "./axiosClient";

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
}

export interface AdminOrderListParams {
  keyword?: string;
  status?: string;
  paymentStatus?: string;
  page: number;
  size: number;
}

export const orderApi = {
  // Create a new order from checkout
  createOrder: async (data: CheckoutRequest): Promise<OrderModel> => {
    const response = await axiosClient.post("/orders", data);
    return response.data;
  },

  // Get user's orders
  getUserOrders: async (): Promise<OrderModel[]> => {
    const response = await axiosClient.get("/orders/me");
    return response.data;
  },

  getAdminOrders: async (
    params: AdminOrderListParams,
  ): Promise<PageResponse<OrderModel>> => {
    const response = await axiosClient.get("/admin/orders", { params });
    return response.data;
  },

  getAdminOrderById: async (orderId: number): Promise<OrderModel> => {
    const response = await axiosClient.get(`/admin/orders/${orderId}`);
    return response.data;
  },

  updateAdminOrderStatus: async (
    orderId: number,
    status: string,
  ): Promise<OrderModel> => {
    const response = await axiosClient.patch(`/admin/orders/${orderId}/status`, {
      status,
    });
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



    // Gửi mã đơn hàng và nhận về đường dẫn thanh toán của VNPay[cite: 12]
    processVNPayPayment: async (orderId: number): Promise<{ paymentUrl: string }> => {
      const response = await axiosClient.post(`/orders/${orderId}/payment/vnpay`);
      return response.data;
    },

// Xác thực kết quả thanh toán sau khi Redirect[cite: 12, 13]
  verifyVNPayPayment: async (params: any): Promise<{ status: string }> => {
    const response = await axiosClient.get("/orders/vnpay-callback", { params });
    return response.data;
  },

  cancelOrder: async (orderId: number): Promise<{ success: boolean; message: string }> => {
    const response = await axiosClient.put(`/orders/${orderId}/cancel`);
    return response.data;
  },
  // Trong orderApi.ts
};

