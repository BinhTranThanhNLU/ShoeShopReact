const RegisterForm = () => {
    return (
        <form>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="fullName" placeholder="Họ và Tên" required autoComplete="name" />
                <label htmlFor="fullName">Họ và Tên</label>
            </div>

            <div className="form-floating mb-3">
                <input type="email" className="form-control" id="email" placeholder="Email" required autoComplete="email" />
                <label htmlFor="email">Email</label>
            </div>

            <div className="row mb-3">
                <div className="col-md-6">
                    <div className="form-floating">
                        <input type="password" className="form-control" id="password" placeholder="Password" required minLength={8} autoComplete="new-password" />
                        <label htmlFor="password">Password</label>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-floating">
                        <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" required minLength={8} autoComplete="new-password" />
                        <label htmlFor="confirmPassword">Xác nhận Password</label>
                    </div>
                </div>
            </div>

            <div className="form-check mb-4">
                <input className="form-check-input" type="checkbox" id="termsCheck" required />
                <label className="form-check-label" htmlFor="termsCheck">
                    Tôi đồng ý với <a href="#">Điều khoản dịch vụ</a> và <a href="#">Chính sách bảo mật</a>
                </label>
            </div>

            <div className="form-check mb-4">
                <input className="form-check-input" type="checkbox" id="marketingCheck" />
                <label className="form-check-label" htmlFor="marketingCheck">
                    Tôi muốn nhận thông tin tiếp thị về sản phẩm, dịch vụ và chương trình khuyến mãi
                </label>
            </div>

            <div className="d-grid mb-4">
                <button type="submit" className="btn btn-register">Tạo tài khoản</button>
            </div>

            <div className="login-link text-center">
                <p>Bạn đã có tài khoản? <a href="/login">Đăng nhập</a></p>
            </div>
        </form>
    );
};

export default RegisterForm;