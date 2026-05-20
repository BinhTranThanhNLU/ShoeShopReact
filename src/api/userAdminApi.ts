import axiosClient from "./axiosClient";

export const userAdminApi = {
  getAllUsers: async (params: { keyword?: string; status?: string; roleId?: string; page: number; size: number }) => {
    const response = await axiosClient.get("/admin/users", { params });
    return response.data; // Trả về đối tượng phân trang Page chứa mảng dữ liệu trong thuộc tính .content
  },

  getUserDetail: async (id: number) => {
    const response = await axiosClient.get(`/admin/users/${id}`);
    return response.data;
  },

  toggleUserStatus: async (id: number) => {
    const response = await axiosClient.patch(`/admin/users/${id}/toggle-status`);
    return response.data;
  }
};