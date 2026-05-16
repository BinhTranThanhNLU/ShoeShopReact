import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userApi } from "../../api/userApi";
import type { UserModel } from "../../models/UserModel";

interface AdminHeaderProps {
  onToggleSidebar: () => void;
  sidebarCollapsed: boolean;
}

const AdminHeader = ({ onToggleSidebar, sidebarCollapsed }: AdminHeaderProps) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await userApi.getMe();
        setUser(data);
      } catch (error) {
        console.error("Lỗi lấy thông tin admin:", error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="admin-header">
      <div className="admin-header__left">
        <button
          className="admin-header__toggle"
          onClick={onToggleSidebar}
          title={sidebarCollapsed ? "Mở menu" : "Thu menu"}
        >
          <i className={`bi ${sidebarCollapsed ? "bi-layout-sidebar" : "bi-layout-sidebar-inset"}`}></i>
        </button>

        <div className="admin-header__breadcrumb">
          <span className="admin-header__site-name">
            <i className="bi bi-box-seam-fill me-2 text-primary"></i>
            SportShoe Admin
          </span>
        </div>
      </div>

      <div className="admin-header__right">
        {/* Notifications */}
        <button className="admin-header__icon-btn">
          <i className="bi bi-bell"></i>
          <span className="admin-header__badge">3</span>
        </button>

        {/* User dropdown */}
        <div className="admin-header__user" onClick={() => setShowDropdown(!showDropdown)}>
          <div className="admin-header__avatar">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.fullName} />
            ) : (
              <span>{user?.fullName?.charAt(0)?.toUpperCase() ?? "A"}</span>
            )}
          </div>
          <div className="admin-header__user-info d-none d-md-block">
            <span className="admin-header__user-name">{user?.fullName ?? "Admin"}</span>
            <span className="admin-header__user-role">{user?.role?.name ?? "Quản trị viên"}</span>
          </div>
          <i className="bi bi-chevron-down ms-1 small"></i>

          {showDropdown && (
            <div className="admin-header__dropdown">
              <div className="admin-header__dropdown-header">
                <p className="fw-semibold mb-0">{user?.fullName}</p>
                <small className="text-muted">{user?.email}</small>
              </div>
              <div className="admin-header__dropdown-body">
                <Link to="/account" className="admin-header__dropdown-item">
                  <i className="bi bi-person me-2"></i> Hồ sơ cá nhân
                </Link>
                <Link to="/admin/settings" className="admin-header__dropdown-item">
                  <i className="bi bi-gear me-2"></i> Cài đặt
                </Link>
              </div>
              <div className="admin-header__dropdown-footer">
                <button className="admin-header__logout-btn" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-2"></i> Đăng xuất
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
