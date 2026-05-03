import axios from "axios";
import { API_BASE_URL } from "../config/config";

const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true"
    }
});

// src/api/axiosClient.ts
axiosClient.interceptors.request.use((config) => {
    // In ra dữ liệu để kiểm tra định dạng gửi đi
    console.log(">>> Request Sent:", {
        url: config.url,
        method: config.method,
        data: config.data,
        headers: config.headers
    });

    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    console.error(">>> Request Error:", error);
    return Promise.reject(error);
});

export default axiosClient;