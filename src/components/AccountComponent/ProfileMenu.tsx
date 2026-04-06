const ProfileMenu = () => {
  return (
    <div className="profile-menu collapse d-lg-block" id="profileMenu">
      {/* User Info */}
      <div className="user-info" data-aos="fade-right">
        <div className="user-avatar">
          <img src="img/person/person-f-1.webp" alt="Profile" loading="lazy" />
          <span className="status-badge">
            <i className="bi bi-shield-check"></i>
          </span>
        </div>
        <h4>Sarah Anderson</h4>
        <div className="user-status">
          <i className="bi bi-award"></i>
          <span>Premium Member</span>
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
            <a className="nav-link" data-bs-toggle="tab" href="#wishlist">
              <i className="bi bi-heart"></i>
              <span>Danh sách mong muốn</span>
              <span className="badge">12</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-bs-toggle="tab" href="#wallet">
              <i className="bi bi-wallet2"></i>
              <span>Phương thức thanh toán</span>
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
          <a href="#" className="logout-link">
            <i className="bi bi-box-arrow-right"></i>
            <span>Thoát</span>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default ProfileMenu;
