const Footer = () => {
  return (
    <footer className="footer pt-5 pb-3" style={{ backgroundColor: 'var(--background-color)', borderTop: '1px solid #e5e7eb' }}>
      <div className="container">
        <div className="row gy-4 mb-5">
          
          {/* Cột 1: Thông tin thương hiệu */}
          <div className="col-lg-4 col-md-6">
            <a href="/" className="text-decoration-none d-inline-block mb-3">
              {/* Sửa lại tên thương hiệu cho khớp */}
              <h2 className="fw-bold mb-0" style={{ color: 'var(--heading-color)' }}>SportShoe</h2>
            </a>
            <p className="text-muted pe-lg-4">
              Đồng hành cùng đam mê thể thao của bạn. Chúng tôi cung cấp những đôi giày chất lượng nhất, giúp bạn tự tin chinh phục mọi thử thách trên từng bước chạy.
            </p>
            <div className="d-flex gap-3 mt-4">
              <a href="#facebook" className="text-muted fs-5"><i className="bi bi-facebook"></i></a>
              <a href="#instagram" className="text-muted fs-5"><i className="bi bi-instagram"></i></a>
              <a href="#tiktok" className="text-muted fs-5"><i className="bi bi-tiktok"></i></a>
              <a href="#youtube" className="text-muted fs-5"><i className="bi bi-youtube"></i></a>
            </div>
          </div>

          {/* Cột 2: Sản phẩm */}
          <div className="col-lg-2 col-md-6">
            <h5 className="fw-bold mb-3" style={{ color: 'var(--heading-color)' }}>Sản Phẩm</h5>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><a href="#running" className="text-muted text-decoration-none">Giày Chạy Bộ</a></li>
              <li><a href="#football" className="text-muted text-decoration-none">Giày Bóng Đá</a></li>
              <li><a href="#gym" className="text-muted text-decoration-none">Giày Tập Gym</a></li>
              <li><a href="#accessories" className="text-muted text-decoration-none">Phụ Kiện Thể Thao</a></li>
              <li><a href="#sale" className="text-muted text-decoration-none">Hàng Giảm Giá</a></li>
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ */}
          <div className="col-lg-2 col-md-6">
            <h5 className="fw-bold mb-3" style={{ color: 'var(--heading-color)' }}>Hỗ Trợ</h5>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><a href="#help" className="text-muted text-decoration-none">Trung Tâm Trợ Giúp</a></li>
              <li><a href="#track" className="text-muted text-decoration-none">Kiểm Tra Đơn Hàng</a></li>
              <li><a href="#shipping" className="text-muted text-decoration-none">Chính Sách Giao Hàng</a></li>
              <li><a href="#return" className="text-muted text-decoration-none">Đổi Trả & Bảo Hành</a></li>
              <li><a href="#size" className="text-muted text-decoration-none">Hướng Dẫn Chọn Size</a></li>
            </ul>
          </div>

          {/* Cột 4: Liên hệ & Newsletter */}
          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold mb-3" style={{ color: 'var(--heading-color)' }}>Liên Hệ</h5>
            <ul className="list-unstyled d-flex flex-column gap-3 mb-4 text-muted">
              <li className="d-flex align-items-start gap-2">
                <i className="bi bi-geo-alt mt-1"></i>
                <span>Dĩ An, Bình Dương, Việt Nam</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <i className="bi bi-telephone"></i>
                <span>0123 456 789</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <i className="bi bi-envelope"></i>
                <span>support@sportshoe.vn</span>
              </li>
            </ul>
            
            {/* Form đăng ký nhận tin thực tế hơn là nút tải App */}
            <form className="d-flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input type="email" className="form-control bg-light border-0" placeholder="Nhập email của bạn..." />
              <button type="submit" className="btn text-white" style={{ backgroundColor: 'var(--accent-color)' }}>
                Gửi
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="row align-items-center pt-4" style={{ borderTop: '1px solid #e5e7eb' }}>
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0 text-muted small">
              {/* Dùng JS để tự động cập nhật năm hiện tại */}
              &copy; {new Date().getFullYear()} <strong>SportShoe</strong>. Đã đăng ký bản quyền.
            </p>
          </div>
          <div className="col-md-6 d-flex justify-content-center justify-content-md-end gap-3 text-muted fs-4">
            <i className="bi bi-credit-card"></i>
            <i className="bi bi-cash"></i>
            <i className="bi bi-paypal"></i>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;