const ProductCard = () => {
  return (
    <div className="col-6 col-xl-4">
      <div className="product-card" data-aos="zoom-in">
        <div className="product-image">
          <img
            src="img/product/product-f-1.webp"
            className="main-image img-fluid"
            alt="Product"
          />
          <img
            src="img/product/product-f-2.webp"
            className="hover-image img-fluid"
            alt="Product Variant"
          />

          <div className="product-overlay">
            <div className="product-actions">
              <button
                type="button"
                className="action-btn"
                data-bs-toggle="tooltip"
                title="Quick View"
              >
                <i className="bi bi-eye"></i>
              </button>
              <button
                type="button"
                className="action-btn"
                data-bs-toggle="tooltip"
                title="Add to Cart"
              >
                <i className="bi bi-cart-plus"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="product-details">
          <div className="product-category">Women's Fashion</div>
          <h4 className="product-title">
            <a href="product-details.html">Tempor Incididunt</a>
          </h4>
          <div className="product-meta">
            <div className="product-price">$129.00</div>
            <div className="product-rating">
              <i className="bi bi-star-fill"></i>
              4.8 <span>(42)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
