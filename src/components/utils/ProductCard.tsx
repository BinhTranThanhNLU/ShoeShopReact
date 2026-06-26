import type React from "react";
import type { ProductModel } from "../../models/ProductModel";
import { Link, useNavigate } from "react-router-dom";
import { cartApi } from "../../api/cartApi";
import { useState } from "react";

const ProductCard:React.FC<{product: ProductModel}> = ({product}) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const navigate = useNavigate();

  const productImages = product.image ?? [];
  const mainImg = productImages[0]?.imageUrl || "/assets/img/no-image.png";
  const hoverImg = productImages[1]?.imageUrl || "/assets/img/no-image.png";
  const hasDiscount = (product.discountPercent ?? 0) > 0 && !!product.discountedPrice;
  const finalPrice = hasDiscount ? (product.discountedPrice as number) : product.price;

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const inStockVariant = product.variants?.find((variant) => variant.stockQuantity > 0);
    if (!inStockVariant) {
      return;
    }

    try {
      setIsAddingToCart(true);
      await cartApi.addItemToCart({
        variantId: inStockVariant.id,
        color: inStockVariant.color,
        size: inStockVariant.size,
        quantity: 1,
      });
      window.dispatchEvent(new Event("cart-updated"));
    } catch (error: any) {
      console.error(error?.response?.data?.message || "Không thể thêm sản phẩm vào giỏ hàng");
    } finally {
      setIsAddingToCart(false);
    }
  };

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
                onClick={handleAddToCart}
                disabled={isAddingToCart}
              >
                <i className="bi bi-cart-plus"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="product-details">
          <div className="product-category">{product.category}</div>
          <h4 className="product-title">
            <Link to={`/product-detail/${product.id}`}>{product.name}</Link>
          </h4>
          <div className="product-meta">
            <div className="product-price">
              <span className="current-price">{finalPrice.toLocaleString()}đ</span>
              {hasDiscount && (
                <>
                  <span className="old-price original-price">{product.price.toLocaleString()}đ</span>
                  <span className="badge bg-danger ms-2">-{product.discountPercent}%</span>
                </>
              )}
            </div>
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
