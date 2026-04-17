import { useState } from "react";
import { AuthInput } from "./AuthInput";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../api/authApi.ts";
import { ErrorMessage } from "../utils/ErrorMessage.tsx";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [httpError, setHttpError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await authApi.login({ email, password });

      // Lưu token và user vào localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role.name === "ADMIN") {
        navigate("/admin");
        window.location.reload();
        return;
      }

      navigate("/home");
      window.location.reload();
    } catch (error: any) {
      setHttpError(error.message || "Đăng nhập thất bại !");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const data = await authApi.googleLogin();
      window.location.href = data.url;
    } catch (error: any) {
      setHttpError(error.message  || "Đăng nhập bằng Google thất bại !");
    }
  };

  if (httpError) return <ErrorMessage message={httpError} />;

  return (
    <div className="auth-form login-form active">
      <div className="form-header">
        <h3>Chào mừng trở lại</h3>
        <p>Đăng nhập vào tài khoản của bạn</p>
      </div>

      <form className="auth-form-content" onSubmit={handleSubmit}>
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
