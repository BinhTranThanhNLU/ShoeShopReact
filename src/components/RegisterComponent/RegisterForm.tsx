import { useState } from "react";
import type {RegisterRequest} from "../../modelRequest/RegisterRequest";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { FormHeader } from "../utils/FormHeader";
import type {UserModel} from "../../models/UserModel";
import { API_BASE_URL } from "../../config/config";

export const RegisterForm = () => {
    const [formData, setFormData] = useState<RegisterRequest>({
        fullName: "",
        email: "",
        password: "",
    });

    const [confirmPassword, setConfirmPassword] = useState("");
    const [termsChecked, setTermsChecked] = useState(false);
    const [marketingChecked, setMarketingChecked] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState<string | null>(null);
    const [success, setSuccess] = useState<UserModel | null>(null);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validatePassword = (password: string) => {
        const regex =
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
        return regex.test(password);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setHttpError(null);
        setSuccess(null);
        setFieldErrors({});

        if (!formData.fullName || !formData.email || !formData.password) {
            setFieldErrors({
                fullName: !formData.fullName ? "Họ tên không được để trống" : "",
                email: !formData.email ? "Email không được để trống" : "",
                password: !formData.password ? "Mật khẩu không được để trống" : "",
            });
            return;
        }

        if (!validatePassword(formData.password)) {
            setFieldErrors({
                password:
                    "Mật khẩu phải có ít nhất 5 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt",
            });
            return;
        }

        if (formData.password !== confirmPassword) {
            setFieldErrors({ confirmPassword: "Mật khẩu xác nhận không khớp!" });
            return;
        }

        if (!termsChecked) {
            setHttpError("Bạn phải đồng ý với điều khoản dịch vụ!");
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.errors) {
                    setFieldErrors(errorData.errors);
                } else {
                    setHttpError(errorData.message || "Đăng ký thất bại");
                }
                return;
            }

            const data: UserModel = await response.json();
            setSuccess(data);
            setFieldErrors({});
        } catch (err: any) {
            setHttpError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="row">
            <div className="col-lg-8 mx-auto">
                <FormHeader headerMessage="Tạo tài khoản của bạn" message="Tạo tài khoản của bạn và bắt đầu mua sắm với chúng tôi"/>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className={`form-control ${
                                fieldErrors.fullName ? "is-invalid" : ""
                            }`}
                            id="fullName"
                            name="fullName"
                            placeholder="Họ và Tên"
                            autoComplete="name"
                            value={formData.fullName}
                            onChange={handleChange}
                        />
                        <label htmlFor="fullName">Họ và Tên</label>
                        {fieldErrors.fullName && (
                            <div className="invalid-feedback text-danger">
                                {fieldErrors.fullName}
                            </div>
                        )}
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className={`form-control ${
                                fieldErrors.email ? "is-invalid" : ""
                            }`}
                            id="email"
                            name="email"
                            placeholder="Email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <label htmlFor="email">Email</label>
                        {fieldErrors.email && (
                            <div className="invalid-feedback text-danger">
                                {fieldErrors.email}
                            </div>
                        )}
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <div className="form-floating">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className={`form-control ${
                                        fieldErrors.password ? "is-invalid" : ""
                                    }`}
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    autoComplete="new-password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <label htmlFor="password">Password</label>

                                <span
                                    className="position-absolute top-50 end-0 translate-middle-y me-3"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
                                {fieldErrors.password && (
                                    <div className="invalid-feedback text-danger">
                                        {fieldErrors.password}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    className={`form-control ${
                                        fieldErrors.confirmPassword ? "is-invalid" : ""
                                    }`}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    autoComplete="new-password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <label htmlFor="confirmPassword">Xác nhận Password</label>
                                <span
                                    className="position-absolute top-50 end-0 translate-middle-y me-3"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                  {showConfirmPassword ? (
                      <EyeOff size={18} />
                  ) : (
                      <Eye size={18} />
                  )}
                </span>
                                {fieldErrors.confirmPassword && (
                                    <div className="invalid-feedback text-danger">
                                        {fieldErrors.confirmPassword}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="form-check mb-4">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="termsCheck"
                            name="termsCheck"
                            checked={termsChecked}
                            onChange={(e) => setTermsChecked(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="termsCheck">
                            Tôi đồng ý với <a href="#">Điều khoản dịch vụ</a> và{" "}
                            <a href="#">Chính sách bảo mật</a>
                        </label>
                    </div>

                    <div className="form-check mb-4">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="marketingCheck"
                            name="marketingCheck"
                            checked={marketingChecked}
                            onChange={(e) => setMarketingChecked(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="marketingCheck">
                            Tôi muốn nhận thông tin tiếp thị về sản phẩm, dịch vụ và chương
                            trình khuyến mãi
                        </label>
                    </div>

                    <div className="d-grid mb-4">
                        <button
                            type="submit"
                            className="btn btn-register"
                            disabled={isLoading}
                        >
                            {isLoading ? "Đang xử lý..." : "Tạo tài khoản"}
                        </button>
                    </div>
                    {success && (
                        <p className="text-success text-center">
                            Đăng ký thành công! Xin chào {success.fullName}.
                        </p>
                    )}
                    {httpError && <p className="text-danger text-center">{httpError}</p>}

                    <div className="login-link text-center">
                        <p>
                            Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default RegisterForm;