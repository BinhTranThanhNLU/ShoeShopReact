import type { ForgotPasswordRequest } from "../modelRequest/ForgotPasswordRequest";
import type { LoginRequest } from "../modelRequest/LoginRequest";
import type { LoginResponse } from "../modelResponse/LoginResponse";
import axiosClient from "./axiosClient";

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await axiosClient.post("/auth/login", data);
    return response.data;
  },

  forgotPassword: async (data: ForgotPasswordRequest) => {
    const response = await axiosClient.post("/auth/forgot-password", data);
    return response.data;
  },

  googleLogin: async () => {
    const response = await axiosClient.get("/auth/google");
    return response.data;
  },

  googleCallback: async (code: string): Promise<LoginResponse> => {
    const response = await axiosClient.get(`/auth/google/callback`, {
      params: { code },
    });
    return response.data;
  },
};
