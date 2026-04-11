import type React from "react";
import type { ProductModel } from "../../models/ProductModel";

const ProductCard:React.FC<{product: ProductModel}> = ({product}) => {

  const mainImg = product.images?.[0]?.imageUrl || "/assets/img/no-image.png";
  const hoverImg = product.images?.[1]?.imageUrl || "/assets/img/no-image.png";

  return (
    <div className="col-6 col-xl-4">
      <div className="product-card" data-aos="zoom-in">
        <div className="product-image">
          <img
            src={mainImg}
            className="main-image img-fluid"
            alt={product.name}
          />
          <img
            src={hoverImg}
            className="hover-image img-fluid"
            alt={product.name}
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
          <div className="product-category">{product.category}</div>
          <h4 className="product-title">
            <a href="product-details.html">{product.name}</a>
          </h4>
          <div className="product-meta">
            <div className="product-price">{product.price.toLocaleString()}đ</div>
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
