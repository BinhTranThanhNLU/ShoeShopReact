import { useState } from "react";
import { AuthInput } from "./AuthInput";
import { Link, useNavigate } from "react-router-dom";
import type {LoginRequest} from "../../modelRequest/LoginRequest.ts";
import {API_BASE_URL} from "../../config/config.ts";
import type {LoginResponse} from "../../modelResponse/LoginResponse.ts";


export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const request: LoginRequest = { email, password };


        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            });

            if (!response.ok) {
                throw new Error("Đăng nhập thất bại");
            }

            const data: LoginResponse = await response.json();

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
            setError(error.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/google`);
            const data = await response.json();
            window.location.href = data.url; // redirect sang Google login
        } catch (error) {
            console.error("Google login failed", error);
        }
    };

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

                <button type="button" className="auth-btn social-btn" onClick={handleGoogleLogin}>
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