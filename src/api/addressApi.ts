// src/api/addressApi.ts
import axios from 'axios';
import type {AddressModel} from '../models/AddressModel';

const API_BASE_URL = 'http://localhost:8080/api/addresses'; // Thay đổi theo config của bạn

const addressApi = {
    // Lấy tất cả địa chỉ của một User cụ thể
    getByUserId: async (userId: number): Promise<AddressModel[]> => {
        const response = await axios.get<AddressModel[]>(`${API_BASE_URL}/user/${userId}`);
        return response.data;
    },

    // Lấy chi tiết một địa chỉ
    getById: async (id: number): Promise<AddressModel> => {
        const response = await axios.get<AddressModel>(`${API_BASE_URL}/${id}`);
        return response.data;
    },

    // Tạo địa chỉ mới
    create: async (address: AddressModel): Promise<AddressModel> => {
        const response = await axios.post<AddressModel>(API_BASE_URL, address);
        return response.data;
    },

    // Cập nhật địa chỉ
    update: async (id: number, address: AddressModel): Promise<AddressModel> => {
        const response = await axios.put<AddressModel>(`${API_BASE_URL}/${id}`, address);
        return response.data;
    },

    // Xóa địa chỉ
    delete: async (id: number): Promise<void> => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    },

    // Đặt làm địa chỉ mặc định (Giả định bạn có endpoint này ở Backend)
    setDefault: async (userId: number, addressId: number): Promise<void> => {
        await axios.patch(`${API_BASE_URL}/user/${userId}/default/${addressId}`);
    }
};

export default addressApi;