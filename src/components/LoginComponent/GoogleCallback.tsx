import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

export const GoogleCallback = () => {
  const navigate = useNavigate();
  const { setAuthData } = useAuth();
  const isCalled = useRef(false); // 2. Tạo cờ chặn

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (!code) {
        navigate("/login");
        return;
      }

      // 3. Nếu cờ đã dựng (đã gọi API rồi) thì kết thúc luôn, không gọi lại nữa
      if (isCalled.current) return;
      isCalled.current = true; // Dựng cờ lên ngay lập tức

      try {
        const data = await authApi.googleCallback(code);

        setAuthData({ token: data.token, user: data.user });

        navigate("/home", { replace: true });
      } catch (error) {
        console.error(error);
        navigate("/login");
      }
    };

    handleGoogleCallback();
  }, [navigate]);

  return <p>Đang đăng nhập với Google...</p>;
};
