import axiosClient from "./axiosClient";

export const productAdminApi = {
  getAll: async (params: { keyword?: string; brand?: string; category?: string; page: number; size: number }) => {
    const response = await axiosClient.get("/admin/products", { params });
    return response.data;
  },

  getById: async (id: number) => {
    const response = await axiosClient.get(`/admin/products/${id}`);
    return response.data;
  },

  create: async (formData: FormData) => {
    const response = await axiosClient.post("/admin/products", formData, {
      headers: {
        // Ép buộc xóa bỏ Content-Type mặc định của hệ thống
        // Trình duyệt sẽ tự điền: multipart/form-data; boundary=----WebKitFormBoundary...
        "Content-Type": undefined,
      },
    });
    return response.data;
  },

  update: async (id: number, formData: FormData) => {
    const response = await axiosClient.post(`/admin/products/update/${id}`, formData, {
      headers: {
        "Content-Type": undefined, // Tương tự cho hàm update
      },
    });
    return response.data;
  },

  delete: async (id: number) => {
    const response = await axiosClient.delete(`/admin/products/${id}`);
    return response.data;
  },
  getAttributes: async () => {
    const response = await axiosClient.get("/admin/products/attributes");
    return response.data;
  },
};