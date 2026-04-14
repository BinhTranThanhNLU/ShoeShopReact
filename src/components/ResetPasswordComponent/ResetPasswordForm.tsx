import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {API_BASE_URL} from "../../config/config.ts";

export const ResetPasswordForm = () => {

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage("Mật khẩu xác nhận không khớp!");
            return;
        }

        try {
            const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, newPassword }),
            });
            if (res.ok) {
                const data = await res.json();
                setMessage(data.message);
            } else {
                setMessage("Có lỗi xảy ra!");
            }
        } catch (err) {
            setMessage("Không thể kết nối server!");
        }
    };


    return (
        <div className="row">
            <div className="col-lg-8 mx-auto">
                <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="newPassword"
                            name="newPassword"
                            placeholder="Mật khẩu mới"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="newPassword">Mật khẩu mới</label>
                    </div>

                    {/* Confirm Password */}
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Xác nhận mật khẩu"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                    </div>

                    <div className="d-grid mb-4">
                        <button type="submit" className="btn btn-register">
                            Đặt lại mật khẩu
                        </button>
                    </div>

                    {message && <p className="text-success">{message}</p>}
                </form>
            </div>
        </div>
    );
};
