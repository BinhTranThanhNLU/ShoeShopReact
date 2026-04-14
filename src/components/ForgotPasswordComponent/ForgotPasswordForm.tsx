
import React, { useState } from 'react';
import axios from 'axios';

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Gọi đến endpoint bạn đã định nghĩa trong AuthController
            const response = await axios.post('http://localhost:8080/api/auth/forgot-password', { email });
            setStatus({ type: 'success', message: response.data.message });
        } catch (error: any) {
            setStatus({
                type: 'danger',
                message: error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại.'
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {status.message && (
                <div className={`alert alert-${status.type} mb-3`}>
                    {status.message}
                </div>
            )}
            <div className="form-floating mb-3">
                <input
                    type="email"
                    className="form-control"
                    id="forgotEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <label htmlFor="forgotEmail">Email của bạn</label>
            </div>

            <div className="d-grid mb-4">
                <button type="submit" className="btn btn-register">
                    Gửi yêu cầu khôi phục
                </button>
            </div>
            {/* ... link quay lại login */}
        </form>
    );
};
export default ForgotPasswordForm;