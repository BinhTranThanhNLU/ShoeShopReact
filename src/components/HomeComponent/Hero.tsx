const Hero = () => {
  return (
    <section id="hero" className="hero section d-flex align-items-center py-5" style={{ minHeight: '80vh', backgroundColor: 'var(--surface-color)' }}>
      <div className="container">
        <div className="row align-items-center">
          
          {/* Cột Nội Dung (Bên Trái) */}
          <div className="col-lg-6 hero-content" data-aos="fade-up" data-aos-delay="100">
            <h1 className="display-4 fw-bold mb-4" style={{ color: 'var(--heading-color)' }}>
              Khám Phá Những Đôi Giày Thể Thao Tuyệt Vời
            </h1>
            <p className="lead mb-4" style={{ color: 'var(--default-color)' }}>
              Bộ sưu tập giày thể thao chất lượng cao, mang đến sự thoải mái và
              phong cách cho mọi hoạt động. Từ bóng đá, chạy bộ đến tập gym,
              chúng tôi có mọi thứ bạn cần.
            </p>
            <div className="hero-actions d-flex gap-3 mt-4">
              {/* Nút chính sử dụng màu cam chủ đạo */}
              <a href="#products" className="btn btn-lg px-4 text-white" style={{ backgroundColor: 'var(--accent-color)' }}>
                Mua Ngay
              </a>
              <a href="#categories" className="btn btn-outline-dark btn-lg px-4">
                Xem Danh Mục
              </a>
            </div>
          </div>

          {/* Cột Hình Ảnh (Bên Phải) - Đơn giản hóa chỉ dùng 1 ảnh thật chất lượng */}
          <div className="col-lg-6 text-center mt-5 mt-lg-0" data-aos="fade-left" data-aos-delay="200">
            <div className="main-product-image position-relative">
              {/* Badge nho nhỏ tạo điểm nhấn */}
              <span className="badge position-absolute top-0 start-0 translate-middle mt-4 ms-4 p-2 text-white" style={{ backgroundColor: 'var(--accent-color)', zIndex: 1 }}>
                Bán Chạy Nhất
              </span>
              
              <img
                src="img/product/product-2.webp"
                alt="Giày thể thao nổi bật"
                className="img-fluid drop-shadow" 
                style={{ maxHeight: '450px', objectFit: 'contain' }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;