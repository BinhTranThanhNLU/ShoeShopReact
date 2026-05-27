import type { OrderModel } from "../../models/OrderModel";

interface OrderTableProps {
  orders: OrderModel[];
  onView: (order: OrderModel) => void;
  onUpdateStatus: (order: OrderModel) => void;
}

const orderStatusLabels: Record<string, string> = {
  PENDING: "Chờ xác nhận",
  CONFIRMED: "Đã xác nhận",
  SHIPPED: "Đang giao",
  DELIVERED: "Đã giao",
  CANCELLED: "Đã hủy",
};

export const OrderTable = ({ orders, onView, onUpdateStatus }: OrderTableProps) => {
  const formatCurrency = (value?: number) => {
    if (value === null || value === undefined) return "0đ";
    return `${Number(value).toLocaleString("vi-VN")}đ`;
  };

  const formatDate = (value?: string) => {
    if (!value) return "-";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value : date.toLocaleString("vi-VN");
  };

  return (
    <div className="table-responsive bg-white rounded shadow-sm">
      <table className="table align-middle table-hover mb-0 admin-table">
        <thead className="table-light text-uppercase fs-7">
          <tr>
            <th style={{ width: "110px" }}>Mã đơn</th>
            <th>Khách hàng / Người nhận</th>
            <th>Trạng thái</th>
            <th>Thanh toán</th>
            <th>Giá trị</th>
            <th>Thời gian</th>
            <th className="text-end" style={{ width: "180px" }}>
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center text-muted py-4">
                Không tìm thấy đơn hàng nào.
              </td>
            </tr>
          ) : (
            orders.map((order) => {
              const firstItemImage =
                order.items?.[0]?.image || "https://placehold.co/54x54?text=Order";
              const itemCount =
                order.items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;

              return (
                <tr key={order.id}>
                  <td>
                    <div className="fw-bold text-dark">#{order.id}</div>
                    <small className="text-muted">{itemCount} sản phẩm</small>
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={firstItemImage}
                        alt={order.items?.[0]?.name || "Order"}
                        className="rounded border"
                        style={{
                          width: "54px",
                          height: "54px",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://placehold.co/54x54?text=Error";
                        }}
                      />
                      <div>
                        <div className="fw-semibold text-dark">
                          {order.receiverName}
                        </div>
                        <small className="text-muted d-block">{order.username}</small>
                        <small
                          className="text-muted d-block text-truncate"
                          style={{ maxWidth: "280px" }}
                        >
                          {order.street}, {order.ward}, {order.district}, {order.province}
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        order.status === "CANCELLED"
                          ? "bg-danger-subtle text-danger"
                          : order.status === "DELIVERED"
                            ? "bg-success-subtle text-success"
                            : "bg-warning-subtle text-warning"
                      }`}
                    >
                      {orderStatusLabels[order.status] || order.status}
                    </span>
                  </td>
                  <td>
                    <span className="badge bg-info-subtle text-info">
                      {order.paymentMethod}
                    </span>
                  </td>
                  <td>
                    <div className="fw-bold text-primary">
                      {formatCurrency(Number(order.totalAmount))}
                    </div>
                    <small className="text-muted">
                      Phí ship: {formatCurrency(Number(order.shippingFee))}
                    </small>
                  </td>
                  <td>
                    <div className="small text-dark">Tạo: {formatDate(order.createdAt)}</div>
                    <small className="text-muted d-block">
                      Cập nhật: {formatDate(order.updatedAt)}
                    </small>
                  </td>
                  <td className="text-end">
                    <div className="btn-group btn-group-sm">
                      <button
                        className="btn btn-outline-info"
                        title="Xem chi tiết"
                        onClick={() => onView(order)}
                      >
                        <i className="bi bi-eye"></i>
                      </button>
                      <button
                        className="btn btn-outline-primary"
                        title="Cập nhật trạng thái"
                        onClick={() => onUpdateStatus(order)}
                      >
                        <i className="bi bi-arrow-repeat"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
