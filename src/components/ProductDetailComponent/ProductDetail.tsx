import BenefitList from "./BenefitList";
import ProductAction from "./ProductAction";

const ProductDetail = () => {
  return (
    <div className="col-lg-5" data-aos="fade-left" data-aos-delay="200">
      <div className="product-details">
        <div className="product-badge-container">
          <span className="badge-category">Giày bóng đá</span>
          <div className="rating-group">
            <div className="stars">
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-half"></i>
            </div>
            <span className="review-text">(127 đánh giá)</span>
          </div>
        </div>

        <h1 className="product-name">
          Mauris tempus cursus magna vel scelerisque nisl consectetur
        </h1>

        <div className="pricing-section">
          <div className="price-display">
            <span className="sale-price">$189.99</span>
            <span className="regular-price">$239.99</span>
          </div>
          <div className="savings-info">
            <span className="save-amount">Tiết kiệm $50.00</span>
            <span className="discount-percent">(21% off)</span>
          </div>
        </div>

        <div className="product-description">
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </p>
        </div>

        <div className="availability-status">
          <div className="stock-indicator">
            <i className="bi bi-check-circle-fill"></i>
            <span className="stock-text">Còn</span>
          </div>
          <div className="quantity-left">Chỉ còn lại 18 sản phẩm</div>
        </div>

        {/*Product Variants Color */}
        <div className="variant-color-section mb-3">
          <h6>Màu sắc</h6>
          <div className="d-flex flex-wrap gap-2">
            <div className="size-option">Trắng</div>
            <div className="size-option">Đỏ </div>
            <div className="size-option">Đen</div>
            <div className="size-option">Xanh Dương</div>
          </div>
        </div>

        {/* Product Variants Size */}
        <div className="variant-size-section mb-3">
          <h6>Kích Thước</h6>
          <div className="d-flex flex-wrap gap-2">
            <div className="size-option">UK 3.5</div>
            <div className="size-option">UK 4</div>
            <div className="size-option">UK 4.5</div>
            <div className="size-option">UK 5</div>
            <div className="size-option">UK 5.5</div>
            <div className="size-option">UK 6</div>
            <div className="size-option">UK 6.5</div>
          </div>
        </div>

        {/* Action */}
        <ProductAction />
        {/* Benefits List */}
        <BenefitList />
      </div>
    </div>
  );
};

export default ProductDetail;
