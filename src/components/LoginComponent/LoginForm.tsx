import { useState } from "react";
import { AuthInput } from "./AuthInput";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../api/authApi.ts";
import { useAuth } from "../../context/AuthContext";

type LoginFieldErrors = Partial<Record<"email" | "password", string>>;

const INVALID_LOGIN_MESSAGE = "Email hoặc mật khẩu không đúng !";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});
  const [httpError, setHttpError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setAuthData } = useAuth();

  const validateFields = () => {
    const nextErrors: LoginFieldErrors = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      nextErrors.email = "Email không được để trống";
    } else if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      nextErrors.email = "Email không hợp lệ";
    }

    if (!password) {
      nextErrors.password = "Mật khẩu không được để trống";
    } else if (password.length < 6) {
      nextErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const applyServerErrors = (errors: unknown) => {
    if (!errors) {
      return false;
    }

    if (Array.isArray(errors)) {
      setHttpError(errors[0] || "Đăng nhập thất bại");
      return true;
    }

    if (typeof errors === "object") {
      const nextFieldErrors: LoginFieldErrors = {};

      for (const [key, value] of Object.entries(errors as Record<string, unknown>)) {
        if (key === "email" || key === "password") {
          nextFieldErrors[key] = String(value);
        }
      }

      if (Object.keys(nextFieldErrors).length > 0) {
        setFieldErrors((current) => ({ ...current, ...nextFieldErrors }));
        return true;
      }
    }

    return false;
  };

  const applyLoginFailureMessage = (message?: string) => {
    if (!message) {
      return false;
    }

    const normalizedMessage = message.toLowerCase();
    const isInvalidLogin =
      normalizedMessage.includes("email hoặc mật khẩu không đúng") ||
      normalizedMessage.includes("sai tài khoản hoặc mật khẩu") ||
      normalizedMessage.includes("invalid credentials");

    if (isInvalidLogin) {
      setFieldErrors({
        email: INVALID_LOGIN_MESSAGE,
        password: INVALID_LOGIN_MESSAGE,
      });
      return true;
    }

    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setHttpError(null);

    if (!validateFields()) {
      return;
    }

    try {
      const data = await authApi.login({ email: email.trim(), password });

      setAuthData({ token: data.token, user: data.user });

      if (data.user.role?.name === "ADMIN") {
        navigate("/admin", { replace: true });
        return;
      }

      navigate("/home", { replace: true });
    } catch (err: any) {
      const responseData = err?.response?.data;

      if (responseData?.errors && applyServerErrors(responseData.errors)) {
        return;
      }

      if (applyLoginFailureMessage(responseData?.message)) {
        return;
      }

      setHttpError(
        responseData?.message || "Đăng nhập thất bại, sai tài khoản hoặc mật khẩu!"
      );
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

        <form className="auth-form-content" onSubmit={handleSubmit} noValidate>

          {/* Hiển thị lỗi tài khoản bị khóa hoặc sai thông tin ngay trên form */}
          {httpError && (
              <div className="alert alert-danger text-center mb-3 p-2 small" role="alert" style={{ borderRadius: "6px" }}>
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {httpError}
              </div>
          )}

          <AuthInput
              name="email"
              type="email"
              placeholder="Email"
              icon="bi-envelope"
              value={email}
              error={fieldErrors.email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (fieldErrors.email) {
                  setFieldErrors((current) => ({ ...current, email: undefined }));
                }
              }}
          />

          <AuthInput
              name="password"
              type="password"
              placeholder="Password"
              icon="bi-lock"
              value={password}
              error={fieldErrors.password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (fieldErrors.password) {
                  setFieldErrors((current) => ({ ...current, password: undefined }));
                }
              }}
          />

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