const PromoCard = () => {
  return (
    <section className="promo-section py-5">
      <div className="container" data-aos="fade-up">
        <div className="row g-4">
          
          {/* Banner 1 */}
          <div className="col-md-6">
            {/* Sử dụng chung màu nền --surface-color cho cả 2 thẻ */}
            <div className="card border-0 shadow-sm h-100 overflow-hidden" style={{ backgroundColor: 'var(--surface-color)', borderRadius: '15px' }}>
              <div className="card-body p-4 p-lg-5">
                <div className="row align-items-center h-100">
                  {/* Cột Nội Dung */}
                  <div className="col-7 col-sm-8">
                    <span className="badge mb-3 text-white" style={{ backgroundColor: 'var(--accent-color)' }}>MỚI NHẤT</span>
                    <h3 className="card-title fw-bold text-dark mb-3">Bộ Sưu Tập Mùa Hè</h3>
                    <p className="card-text text-muted mb-4 d-none d-sm-block">
                      Mát mẻ, êm ái và siêu nhẹ cho những ngày năng động.
                    </p>
                    <a href="#summer-collection" className="btn text-white fw-medium px-4 rounded-pill" style={{ backgroundColor: 'var(--accent-color)' }}>
                      Xem Ngay
                    </a>
                  </div>
                  {/* Cột Hình Ảnh */}
                  <div className="col-5 col-sm-4 text-center">
                    <img 
                      src="assets/img/product/product-1.webp" 
                      alt="Bộ sưu tập mùa hè" 
                      className="img-fluid drop-shadow"
                      style={{ transform: 'scale(1.2) rotate(-15deg)', transition: 'transform 0.3s ease' }} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Banner 2 */}
          <div className="col-md-6">
            <div className="card border-0 shadow-sm h-100 overflow-hidden" style={{ backgroundColor: 'var(--surface-color)', borderRadius: '15px' }}>
              <div className="card-body p-4 p-lg-5">
                <div className="row align-items-center h-100">
                  {/* Cột Nội Dung */}
                  <div className="col-7 col-sm-8">
                    <span className="badge bg-dark mb-3">GIẢM 25%</span>
                    <h3 className="card-title fw-bold text-dark mb-3">Giày Chạy Bộ Nam</h3>
                    <p className="card-text text-muted mb-4 d-none d-sm-block">
                      Công nghệ đế bọt biển trợ lực tối đa cho mọi cung đường.
                    </p>
                    <a href="#running-shoes" className="btn btn-outline-dark fw-medium px-4 rounded-pill">
                      Mua Ngay <i className="bi bi-arrow-right ms-2"></i>
                    </a>
                  </div>
                  {/* Cột Hình Ảnh */}
                  <div className="col-5 col-sm-4 text-center">
                    <img 
                      src="assets/img/product/product-4.webp" 
                      alt="Giày chạy bộ nam" 
                      className="img-fluid drop-shadow"
                      style={{ transform: 'scale(1.2) rotate(10deg)', transition: 'transform 0.3s ease' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PromoCard;