import { Link, useLocation } from "react-router-dom";

interface AdminSidebarProps {
  collapsed: boolean;
}

interface NavItem {
  label: string;
  icon: string;
  path: string;
  badge?: number;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

const navConfig: NavGroup[] = [
  {
    group: "Tổng quan",
    items: [
      { label: "Dashboard", icon: "bi-grid-1x2-fill", path: "/admin" },
    ],
  },
  {
    group: "Quản lý",
    items: [
      { label: "Người dùng", icon: "bi-people-fill", path: "/admin/users" },
      { label: "Sản phẩm", icon: "bi-box-seam", path: "/admin/products" },
      { label: "Đơn hàng", icon: "bi-receipt", path: "/admin/orders", badge: 5 },
      { label: "Danh mục", icon: "bi-tags-fill", path: "/admin/categories" },
      { label: "Thương hiệu", icon: "bi-bookmark-star-fill", path: "/admin/brands" },
    ],
  },
  {
    group: "Nội dung",
    items: [
      { label: "Đánh giá", icon: "bi-star-fill", path: "/admin/reviews" },
      { label: "Mã giảm giá", icon: "bi-ticket-perforated-fill", path: "/admin/coupons" },
    ],
  },
  {
    group: "Hệ thống",
    items: [
      { label: "Cài đặt", icon: "bi-gear-fill", path: "/admin/settings" },
      { label: "Báo cáo", icon: "bi-bar-chart-fill", path: "/admin/reports" },
    ],
  },
];

const AdminSidebar = ({ collapsed }: AdminSidebarProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  return (
    <aside className={`admin-sidebar ${collapsed ? "admin-sidebar--collapsed" : ""}`}>
      {/* Logo */}
      <div className="admin-sidebar__logo">
        <Link to="/admin" className="admin-sidebar__logo-link">
          <div className="admin-sidebar__logo-icon">
            <i className="bi bi-box-seam-fill"></i>
          </div>
          {!collapsed && (
            <div className="admin-sidebar__logo-text">
              <span className="admin-sidebar__logo-name">SportShoe</span>
              <span className="admin-sidebar__logo-sub">Admin Panel</span>
            </div>
          )}
        </Link>
      </div>

      {/* Nav */}
      <nav className="admin-sidebar__nav">
        {navConfig.map((group) => (
          <div key={group.group} className="admin-sidebar__group">
            {!collapsed && (
              <span className="admin-sidebar__group-label">{group.group}</span>
            )}
            {group.items.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`admin-sidebar__nav-item ${isActive(item.path) ? "admin-sidebar__nav-item--active" : ""}`}
                title={collapsed ? item.label : undefined}
              >
                <i className={`bi ${item.icon} admin-sidebar__nav-icon`}></i>
                {!collapsed && (
                  <>
                    <span className="admin-sidebar__nav-label">{item.label}</span>
                    {item.badge && (
                      <span className="admin-sidebar__nav-badge">{item.badge}</span>
                    )}
                  </>
                )}
                {collapsed && item.badge && (
                  <span className="admin-sidebar__nav-badge admin-sidebar__nav-badge--dot"></span>
                )}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="admin-sidebar__footer">
          <Link to="/" className="admin-sidebar__footer-link" target="_blank">
            <i className="bi bi-shop me-2"></i>
            Xem trang cửa hàng
          </Link>
        </div>
      )}
    </aside>
  );
};

export default AdminSidebar;
