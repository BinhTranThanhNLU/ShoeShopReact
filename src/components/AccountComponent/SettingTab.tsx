const SettingTab = () => {
  return (
    <div className="tab-pane fade" id="settings">
      <div className="section-header" data-aos="fade-up">
        <h2>Cài đặt tài khoản</h2>
      </div>

      <div className="settings-content">
        {/* Thông tin cá nhân */}
        <div className="settings-section" data-aos="fade-up">
          <h3>Thông tin cá nhân</h3>
          <form className="php-email-form settings-form">
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="firstName" className="form-label">
                  Họ
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  value="Sarah"
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label">
                  Tên
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value="Anderson"
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value="sarah@example.com"
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="phone" className="form-label">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  value="+84 912 345 678"
                />
              </div>
            </div>

            <div className="form-buttons">
              <button type="submit" className="btn-save">
                Lưu thay đổi
              </button>
            </div>

            <div className="loading">Đang xử lý...</div>
            <div className="error-message"></div>
            <div className="sent-message">
              Thay đổi của bạn đã được lưu thành công!
            </div>
          </form>
        </div>

        {/* Tùy chọn email */}
        <div
          className="settings-section"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h3>Tùy chọn email</h3>
          <div className="preferences-list">
            <div className="preference-item">
              <div className="preference-info">
                <h4>Cập nhật đơn hàng</h4>
                <p>Nhận thông báo về trạng thái đơn hàng của bạn</p>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="orderUpdates"
                  checked
                />
              </div>
            </div>

            <div className="preference-item">
              <div className="preference-info">
                <h4>Khuyến mãi</h4>
                <p>Nhận email về các chương trình khuyến mãi và ưu đãi mới</p>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="promotions"
                />
              </div>
            </div>

            <div className="preference-item">
              <div className="preference-info">
                <h4>Bản tin</h4>
                <p>Đăng ký nhận bản tin hàng tuần của chúng tôi</p>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="newsletter"
                  checked
                />
              </div>
            </div>
          </div>
        </div>

        {/* Cài đặt bảo mật */}
        <div
          className="settings-section"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <h3>Bảo mật</h3>
          <form className="php-email-form settings-form">
            <div className="row g-3">
              <div className="col-md-12">
                <label htmlFor="currentPassword" className="form-label">
                  Mật khẩu hiện tại
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="currentPassword"
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="newPassword" className="form-label">
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="confirmPassword" className="form-label">
                  Xác nhận mật khẩu
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  required
                />
              </div>
            </div>

            <div className="form-buttons">
              <button type="submit" className="btn-save">
                Cập nhật mật khẩu
              </button>
            </div>

            <div className="loading">Đang xử lý...</div>
            <div className="error-message"></div>
            <div className="sent-message">
              Mật khẩu của bạn đã được cập nhật thành công!
            </div>
          </form>
        </div>

        {/* Xóa tài khoản */}
        <div
          className="settings-section danger-zone"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <h3>Xóa tài khoản</h3>
          <div className="danger-zone-content">
            <p>
              Một khi bạn xóa tài khoản, sẽ không thể khôi phục lại. Hãy chắc
              chắn trước khi thực hiện.
            </p>
            <button type="button" className="btn-danger">
              Xóa tài khoản
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingTab;
