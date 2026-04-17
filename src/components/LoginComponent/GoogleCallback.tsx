import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config/config";
import type { LoginResponse } from "../../modelResponse/LoginResponse";

export const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (!code) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/auth/google/callback?code=${code}`
        );
        if (!response.ok) throw new Error("Google login failed");

        const data: LoginResponse = await response.json();

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/home");
      } catch (error) {
        console.error(error);
        navigate("/login");
      }
    };

    handleGoogleCallback();
  }, [navigate]);

  return <p>Đang đăng nhập với Google...</p>;
};
