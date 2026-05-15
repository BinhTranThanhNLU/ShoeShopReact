import { useEffect, useState } from 'react';
import { userApi } from '../../api/userApi';
import type { UserModel } from '../../models/UserModel';

const ProfileMenu = () => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await userApi.getMe();
        setUser(response);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Hàm xử lý đăng xuất
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (loading) {
    return <div className="profile-menu">Đang tải...</div>;
  }

  return (
      <div className="profile-menu collapse d-lg-block" id="profileMenu">
        {/* User Info */}
        <div className="user-info" data-aos="fade-right">
          <div className="user-avatar">
            {/* Sử dụng ảnh từ database hoặc ảnh mặc định nếu chưa có */}
            <img
                src={user?.avatar || "https://i.imgur.com/8Km9tLL.png"}
                alt="Profile"
                loading="lazy"
            />
            <span className="status-badge">
            <i className="bi bi-shield-check"></i>
          </span>
          </div>
          {/* Hiển thị fullName từ UserDTO */}
          <h4>{user?.fullName || 'Người dùng'}</h4>
          <div className="user-status">
            <i className="bi bi-award"></i>
            <span>{user?.role?.name || user?.roleName || 'Thành viên'}</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="menu-nav">
          <ul className="nav flex-column" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" data-bs-toggle="tab" href="#orders">
                <i className="bi bi-box-seam"></i>
                <span>Đơn hàng của tôi</span>
                <span className="badge">3</span>
              </a>
            </li>
           
         
            <li className="nav-item">
              <a className="nav-link" data-bs-toggle="tab" href="#reviews">
                <i className="bi bi-star"></i>
                <span>Đánh giá của tôi</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-bs-toggle="tab" href="#addresses">
                <i className="bi bi-geo-alt"></i>
                <span>Địa chỉ</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-bs-toggle="tab" href="#settings">
                <i className="bi bi-gear"></i>
                <span>Cài đặt</span>
              </a>
            </li>
          </ul>

          <div className="menu-footer">
            <a href="#" className="help-link">
              <i className="bi bi-question-circle"></i>
              <span>Trung tâm trợ giúp</span>
            </a>
            <a href="#" className="logout-link" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right"></i>
              <span>Thoát</span>
            </a>
          </div>
        </nav>
      </div>
  );
};

export default ProfileMenu;