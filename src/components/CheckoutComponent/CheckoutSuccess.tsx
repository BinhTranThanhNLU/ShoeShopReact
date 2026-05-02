import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { orderApi } from "../../api/orderApi";
import type { OrderModel } from "../../models/OrderModel";

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<OrderModel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrderDetails = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }

      try {
        const orderData = await orderApi.getOrderDetails(parseInt(orderId));
        setOrder(orderData);
      } catch (error) {
        console.error("Failed to load order details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadOrderDetails();
  }, [orderId]);

  return (
    <main className="main">
      <section className="checkout-success section py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="success-card text-center p-5 rounded-lg shadow">
                {/* Success Icon */}
                <div className="success-icon mb-4">
                  <i className="bi bi-check-circle" style={{ fontSize: "4rem", color: "#28a745" }}></i>
                </div>

                {/* Success Message */}
                <h2 className="fs-3 fw-bold mb-3">Thanh toán thành công! 🎉</h2>
                <p className="text-muted mb-4">Cảm ơn bạn đã mua hàng tại chúng tôi</p>

                {/* Order Summary */}
                {loading ? (
                  <div className="alert alert-info">Đang tải thông tin đơn hàng...</div>
                ) : order ? (
                  <div className="order-summary mb-4 text-start">
                    <div className="row mb-3">
                      <div className="col-6 text-muted">
                        <strong>Mã đơn hàng:</strong>
                      </div>
                      <div className="col-6 text-end">#{order.id}</div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-6 text-muted">
                        <strong>Tổng tiền:</strong>
                      </div>
                      <div className="col-6 text-end fw-bold text-primary">
                        {order.totalAmount.toLocaleString("vi-VN")}₫
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-6 text-muted">
                        <strong>Phương thức thanh toán:</strong>
                      </div>
                      <div className="col-6 text-end">{order.paymentMethod}</div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-6 text-muted">
                        <strong>Địa chỉ giao hàng:</strong>
                      </div>
                      <div className="col-6 text-end text-muted">
                        {order.receiverName}, {order.street}, {order.ward}, {order.district}, {order.province}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-6 text-muted">
                        <strong>Trạng thái:</strong>
                      </div>
                      <div className="col-6 text-end">
                        <span className="badge bg-success">{order.status}</span>
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* Action Buttons */}
                <div className="d-grid gap-2">
                  <button onClick={() => navigate(`/orders/${orderId}`)} className="btn btn-primary btn-lg mb-2">
                    Xem chi tiết đơn hàng
                  </button>
                  <button onClick={() => navigate("/home")} className="btn btn-outline-primary btn-lg">
                    Tiếp tục mua sắm
                  </button>
                </div>

                {/* Footer Message */}
                <p className="text-muted mt-4 small">
                  Chúng tôi sẽ gửi email xác nhận và thông tin theo dõi đơn hàng cho bạn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CheckoutSuccess;
