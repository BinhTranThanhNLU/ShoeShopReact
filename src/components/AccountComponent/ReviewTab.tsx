const ReviewTab = () => {
  return (
    <div className="tab-pane fade" id="reviews">
      <div className="section-header" data-aos="fade-up">
        <h2>Đánh giá của tôi</h2>
        <div className="header-actions">
          <div className="dropdown">
            <button className="filter-btn" data-bs-toggle="dropdown">
              <i className="bi bi-funnel"></i>
              <span>Sắp xếp: Mới nhất</span>
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Mới nhất
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Đánh giá cao nhất
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Đánh giá thấp nhất
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="reviews-grid">
        {/* Review Card 1 */}
        <div className="review-card" data-aos="fade-up" data-aos-delay="100">
          <div className="review-header">
            <img
              src="../../assets/img/product/product-1.webp"
              alt="Sản phẩm"
              className="product-image"
              loading="lazy"
            />
            <div className="review-meta">
              <h4>Sản phẩm tuyệt vời</h4>
              <div className="rating">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <span>(5.0)</span>
              </div>
              <div className="review-date">Đánh giá vào ngày 15/02/2025</div>
            </div>
          </div>
          <div className="review-content">
            <p>
              Sản phẩm đúng như mô tả, chất lượng tốt, giao hàng nhanh chóng.
              Rất hài lòng!
            </p>
          </div>
          <div className="review-footer">
            <button type="button" className="btn-edit">
              Chỉnh sửa
            </button>
            <button type="button" className="btn-delete">
              Xóa
            </button>
          </div>
        </div>

        {/* Review Card 2 */}
        <div className="review-card" data-aos="fade-up" data-aos-delay="200">
          <div className="review-header">
            <img
              src="../../assets/img/product/product-2.webp"
              alt="Sản phẩm"
              className="product-image"
              loading="lazy"
            />
            <div className="review-meta">
              <h4>Đáng để mua</h4>
              <div className="rating">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star"></i>
                <span>(4.0)</span>
              </div>
              <div className="review-date">Đánh giá vào ngày 10/02/2025</div>
            </div>
          </div>
          <div className="review-content">
            <p>
              Sản phẩm khá ổn, giá hợp lý, tuy nhiên đóng gói chưa thật sự chắc
              chắn. Cần cải thiện thêm.
            </p>
          </div>
          <div className="review-footer">
            <button type="button" className="btn-edit">
              Chỉnh sửa
            </button>
            <button type="button" className="btn-delete">
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewTab;
