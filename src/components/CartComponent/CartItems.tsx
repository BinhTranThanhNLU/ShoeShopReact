import CartItem from "./CartItem";
import type { CartItemModel } from "../../models/CartItemModel";
import type { UpdateCartItemRequest } from "../../modelRequest/UpdateCartItemRequest";

interface CartItemsProps {
  items: CartItemModel[];
  onRemoveItem: (cartItemId: number) => Promise<void>;
  onClearCart: () => Promise<void>;
  onUpdateItem: (cartItemId: number, data: UpdateCartItemRequest) => Promise<boolean>;
}

const CartItems: React.FC<CartItemsProps> = ({ items, onRemoveItem, onClearCart, onUpdateItem }) => {
  return (
    <div className="cart-items">
      <div className="cart-header d-none d-lg-block">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h5>Sản phẩm</h5>
          </div>
          <div className="col-lg-2 text-center">
            <h5>Giá tiền</h5>
          </div>
          <div className="col-lg-2 text-center">
            <h5>Số lượng</h5>
          </div>
          <div className="col-lg-2 text-center">
            <h5>Tổng</h5>
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="alert alert-info mt-3">Giỏ hàng của bạn đang trống.</div>
      ) : (
        items.map((item) => (
          <CartItem
            key={item.cartItemId}
            item={item}
            onRemoveItem={onRemoveItem}
            onUpdateItem={onUpdateItem}
          />
        ))
      )}

      <div className="cart-actions">
        <div className="row">
          <div className="col-lg-6 mb-3 mb-lg-0">
            <div className="coupon-form">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Coupon code"
                />
                <button className="btn btn-outline-accent" type="button">
                  Áp dụng mã giảm giá
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-6 text-md-end">
            <button className="btn btn-outline-remove" type="button" onClick={onClearCart}>
              <i className="bi bi-trash"></i> Xóa cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
