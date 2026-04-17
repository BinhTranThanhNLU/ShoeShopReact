import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SettingTab = () => {
  // Quản lý trạng thái thông tin cá nhân
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });

  // Quản lý trạng thái đổi mật khẩu
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // 1. Lấy thông tin người dùng hiện tại khi component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/users', {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Cập nhật state với dữ liệu từ Backend UserDTO
        setFormData({
          fullName: response.data.fullName || '',
          email: response.data.email || '',
          phone: response.data.phone || ''
        });
      } catch (error) {
        console.error("Lỗi khi tải thông tin người dùng:", error);
      }
    };
    fetchUserData();
  }, []);

  // 2. Xử lý cập nhật thông tin cá nhân (PatchMapping /api/users)
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      // Gửi request tới UserController.updateUser
      await axios.patch('http://localhost:8080/api/users', {
        fullName: formData.fullName,
        phone: formData.phone
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Thay đổi của bạn đã được lưu thành công!");
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      alert("Không thể lưu thay đổi. Vui lòng thử lại.");
    }
  };

  // 3. Xử lý cập nhật mật khẩu
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      // Bạn có thể sử dụng endpoint /api/auth/reset-password hoặc tạo một endpoint đổi mật khẩu riêng
      await axios.post('http://localhost:8080/api/auth/reset-password', {
        token: token, // Hoặc logic reset password của bạn
        newPassword: passwordData.newPassword
      });
      alert("Mật khẩu của bạn đã được cập nhật thành công!");
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      alert("Cập nhật mật khẩu thất bại.");
    }
  };

  return (
      <div className="tab-pane fade" id="settings">
        <div className="section-header" data-aos="fade-up">
          <h2>Cài đặt tài khoản</h2>
        </div>

        <div className="settings-content">
          {/* Thông tin cá nhân */}
          <div className="settings-section" data-aos="fade-up">
            <h3>Thông tin cá nhân</h3>
            <form className="settings-form" onSubmit={handleUpdateProfile}>
              <div className="row g-3">
                <div className="col-md-12">
                  <label htmlFor="fullName" className="form-label">Họ và Tên</label>
                  <input
                      type="text"
                      className="form-control"
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={formData.email}
                      disabled
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="phone" className="form-label">Số điện thoại</label>
                  <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-buttons">
                <button type="submit" className="btn-save">Lưu thay đổi</button>
              </div>
            </form>
          </div>

          {/* Cài đặt bảo mật */}
          <div className="settings-section" data-aos="fade-up" data-aos-delay="200">
            <h3>Bảo mật</h3>
            <form className="settings-form" onSubmit={handleUpdatePassword}>
              <div className="row g-3">
                <div className="col-md-12">
                  <label htmlFor="currentPassword" className="form-label">Mật khẩu hiện tại</label>
                  <input
                      type="password"
                      className="form-control"
                      id="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="newPassword" className="form-label">Mật khẩu mới</label>
                  <input
                      type="password"
                      className="form-control"
                      id="newPassword"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="confirmPassword" className="form-label">Xác nhận mật khẩu</label>
                  <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      required
                  />
                </div>
              </div>

              <div className="form-buttons">
                <button type="submit" className="btn-save">Cập nhật mật khẩu</button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
};

export default SettingTab;