import { useEffect, useState } from "react";
import type { CartModel } from "../../models/CartModel";
import { cartApi } from "../../api/cartApi";

const OrderSummary = () => {
  const [cart, setCart] = useState<CartModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartData = await cartApi.getMyCart();
        setCart(cartData);
      } catch (error) {
        console.error("Failed to load cart:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  const handleApplyPromo = () => {
    // TODO: Implement promo code validation with backend
    // For now, just add a demo discount
    if (promoCode === "SAVE10") {
      setDiscount(0.1);
    } else if (promoCode === "SAVE20") {
      setDiscount(0.2);
    } else {
      alert("Mã giảm giá không hợp lệ");
      setDiscount(0);
      setPromoCode("");
    }
  };

  if (loading) {
    return (
      <div className="order-summary" data-aos="fade-left" data-aos-delay="200">
        <div className="order-summary-header">
          <h3>Tóm tắt đơn hàng</h3>
        </div>
        <div className="alert alert-info">Đang tải giỏ hàng...</div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="order-summary" data-aos="fade-left" data-aos-delay="200">
        <div className="order-summary-header">
          <h3>Tóm tắt đơn hàng</h3>
        </div>
        <div className="alert alert-warning">Giỏ hàng của bạn trống</div>
      </div>
    );
  }

  const subtotal = cart.totalPrice;
  const shippingFee = cart.shippingCost || 0;
  const discountAmount = subtotal * discount;

  const total = subtotal - discountAmount + shippingFee;

  return (
    <div className="order-summary" data-aos="fade-left" data-aos-delay="200">
      <div className="order-summary-header">
        <h3>Tóm tắt đơn hàng</h3>
        <span className="item-count">{cart.items.length} sản phẩm</span>
      </div>

      <div className="order-summary-content">
        <div className="order-items">
          {cart.items.map((item) => (
            <div className="order-item" key={item.cartItemId}>
              <div className="order-item-image">
                <img
                  src={item.imageUrl || "/img/product/product-1.webp"}
                  alt={item.productName || "Sản phẩm"}
                  className="img-fluid"
                />
              </div>
              <div className="order-item-details">
                <h4>{item.productName || "Sản phẩm"}</h4>
                <p className="order-item-variant">
                  Màu: {item.color} | Size: {item.size}
                </p>
                <div className="order-item-price">
                  <span className="quantity">{item.quantity} ×</span>
                  <span className="price">
                    {item.unitPrice.toLocaleString("vi-VN")}₫
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="promo-code">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Mã giảm giá"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              aria-label="Mã giảm giá"
            />
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={handleApplyPromo}
            >
              Áp dụng
            </button>
          </div>
        </div>

        <div className="order-totals">
          <div className="order-subtotal d-flex justify-content-between">
            <span>Tạm tính</span>
            <span>{subtotal.toLocaleString("vi-VN")}₫</span>
          </div>

          {discount > 0 && (
            <div className="order-discount d-flex justify-content-between text-success">
              <span>Giảm giá ({(discount * 100).toFixed(0)}%)</span>
              <span>-{discountAmount.toLocaleString("vi-VN")}₫</span>
            </div>
          )}

          {/*<div className="order-tax d-flex justify-content-between">*/}
          {/*  <span>Thuế</span>*/}
          {/*  <span>{subtotal.toLocaleString("vi-VN")}₫</span>*/}
          {/*</div>*/}

          <div className="order-shipping d-flex justify-content-between">
            <span>Phí vận chuyển</span>
            <span>{shippingFee.toLocaleString("vi-VN")}₫</span>
          </div>

          <div className="order-total d-flex justify-content-between">
            <span>Tổng cộng</span>
            <span className="text-primary fw-bold">
              {total.toLocaleString("vi-VN")}₫
            </span>
          </div>
        </div>

        <div className="secure-checkout">
          <div className="secure-checkout-header">
            <i className="bi bi-shield-lock"></i>
            <span>Thanh toán an toàn</span>
          </div>
          <div className="payment-icons">
            <i className="bi bi-credit-card-2-front"></i>
            <i className="bi bi-credit-card"></i>
            <i className="bi bi-paypal"></i>
            <i className="bi bi-apple"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
