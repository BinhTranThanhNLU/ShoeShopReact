const mockProducts = [
  {
    id: 1,
    name: "Giày Sneaker Trắng Classic",
    price: "1.890.000₫",
    image: "img/product/product-1.webp",
    badge: "Giới hạn",
    category: "Bộ sưu tập cao cấp",
    ratingCount: 24,
  },
  {
    id: 2,
    name: "Giày Thể Thao Đen Urban",
    price: "1.800.000₫",
    image: "img/product/product-4.webp",
    badge: "Giảm 25%",
    category: "Bán chạy",
    ratingCount: 38,
  },
  {
    id: 3,
    name: "Giày Sneaker Pastel Breeze",
    price: "950.000₫",
    image: "img/product/product-7.webp",
    badge: null,
    category: "Hàng mới về",
    ratingCount: 12,
  },
  {
    id: 4,
    name: "Giày Thể Thao Tím Vibe",
    price: "1.650.000₫",
    image: "img/product/product-10.webp",
    badge: "Xu hướng",
    category: "Dòng thiết kế",
    ratingCount: 56,
  },
];

const ListProductHome = () => {
  return (
    <section id="best-sellers" className="best-sellers section">
      {/* Section Title  */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Sản phẩm bán chạy</h2>
        <p>
          Những mẫu giày thể thao và thời trang được khách hàng yêu thích nhất
          tại cửa hàng
        </p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row g-5">
          {mockProducts.map((product) => (
            <div className="col-lg-3 col-md-6" key={product.id}>
              <div className="product-item">
                <div className="product-image">
                  {/* Render có điều kiện: Nếu có badge thì mới hiển thị div */}
                  {product.badge && (
                    <div className="product-badge">{product.badge}</div>
                  )}

                  {/* Nhúng dữ liệu hình ảnh và alt động */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="img-fluid"
                    loading="lazy"
                  />

                  <div className="product-actions">
                    <button className="action-btn wishlist-btn">
                      <i className="bi bi-heart"></i>
                    </button>
                    <button className="action-btn compare-btn">
                      <i className="bi bi-arrow-left-right"></i>
                    </button>
                    <button className="action-btn quickview-btn">
                      <i className="bi bi-zoom-in"></i>
                    </button>
                  </div>
                  <button className="cart-btn">Thêm vào giỏ</button>
                </div>
                <div className="product-info">
                  <div className="product-category">{product.category}</div>
                  <h4 className="product-name">
                    <a href="pages/product/product-details.html">
                      {product.name}
                    </a>
                  </h4>
                  <div className="product-rating">
                    <div className="stars">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star"></i>
                    </div>
                    <span className="rating-count">
                      ({product.ratingCount})
                    </span>
                  </div>
                  <div className="product-price">{product.price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <a href="#more-info" className="btn btn-dark btn-lg">
            Xem thêm
          </a>
        </div>
      </div>
    </section>
  );
};

export default ListProductHome;
