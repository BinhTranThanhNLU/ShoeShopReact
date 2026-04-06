const WishlistTab = () => {
  return (
    <div className="tab-pane fade" id="wishlist">
      <div className="section-header" data-aos="fade-up">
        <h2>Danh sách mong muốn của tôi</h2>
        <div className="header-actions">
          <button
            type="button"
            className="btn btn-dark rounded-pill shadow-sm px-4"
          >
            <i className="bi bi-plus-lg me-2"></i>
            Thêm hết vào giỏ hàng
          </button>
        </div>
      </div>

      <div className="wishlist-grid">
        {/* Wishlist Item 1 */}
        <div className="wishlist-card" data-aos="fade-up" data-aos-delay="100">
          <div className="wishlist-image">
            <img
              src="../../assets/img/product/product-1.webp"
              alt="Product"
              loading="lazy"
            />
            <button
              className="btn-remove"
              type="button"
              aria-label="Remove from wishlist"
            >
              <i className="bi bi-trash"></i>
            </button>
            <div className="sale-badge">-20%</div>
          </div>
          <div className="wishlist-content">
            <h4>Lorem ipsum dolor sit amet</h4>
            <div className="product-meta">
              <div className="rating">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-half"></i>
                <span>(4.5)</span>
              </div>
              <div className="price">
                <span className="current">$79.99</span>
                <span className="original">$99.99</span>
              </div>
            </div>
            <button type="button" className="btn-add-cart">
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>

        {/* Wishlist Item 2 */}
        <div className="wishlist-card" data-aos="fade-up" data-aos-delay="200">
          <div className="wishlist-image">
            <img
              src="../../assets/img/product/product-2.webp"
              alt="Product"
              loading="lazy"
            />
            <button
              className="btn-remove"
              type="button"
              aria-label="Remove from wishlist"
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
          <div className="wishlist-content">
            <h4>Consectetur adipiscing elit</h4>
            <div className="product-meta">
              <div className="rating">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star"></i>
                <span>(4.0)</span>
              </div>
              <div className="price">
                <span className="current">$149.99</span>
              </div>
            </div>
            <button type="button" className="btn-add-cart">
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>

        {/* Wishlist Item 3 */}
        <div className="wishlist-card" data-aos="fade-up" data-aos-delay="300">
          <div className="wishlist-image">
            <img
              src="../../assets/img/product/product-3.webp"
              alt="Product"
              loading="lazy"
            />
            <button
              className="btn-remove"
              type="button"
              aria-label="Remove from wishlist"
            >
              <i className="bi bi-trash"></i>
            </button>
            <div className="out-of-stock-badge">Hết hàng</div>
          </div>
          <div className="wishlist-content">
            <h4>Sed do eiusmod tempor</h4>
            <div className="product-meta">
              <div className="rating">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <span>(5.0)</span>
              </div>
              <div className="price">
                <span className="current">$199.99</span>
              </div>
            </div>
            <button type="button" className="btn-notify">
              Thông báo khi có sẵn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistTab;
