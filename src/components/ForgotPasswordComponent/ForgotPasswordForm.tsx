const ForgotPasswordForm = () => {
    return (
        <form>
            <div className="form-floating mb-3">
                <input
                    type="email"
                    className="form-control"
                    id="forgotEmail"
                    name="email"
                    placeholder="Email"
                    required
                    autoComplete="email"
                />
                <label htmlFor="forgotEmail">Email của bạn</label>
            </div>

            <div className="d-grid mb-4">
                <button type="submit" className="btn btn-register">
                    Gửi yêu cầu khôi phục
                </button>
            </div>

            <div className="login-link text-center">
                <p>Quay lại trang <a href="/login">Đăng nhập</a></p>
            </div>
        </form>
    );
};

export default ForgotPasswordForm;