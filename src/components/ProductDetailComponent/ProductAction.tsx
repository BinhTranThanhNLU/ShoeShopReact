import { useEffect, useState } from "react";
import type { ProductVariantModel } from "../../models/ProductVariantModel";
import { cartApi } from "../../api/cartApi";
import { useNavigate } from "react-router-dom";

interface ProductActionProps {
  currentVariant?: ProductVariantModel;
  selectedColor: string;
  selectedSize: string;
}

const ProductAction: React.FC<ProductActionProps> = ({
  currentVariant,
  selectedColor,
  selectedSize,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setQuantity(1);
  }, [currentVariant?.id]);

  const maxQuantity = Math.max(currentVariant?.stockQuantity || 1, 1);

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => Math.min(maxQuantity, prev + 1));
  };

  const handleInputQuantity = (value: string) => {
    if (value === "") {
      setQuantity(1);
      return;
    }

    const parsed = Number(value);
    if (!Number.isFinite(parsed)) {
      return;
    }

    const safeQuantity = Math.max(1, Math.min(maxQuantity, Math.floor(parsed)));
    setQuantity(safeQuantity);
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    if (!currentVariant) {
      return;
    }

    if (currentVariant.stockQuantity <= 0) {
      return;
    }

    if (quantity > currentVariant.stockQuantity) {
      return;
    }

    try {
      setIsAddingToCart(true);
      await cartApi.addItemToCart({
        variantId: currentVariant.id,
        color: selectedColor,
        size: selectedSize,
        quantity,
      });
      window.dispatchEvent(new Event("cart-updated"));
    } catch (error: any) {
      console.error(error?.response?.data?.message || "Không thể thêm sản phẩm vào giỏ hàng");
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="purchase-section">
      <div className="quantity-control">
        <label className="control-label">Số lượng:</label>
        <div className="quantity-input-group">
          <div className="quantity-selector">
            <button className="quantity-btn decrease" type="button" onClick={handleDecrease}>
              <i className="bi bi-dash"></i>
            </button>
            <input
              type="number"
              className="quantity-input"
              value={quantity}
              min="1"
              max={maxQuantity}
              onChange={(e) => handleInputQuantity(e.target.value)}
            />
            <button className="quantity-btn increase" type="button" onClick={handleIncrease}>
              <i className="bi bi-plus"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button
          className="btn primary-action"
          onClick={handleAddToCart}
          disabled={isAddingToCart || !currentVariant || currentVariant.stockQuantity <= 0}
        >
          <i className="bi bi-bag-plus"></i>
          {isAddingToCart ? "Đang thêm..." : "Thêm vào giỏ"}
        </button>
        <button className="btn secondary-action">
          <i className="bi bi-lightning"></i>
          Mua ngay
        </button>
        <button className="btn icon-action" title="Add to Wishlist">
          <i className="bi bi-heart"></i>
        </button>
      </div>
    </div>
  );
};

export default ProductAction;
