import type { ShippingMethodModel } from "../../models/ShippingMethodModel";
import { Link } from "react-router-dom"; //[cite: 13]

interface CartSummaryProps {
  totalItems: number;
  totalPrice: number;
  shippingCost: number;
  shippingMethodId: number;
  shippingMethods: ShippingMethodModel[];
  onUpdateShippingMethod: (shippingMethodId: number) => Promise<void>;
}

const CartSummary: React.FC<CartSummaryProps> = ({
                                                   totalItems,
                                                   totalPrice,
                                                   shippingCost,
                                                   shippingMethodId,
                                                   shippingMethods,
                                                   onUpdateShippingMethod,
                                                 }) => {
  const finalTotal = totalPrice + shippingCost;

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const methodId = parseInt(e.target.value);
    // Kiểm tra NaN và chỉ gọi cập nhật nếu giỏ hàng có sản phẩm[cite: 13]
    if (!isNaN(methodId) && totalItems > 0) {
      onUpdateShippingMethod(methodId);
    }
  };

  return (
      <div className="cart-summary">
        <h4 className="summary-title">Tóm tắt đơn hàng</h4>

        <div className="summary-item">
          <span className="summary-label">Số lượng sản phẩm</span>
          <span className="summary-value">{totalItems}</span>
        </div>

        <div className="summary-item">
          <span className="summary-label">Tổng phụ</span>
          <span className="summary-value">{totalPrice.toLocaleString()}đ</span>
        </div>

        <div className="summary-item shipping-item">
          <span className="summary-label">Vận chuyển</span>
          <div className="shipping-options">
            {shippingMethods.length > 0 ? (
                shippingMethods.map((method) => (
                    <div key={method.id} className="form-check text-end">
                      <input
                          className="form-check-input"
                          type="radio"
                          name="shipping"
                          id={`shipping-${method.id}`}
                          value={method.id}
                          checked={shippingMethodId === method.id}
                          onChange={handleShippingChange}
                          disabled={totalItems === 0} // Vô hiệu hóa chọn ship nếu giỏ trống[cite: 13]
                      />
                      <label className="form-check-label" htmlFor={`shipping-${method.id}`}>
                        {method.name} - {method.cost.toLocaleString()}đ
                      </label>
                    </div>
                ))
            ) : (
                <div className="text-muted">Đang tải phương thức vận chuyển...</div>
            )}
          </div>
        </div>

        <div className="summary-item">
          <span className="summary-label">Thuế</span>
          <span className="summary-value">0đ</span>
        </div>

        <div className="summary-item discount">
          <span className="summary-label">Giảm giá</span>
          <span className="summary-value">0đ</span>
        </div>

        <div className="summary-total">
          <span className="summary-label">Tổng</span>
          <span className="summary-value">{finalTotal.toLocaleString()}đ</span>
        </div>

        <div className="checkout-button">
          {/* Chỉ cho phép đi tiếp nếu có sản phẩm[cite: 13] */}
          <Link
              to={totalItems > 0 ? "/checkout" : "#"}
              className={`btn btn-accent w-100 ${totalItems === 0 ? "disabled" : ""}`}
              onClick={(e) => totalItems === 0 && e.preventDefault()}
          >
            Thanh toán <i className="bi bi-arrow-right"></i>
          </Link>
        </div>

        <div className="continue-shopping">
          <Link to="/home" className="btn btn-link w-100">
            <i className="bi bi-arrow-left"></i> Tiếp tục mua sắm
          </Link>
        </div>

        <div className="payment-methods">
          <p className="payment-title">Phương thức thanh toán</p>
          <div className="payment-icons">
            <i className="bi bi-credit-card"></i>
            <i className="bi bi-paypal"></i>
            <i className="bi bi-wallet2"></i>
            <i className="bi bi-bank"></i>
          </div>
        </div>
      </div>
  );
};

export default CartSummary;