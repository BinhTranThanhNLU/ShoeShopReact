import type {OrderDetailProps} from "../../types/AccountProps";

export const OrderDetail: React.FC<OrderDetailProps> = ({ order }) => {

  return (
    <div className="collapse order-details" id={"details-" + order.id}>
      <div className="details-content">
        <div className="detail-section">
          <h5>Thông tin đơn hàng</h5>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Phương thức thanh toán</span>
              <span className="value">{order.paymentMethod}</span>
            </div>
            <div className="info-item">
              <span className="label">Phương thức giao hàng</span>
              <span className="value">{order.shippingMethodName}</span>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h5>Sản phẩm ({order.items.length})</h5>
          <div className="order-items">
            {order.items.map((item) => (
              <div className="item" key={item.id}>
                <img src={item.image} alt={item.name} loading="lazy" />
                <div className="item-info">
                  <h6>{item.name}</h6>
                  <div className="item-meta">
                    <span className="sku">Mã SP: {item.idVariant}</span>
                    <span className="qty">SL: {item.quantity}</span>
                  </div>
                </div>
                <div className="item-price">
                  {item.price.toLocaleString("vi-VN")}đ
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="detail-section">
          <h5>Chi tiết giá</h5>
          <div className="price-breakdown">
            <div className="price-row">
              <span>Tạm tính</span>
              <span>{(order.subPrice ?? 0).toLocaleString("vi-VN")}</span>
            </div>
            <div className="price-row">
              <span>Phí vận chuyển</span>
              <span>{(order.shippingFee ?? 0).toLocaleString("vi-VN")}</span>
            </div>
            <div className="price-row">
              <span>Giảm giá</span>
              <span>{(order.discount ?? 0).toLocaleString("vi-VN")}</span>
            </div>
            <div className="price-row total">
              <span>Tổng cộng</span>
              <span>{(order.totalAmount ?? 0).toLocaleString("vi-VN")}</span>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h5>Địa chỉ giao hàng</h5>
          <div className="address-info">
            <p>
              {order.receiverName}
              <br />
              {order.street}
              <br />
              {order.ward}
              <br />
              {order.district}
              <br />
              {order.province}
            </p>
            <p className="contact">{order.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
