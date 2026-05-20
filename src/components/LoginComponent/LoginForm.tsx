import { useState } from "react";
import { AuthInput } from "./AuthInput";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../api/authApi.ts";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [httpError, setHttpError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setHttpError(null);

    // LOG 1: Kiểm tra xem sự kiện submit form hoạt động chưa
    console.log(">>> [LOG FRONTEND 1] Tiến hành nhấn nút Submit Đăng nhập với Email:", email);

    try {
      const data = await authApi.login({ email, password });

      // LOG 2: Kiểm tra dữ liệu phản hồi từ API khi thành công
      console.log(">>> [LOG FRONTEND 2] API phản hồi Đăng nhập THÀNH CÔNG! Dữ liệu nhận về:", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role?.name === "ADMIN") {
        console.log(">>> [LOG FRONTEND 3A] Tài khoản là ADMIN, điều hướng về trang quản trị...");
        navigate("/admin");
        window.location.reload();
        return;
      }

      console.log(">>> [LOG FRONTEND 3B] Tài khoản là USER, điều hướng về trang chủ /home...");
      navigate("/home");
      window.location.reload();
    } catch (err: any) {
      // LOG 4: Khối catch được kích hoạt khi server trả về lỗi (Mã 400, 401, 403, 500)
      console.error(">>> [LOG FRONTEND ERROR] Phát hiện lỗi phản hồi từ API Backend:", err);

      if (err.response) {
        console.log(">>> Data lỗi chi tiết từ Server:", err.response.data);
        console.log(">>> Mã trạng thái HTTP Status:", err.response.status);
      }

      const serverMessage = err.response?.data?.message || "Đăng nhập thất bại, sai tài khoản hoặc mật khẩu!";
      console.log(">>> Tin nhắn lỗi gán vào Giao diện:", serverMessage);

      setHttpError(serverMessage);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const data = await authApi.googleLogin();
      window.location.href = data.url;
    } catch (err: any) {
      setHttpError("Đăng nhập bằng Google thất bại !");
    }
  };

  return (
      <div className="auth-form login-form active">
        <div className="form-header">
          <h3>Chào mừng trở lại</h3>
          <p>Đăng nhập vào tài khoản của bạn</p>
        </div>

        <form className="auth-form-content" onSubmit={handleSubmit}>

          {/* Hiển thị lỗi tài khoản bị khóa hoặc sai thông tin ngay trên form */}
          {httpError && (
              <div className="alert alert-danger text-center mb-3 p-2 small" role="alert" style={{ borderRadius: "6px" }}>
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {httpError}
              </div>
          )}

          <AuthInput
              type="email"
              placeholder="Email"
              icon="bi-envelope"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
          />

          <AuthInput
              type="password"
              placeholder="Password"
              icon="bi-lock"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-danger">{error}</p>}

          <div className="form-options mb-4">
            <div className="remember-me">
              <input type="checkbox" id="rememberLogin" />
              <label htmlFor="rememberLogin">Remember me</label>
            </div>
            <Link to="/forgot-password" className="forgot-password">
              Quên mật khẩu?
            </Link>
          </div>

          <button type="submit" className="auth-btn primary-btn mb-3">
            Đăng nhập
            <i className="bi bi-arrow-right"></i>
          </button>

          <div className="divider">
            <span>hoặc</span>
          </div>

          <button
              type="button"
              className="auth-btn social-btn"
              onClick={handleGoogleLogin}
          >
            <i className="bi bi-google"></i>
            Tiếp tục với Google
          </button>

          <div className="switch-form">
            <span>Bạn chưa có tài khoản?</span>
            <Link to="/register" className="switch-btn" data-target="register">
              Tạo tài khoản
            </Link>
          </div>
        </form>
      </div>
  );
};

export default LoginForm;