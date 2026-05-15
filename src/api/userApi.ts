import type { ChangePasswordRequest } from "../modelRequest/ChangePasswordRequest.ts";
import type { UpdaterUserRequest } from "../modelRequest/UpdateUserRequest";
import type { UserModel } from "../models/UserModel";
import axiosClient from "./axiosClient";

export const userApi = {
    getMe: async (): Promise<UserModel> => {
        const response = await axiosClient.get("/users/me");
        return response.data;
    },

    updateMyProfile: async (data: UpdaterUserRequest): Promise<UserModel> => {
        const response = await axiosClient.patch("/users/me", data);
        return response.data;
    },

    changePassword: async (data: ChangePasswordRequest): Promise<void> => {
        await axiosClient.patch("/users/me/password", data);
    },
};