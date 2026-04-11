import type React from "react";
import BenefitList from "./BenefitList";
import ProductAction from "./ProductAction";
import type { ProductModel } from "../../models/ProductModel";
import { useEffect, useMemo, useState } from "react";

const ProductDetail: React.FC<{ product: ProductModel }> = ({ product }) => {
  // 1. Lọc danh sách màu sắc duy nhất (không trùng lặp)
  const uniqueColors = useMemo(() => {
    if (!product.variants) return [];
    const colors = product.variants.map((v) => v.color);
    return Array.from(new Set(colors)); // Dùng Set để loại bỏ màu trùng
  }, [product.variants]);

  // 2. Tạo State lưu trữ lựa chọn của người dùng
  const [selectedColor, setSelectedColor] = useState<string>(
    uniqueColors[0] || "",
  );
  const [selectedSize, setSelectedSize] = useState<string>("");

  // 3. Lọc danh sách kích thước DỰA TRÊN màu đang được chọn
  const availableSizes = useMemo(() => {
    if (!product.variants || !selectedColor) return [];
    return product.variants
      .filter((v) => v.color === selectedColor)
      .map((v) => v.size);
  }, [product.variants, selectedColor]);

  // 4. Auto-select size đầu tiên khi đổi màu (nếu size cũ không có trong màu mới)
  useEffect(() => {
    if (availableSizes.length > 0 && !availableSizes.includes(selectedSize)) {
      setSelectedSize(availableSizes[0]);
    }
  }, [selectedColor, availableSizes, selectedSize]);

  // Lấy ra biến thể (variant) chính xác đang được chọn để lấy số lượng tồn kho
  const currentVariant = product.variants?.find(
    (v) => v.color === selectedColor && v.size === selectedSize,
  );

  return (
    <div className="col-lg-5" data-aos="fade-left" data-aos-delay="200">
      <div className="product-details">
        <div className="product-badge-container">
          <span className="badge-category">{product.category}</span>
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

        <h1 className="product-name">{product.name}</h1>

        <div className="pricing-section">
          <div className="price-display">
            <span className="sale-price">
              {product.price.toLocaleString()}đ
            </span>
            <span className="regular-price">
              {product.price.toLocaleString()}đ
            </span>
          </div>
          <div className="savings-info">
            <span className="discount-percent">{product.discountPercent}</span>
          </div>
        </div>

        <div className="product-description">
          <p>{product.description}</p>
        </div>

        <div className="availability-status">
          <div className="stock-indicator">
            <i className="bi bi-check-circle-fill"></i>
            <span className="stock-text">
              {currentVariant?.stockQuantity && currentVariant.stockQuantity > 0
                ? "Còn hàng"
                : "Hết hàng"}
            </span>
            <div className="quantity-left">
              Chỉ còn lại {currentVariant?.stockQuantity || 0} sản phẩm
            </div>
          </div>
        </div>

        {/* Product Variants Color */}
        <div className="variant-color-section mb-3">
          <h6>
            Màu sắc:{" "}
            <span className="text-primary fw-bold">{selectedColor}</span>
          </h6>
          <div className="d-flex flex-wrap gap-2">
            {uniqueColors.map((color) => (
              <div
                key={color}
                // Thêm class 'bg-dark text-white' hoặc class 'active' tùy CSS của bạn để highlight màu đang chọn
                className={`size-option ${selectedColor === color ? "bg-dark text-white border-dark" : ""}`}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedColor(color)}
              >
                {color}
              </div>
            ))}
          </div>
        </div>

        {/* Product Variants Size */}
        <div className="variant-size-section mb-3">
          <h6>
            Kích Thước:{" "}
            <span className="text-primary fw-bold">{selectedSize}</span>
          </h6>
          <div className="d-flex flex-wrap gap-2">
            {availableSizes.map((size) => (
              <div
                key={size}
                // Thêm class để highlight size đang chọn
                className={`size-option ${selectedSize === size ? "bg-dark text-white border-dark" : ""}`}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        {/* Action */}
        <ProductAction /* currentVariant={currentVariant} */ />
        {/* Benefits List */}
        <BenefitList />
      </div>
    </div>
  );
};

export default ProductDetail;
