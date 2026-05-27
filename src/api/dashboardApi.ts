import axiosClient from "./axiosClient";

export interface DashboardSummaryModel {
  totalRevenue: number;
  revenueGrowthPercent: number | null;
  totalOrders: number;
  ordersGrowthPercent: number | null;
  totalUsers: number;
  usersGrowthPercent: number | null;
  totalProducts: number;
  productsGrowthPercent: number | null;
}

export interface DashboardRevenueModel {
  month: number;
  label: string;
  revenue: number;
}

export interface DashboardTopProductModel {
  rank: number;
  productId: number;
  productName: string;
  brandName: string;
  soldQuantity: number;
  revenue: number;
}

export interface DashboardOrderStatusModel {
  status: string;
  count: number;
}

export interface DashboardOverviewModel {
  year: number;
  summary: DashboardSummaryModel;
  revenueByMonth: DashboardRevenueModel[];
  topProducts: DashboardTopProductModel[];
  orderStatusCounts: DashboardOrderStatusModel[];
}

export const dashboardApi = {
  getOverview: async (params?: { year?: number; topLimit?: number }): Promise<DashboardOverviewModel> => {
    const response = await axiosClient.get("/admin/dashboard", { params });
    return response.data;
  },

  getSummary: async (): Promise<DashboardSummaryModel> => {
    const response = await axiosClient.get("/admin/dashboard/summary");
    return response.data;
  },

  getRevenueByMonth: async (year?: number): Promise<DashboardRevenueModel[]> => {
    const response = await axiosClient.get("/admin/dashboard/revenue", { params: { year } });
    return response.data;
  },

  getTopProducts: async (params?: { year?: number; limit?: number }): Promise<DashboardTopProductModel[]> => {
    const response = await axiosClient.get("/admin/dashboard/top-products", { params });
    return response.data;
  },

  getOrderStatusCounts: async (): Promise<DashboardOrderStatusModel[]> => {
    const response = await axiosClient.get("/admin/dashboard/order-status-counts");
    return response.data;
  },
};