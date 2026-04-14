import { useEffect, useState } from "react";
import type { CategoryModel } from "../../models/CategoryModel";
import { getAllCategories } from "../../api/categoryApi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  // Thêm state để lưu thông tin người dùng
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Lấy danh sách danh mục
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error: any) {
        console.error("Lỗi lấy danh mục:", error);
      }
    };

    // 2. Lấy thông tin người dùng nếu đã có token
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:8080/api/users", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Lỗi lấy thông tin người dùng:", error);
          // Nếu token hết hạn hoặc lỗi, có thể xóa token
          // localStorage.removeItem("token");
        }
      }
    };

    fetchCategories();
    fetchUserData();
  }, []);

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
      <header id="header" className="header sticky-top">
        {/* ... (Phần Top Bar giữ nguyên) ... */}
        <div className="top-bar py-2">
          <div className="container-fluid container-xl">
            <div className="row align-items-center">
              <div className="col-lg-4 d-none d-lg-flex">
                <div className="top-bar-item">
                  <i className="bi bi-telephone-fill me-2"></i>
                  <span>Liên lạc với chúng tôi: </span>
                  <a href="tel:+1234567890">+1 (234) 567-890</a>
                </div>
              </div>

              <div className="col-lg-4 col-md-12 text-center">
                <div className="announcement-slider swiper init-swiper">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      🚚 Miễn phí vận chuyển cho đơn hàng trên 1.000.000 đồng.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="main-header">
          <div className="container-fluid container-xl">
            <div className="d-flex py-3 align-items-center justify-content-between">
              {/* Logo */}
              <Link to="/home" className="logo d-flex align-items-center">
                <img src="/img/logo.webp" alt="" />
                <h1 className="sitename">SportShoe</h1>
              </Link>

              {/* Search */}
              <form className="search-form desktop-search-form">
                <div className="input-group">
                  <input
                      type="text"
                      className="form-control"
                      placeholder="Tìm kiếm sản phẩm..."
                  />
                  <button className="btn" type="submit">
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </form>

              {/* Actions */}
              <div className="header-actions d-flex align-items-center justify-content-end">
                {/* Account Dropdown */}
                <div className="dropdown account-dropdown">
                  <button className="header-action-btn" data-bs-toggle="dropdown">
                    <i className="bi bi-person"></i>
                  </button>
                  <div className="dropdown-menu">
                    <div className="dropdown-header">
                      <h6>
                        Chào mừng <span className="sitename">đến với SportShoe</span>
                      </h6>
                      {/* HIỂN THỊ TÊN NGƯỜI DÙNG Ở ĐÂY */}
                      <p className="mb-0 text-primary fw-bold">
                        {user ? `Xin chào, ${user.fullName}` : "Quản lý tài khoản & đơn hàng"}
                      </p>
                    </div>

                    <div className="dropdown-body">
                      <Link className="dropdown-item d-flex align-items-center" to="/account">
                        <i className="bi bi-person-circle me-2"></i>
                        <span>Hồ sơ của tôi</span>
                      </Link>
                      <Link className="dropdown-item d-flex align-items-center" to="/orders">
                        <i className="bi bi-bag-check me-2"></i>
                        <span>Đơn hàng của tôi</span>
                      </Link>
                      <Link className="dropdown-item d-flex align-items-center" to="/account#settings">
                        <i className="bi bi-gear me-2"></i>
                        <span>Cài đặt</span>
                      </Link>
                    </div>

                    <div className="dropdown-footer">
                      {user ? (
                          <button
                              onClick={handleLogout}
                              className="btn btn-outline-danger w-100"
                          >
                            Đăng xuất
                          </button>
                      ) : (
                          <>
                            <Link to="/login" className="btn btn-primary w-100 mb-2">Đăng nhập</Link>
                            <Link to="/register" className="btn btn-outline-primary w-100">Đăng ký</Link>
                          </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Wishlist & Cart */}
                <Link to="/wishlist" className="header-action-btn d-none d-md-block">
                  <i className="bi bi-heart"></i>
                  <span className="badge">0</span>
                </Link>

                <Link to="/cart" className="header-action-btn">
                  <i className="bi bi-cart3"></i>
                  <span className="badge">3</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ... (Phần Navigation giữ nguyên) ... */}
        <div className="header-nav">
          <div className="container-fluid container-xl position-relative">
            <nav id="navmenu" className="navmenu">
              <ul>
                <li><Link to="/home" className="active">Trang chủ</Link></li>
                {categories.map((category) => (
                    <li key={category.id} className={category.subCategories && category.subCategories.length > 0 ? "dropdown" : ""}>
                      <Link to={`/category/${category.id}`}>
                        <span>{category.name}</span>
                        {category.subCategories && category.subCategories.length > 0 && <i className="bi bi-chevron-down toggle-dropdown"></i>}
                      </Link>
                      {category.subCategories && category.subCategories.length > 0 && (
                          <ul>
                            {category.subCategories.map((sub) => (
                                <li key={sub.id}><Link to={`/category/${sub.id}`}>{sub.name}</Link></li>
                            ))}
                          </ul>
                      )}
                    </li>
                ))}
                <li><Link to="/about">Về chúng tôi</Link></li>
                <li><Link to="/contact">Liên hệ</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
  );
};

export default Header;