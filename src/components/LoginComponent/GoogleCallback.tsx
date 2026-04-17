import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../api/authApi";

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
        const data = await authApi.googleCallback(code);

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
