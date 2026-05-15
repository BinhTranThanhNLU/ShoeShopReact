import type { CreateAddressRequest } from "../modelRequest/CreateAddressRequest";
import type { UpdateAddressRequest } from "../modelRequest/UpdateAddressRequest";
import type { AddressModel } from "../models/AddressModel";
import axiosClient from "./axiosClient";

const addressApi = {
    getMyAddresses: async (): Promise<AddressModel[]> => {
        const response = await axiosClient.get("/addresses/me");
        return response.data;
    },

    create: async (data: CreateAddressRequest): Promise<AddressModel> => {
        const response = await axiosClient.post("/addresses", data);
        return response.data;
    },

    update: async (id: number, data: UpdateAddressRequest): Promise<AddressModel> => {
        const response = await axiosClient.patch(`/addresses/${id}`, data);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await axiosClient.delete(`/addresses/${id}`);
    },

    setDefault: async (id: number): Promise<AddressModel> => {
        const response = await axiosClient.patch(`/addresses/${id}/default`);
        return response.data;
    },
};

export default addressApi;