import { useEffect, useMemo, useRef, useState } from "react";
import type { CartItemModel } from "../../models/CartItemModel";
import type { UpdateCartItemRequest } from "../../modelRequest/UpdateCartItemRequest";

interface CartItemProps {
  item: CartItemModel;
  onRemoveItem: (cartItemId: number) => Promise<void>;
  onUpdateItem: (cartItemId: number, data: UpdateCartItemRequest) => Promise<boolean>;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onRemoveItem,
  onUpdateItem,
}) => {
  const [selectedColor, setSelectedColor] = useState(item.color);
  const [selectedSize, setSelectedSize] = useState(item.size);
  const [selectedQuantity, setSelectedQuantity] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false);
  const lastSyncedRef = useRef({
    color: item.color,
    size: item.size,
    quantity: item.quantity,
  });

  const variants = item.availableVariants || [];

  useEffect(() => {
    setSelectedColor(item.color);
    setSelectedSize(item.size);
    setSelectedQuantity(item.quantity);
    lastSyncedRef.current = {
      color: item.color,
      size: item.size,
      quantity: item.quantity,
    };
  }, [item.cartItemId, item.color, item.size, item.quantity]);

  const colorOptions = useMemo(
    () => Array.from(new Set(variants.map((variant) => variant.color))),
    [variants],
  );

  const sizeOptions = useMemo(
    () =>
      variants
        .filter((variant) => variant.color === selectedColor)
        .map((variant) => variant.size),
    [variants, selectedColor],
  );

  useEffect(() => {
    if (sizeOptions.length > 0 && !sizeOptions.includes(selectedSize)) {
      setSelectedSize(sizeOptions[0]);
    }
  }, [sizeOptions, selectedSize]);

  const selectedVariant = variants.find((variant) => variant.color === selectedColor && variant.size === selectedSize);
  const maxQuantity = selectedVariant?.stockQuantity || item.availableStock;

  const hasChanges =
    selectedColor !== lastSyncedRef.current.color ||
    selectedSize !== lastSyncedRef.current.size ||
    selectedQuantity !== lastSyncedRef.current.quantity;

  const canUpdate =
    hasChanges &&
    selectedQuantity >= 1 &&
    selectedQuantity <= maxQuantity;

  const handleDecrease = () => {
    setSelectedQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrease = () => {
    setSelectedQuantity((prev) => Math.min(maxQuantity, prev + 1));
  };

  const handleInputQuantity = (value: string) => {
    if (value === "") {
      setSelectedQuantity(1);
      return;
    }

    const parsed = Number(value);
    if (!Number.isFinite(parsed)) {
      return;
    }

    setSelectedQuantity(Math.max(1, Math.min(maxQuantity, Math.floor(parsed))));
  };

  useEffect(() => {
    if (!canUpdate || isUpdating) {
      return;
    }

    const timer = window.setTimeout(async () => {
      setIsUpdating(true);
      const isSuccess = await onUpdateItem(item.cartItemId, {
        quantity: selectedQuantity,
        color: selectedColor,
        size: selectedSize,
      });

      if (isSuccess) {
        lastSyncedRef.current = {
          color: selectedColor,
          size: selectedSize,
          quantity: selectedQuantity,
        };
      } else {
        setSelectedColor(lastSyncedRef.current.color);
        setSelectedSize(lastSyncedRef.current.size);
        setSelectedQuantity(lastSyncedRef.current.quantity);
      }

      setIsUpdating(false);
    }, 400);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    canUpdate,
    isUpdating,
    item.cartItemId,
    onUpdateItem,
    selectedColor,
    selectedQuantity,
    selectedSize,
  ]);

  return (
    <div className="cart-item">
      <div className="row align-items-center">
        <div className="col-lg-6 col-12 mt-3 mt-lg-0 mb-lg-0 mb-3">
          <div className="product-info d-flex align-items-center">
            <div className="product-image">
              <img
                src={item.imageUrl || "/img/product/product-1.webp"}
                alt={item.productName}
                className="img-fluid"
                loading="lazy"
              />
            </div>
            <div className="product-details">
              <h6 className="product-title">{item.productName}</h6>
              <div className="product-meta">
                <span className="product-color">Màu: {selectedColor}</span>
                <span className="product-size">Kích thước: {selectedSize}</span>
              </div>

              {variants.length > 0 && (
                <div className="d-flex flex-column gap-2 mt-2">
                  <div className="d-flex gap-2">
                    <select
                      className="form-select form-select-sm"
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      disabled={isUpdating}
                    >
                      {colorOptions.map((color) => (
                        <option key={color} value={color}>
                          {color}
                        </option>
                      ))}
                    </select>

                    <select
                      className="form-select form-select-sm"
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      disabled={isUpdating}
                    >
                      {sizeOptions.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedVariant && selectedVariant.stockQuantity < selectedQuantity && (
                    <small className="text-danger">
                      Biến thể này chỉ còn {selectedVariant.stockQuantity} sản phẩm, số lượng sẽ được giới hạn.
                    </small>
                  )}

                  {isUpdating && <small className="text-muted">Đang cập nhật...</small>}
                </div>
              )}

              <button
                className="remove-item"
                type="button"
                onClick={() => onRemoveItem(item.cartItemId)}
                disabled={isUpdating}
              >
                <i className="bi bi-trash"></i> Xóa
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-12 mt-3 mt-lg-0 text-center">
          <div className="price-tag">
            <span className="current-price">{item.unitPrice.toLocaleString()}đ</span>
          </div>
        </div>
        <div className="col-lg-2 col-12 mt-3 mt-lg-0 text-center">
          <div className="quantity-selector">
            <button className="quantity-btn decrease" type="button" onClick={handleDecrease} disabled={isUpdating}>
              <i className="bi bi-dash"></i>
            </button>
            <input
              type="number"
              className="quantity-input"
              value={selectedQuantity}
              min="1"
              max={maxQuantity}
              onChange={(e) => handleInputQuantity(e.target.value)}
              disabled={isUpdating}
            />
            <button className="quantity-btn increase" type="button" onClick={handleIncrease} disabled={isUpdating}>
              <i className="bi bi-plus"></i>
            </button>
          </div>
        </div>
        <div className="col-lg-2 col-12 mt-3 mt-lg-0 text-center">
          <div className="item-total">
            <span>{item.lineTotal.toLocaleString()}đ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
