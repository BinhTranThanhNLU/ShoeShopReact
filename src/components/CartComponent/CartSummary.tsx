interface CartSummaryProps {
  totalItems: number;
  totalPrice: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ totalItems, totalPrice }) => {
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
          <div className="form-check text-end">
            <input
              className="form-check-input"
              type="radio"
              name="shipping"
              id="standard"
              checked={true}
            />
            <label className="form-check-label" htmlFor="standard">
              Giao hàng tiêu chuẩn - 100.000đ
            </label>
          </div>
          <div className="form-check text-end">
            <input
              className="form-check-input"
              type="radio"
              name="shipping"
              id="express"
            />
            <label className="form-check-label" htmlFor="express">
              Giao hàng nhanh - 200.000đ
            </label>
          </div>
          <div className="form-check text-end">
            <input
              className="form-check-input"
              type="radio"
              name="shipping"
              id="free"
            />
            <label className="form-check-label" htmlFor="free">
              Miễn phí vận chuyển (Đơn hàng trên 1.000.000đ)
            </label>
          </div>
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
        <span className="summary-value">{totalPrice.toLocaleString()}đ</span>
      </div>

      <div className="checkout-button">
        <a href="#" className="btn btn-accent w-100">
          Thanh toán <i className="bi bi-arrow-right"></i>
        </a>
      </div>

      <div className="continue-shopping">
        <a href="#" className="btn btn-link w-100">
          <i className="bi bi-arrow-left"></i> Tiếp tục mua sắm
        </a>
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
