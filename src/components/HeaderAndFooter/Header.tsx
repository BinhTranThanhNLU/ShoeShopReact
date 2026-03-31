const Header = () => {
  return (
    <header id="header" className="header sticky-top">
      {/* Top Bar */}
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
                  <div className="swiper-slide">
                    💰 Đảm bảo hoàn tiền trong vòng 30 ngày.
                  </div>
                  <div className="swiper-slide">
                    🎁 Giảm giá 20% cho đơn hàng đầu tiên của bạn
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
            <a href="index.html" className="logo d-flex align-items-center">
              <img src="img/logo.webp" alt="" />
              <h1 className="sitename">SportShoe</h1>
            </a>

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
              {/* Mobile Search Toggle */}
              <button
                className="header-action-btn mobile-search-toggle d-xl-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#mobileSearch"
                aria-expanded="false"
                aria-controls="mobileSearch"
              >
                <i className="bi bi-search"></i>
              </button>

              {/* Account */}
              <div className="dropdown account-dropdown">
                <button className="header-action-btn" data-bs-toggle="dropdown">
                  <i className="bi bi-person"></i>
                </button>
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <h6>
                      Chào mừng{" "}
                      <span className="sitename">
                        đến với Cửa hàng SportShoe
                      </span>
                    </h6>
                    <p className="mb-0">Quản lý tài khoản &amp; đơn hàng</p>
                  </div>
                  <div className="dropdown-body">
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="pages/user/account.html"
                    >
                      <i className="bi bi-person-circle me-2"></i>
                      <span>Hồ sơ của tôi</span>
                    </a>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="pages/user/account.html"
                    >
                      <i className="bi bi-bag-check me-2"></i>
                      <span>Đơn hàng của tôi</span>
                    </a>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="pages/user/account.html"
                    >
                      <i className="bi bi-heart me-2"></i>
                      <span>Danh sách mong muốn của tôi</span>
                    </a>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="pages/user/account.html"
                    >
                      <i className="bi bi-gear me-2"></i>
                      <span>Cài đặt</span>
                    </a>
                  </div>
                  <div className="dropdown-footer">
                    <a
                      href="pages/auth/register.html"
                      className="btn btn-primary w-100 mb-2"
                    >
                      Đăng nhập
                    </a>
                    <a
                      href="pages/auth/register.html"
                      className="btn btn-outline-primary w-100"
                    >
                      Đăng ký
                    </a>
                  </div>
                </div>
              </div>

              {/* Wishlist */}
              <a
                href="pages/user/account.html"
                className="header-action-btn d-none d-md-block"
              >
                <i className="bi bi-heart"></i>
                <span className="badge">0</span>
              </a>

              {/* Cart */}
              <a href="pages/cart/cart.html" className="header-action-btn">
                <i className="bi bi-cart3"></i>
                <span className="badge">3</span>
              </a>

              {/* Mobile Navigation Toggle */}
              <i className="mobile-nav-toggle d-xl-none bi bi-list me-0"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="header-nav">
        <div className="container-fluid container-xl position-relative">
          <nav id="navmenu" className="navmenu">
            <ul>
              <li>
                <a href="index.html" className="active">
                  Trang chủ
                </a>
              </li>

              <li className="dropdown">
                <a href="pages/product/category.html">
                  <span>Giày thể thao</span>{" "}
                  <i className="bi bi-chevron-down toggle-dropdown"></i>
                </a>
                <ul>
                  <li>
                    <a href="pages/product/category.html">Bóng đá</a>
                  </li>
                  <li>
                    <a href="pages/product/category.html">Bóng rổ</a>
                  </li>
                  <li>
                    <a href="pages/product/category.html">Bóng chuyền</a>
                  </li>
                  <li>
                    <a href="pages/product/category.html">Chạy bộ</a>
                  </li>
                </ul>
              </li>
              <li className="dropdown">
                <a href="pages/product/category.html">
                  <span>Giày thời trang</span>{" "}
                  <i className="bi bi-chevron-down toggle-dropdown"></i>
                </a>
                <ul>
                  <li>
                    <a href="pages/product/category.html">Giày nam</a>
                  </li>
                  <li>
                    <a href="pages/product/category.html">Giày nữ</a>
                  </li>
                </ul>
              </li>
              <li className="dropdown">
                <a href="pages/product/category.html">
                  <span>Thương hiệu</span>{" "}
                  <i className="bi bi-chevron-down toggle-dropdown"></i>
                </a>
                <ul>
                  <li>
                    <a href="pages/product/category.html">Adidas</a>
                  </li>
                  <li>
                    <a href="pages/product/category.html">Asics</a>
                  </li>
                  <li>
                    <a href="pages/product/category.html">Jodan</a>
                  </li>
                  <li>
                    <a href="pages/product/category.html">Kamito</a>
                  </li>
                  <li>
                    <a href="pages/product/category.html">Mizuno</a>
                  </li>
                  <li>
                    <a href="pages/product/category.html">Nike</a>
                  </li>
                  <li>
                    <a href="pages/product/category.html">Puma</a>
                  </li>
                  <li>
                    <a href="pages/product/category.html">Under Amour</a>
                  </li>
                </ul>
              </li>

              <li>
                <a href="pages/info/about.html">Về chúng tôi</a>
              </li>
              <li>
                <a href="pages/user/contact.html">Liên hệ</a>
              </li>
              <li>
                <a href="#">Tin tức</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Search Form */}
      <div className="collapse" id="mobileSearch">
        <div className="container">
          <form className="search-form">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Tìm kiếm sản phẩm"
              />
              <button className="btn" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
