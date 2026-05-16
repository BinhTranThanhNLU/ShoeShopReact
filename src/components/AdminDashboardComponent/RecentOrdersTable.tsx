import { mockRecentOrders } from "../../mockData/dashboardMockData";

const statusConfig: Record<string, { label: string; className: string }> = {
  PENDING:    { label: "Chờ xử lý",   className: "badge-warning" },
  PROCESSING: { label: "Đang xử lý",  className: "badge-info"    },
  SHIPPING:   { label: "Đang giao",   className: "badge-primary"  },
  DELIVERED:  { label: "Đã giao",     className: "badge-success"  },
  CANCELLED:  { label: "Đã huỷ",      className: "badge-danger"   },
};

const RecentOrdersTable = () => {
  return (
    <div className="dashboard-card">
      <div className="dashboard-card__header">
        <h5 className="dashboard-card__title">
          <i className="bi bi-receipt me-2"></i>
          Đơn hàng gần đây
        </h5>
        <a href="/admin/orders" className="dashboard-card__link">
          Xem tất cả <i className="bi bi-arrow-right ms-1"></i>
        </a>
      </div>
      <div className="dashboard-card__body p-0">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Khách hàng</th>
                <th>Sản phẩm</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Ngày đặt</th>
              </tr>
            </thead>
            <tbody>
              {mockRecentOrders.map((order) => {
                const status = statusConfig[order.status] ?? { label: order.status, className: "badge-secondary" };
                return (
                  <tr key={order.id}>
                    <td>
                      <span className="admin-table__order-id">#{order.id}</span>
                    </td>
                    <td>
                      <div className="admin-table__user">
                        <div className="admin-table__avatar">
                          {order.username.charAt(0).toUpperCase()}
                        </div>
                        <span>{order.username}</span>
                      </div>
                    </td>
                    <td>
                      <span className="text-muted">{order.items.length} sản phẩm</span>
                    </td>
                    <td>
                      <span className="admin-table__amount">
                        {order.totalAmount.toLocaleString("vi-VN")}đ
                      </span>
                    </td>
                    <td>
                      <span className={`admin-badge ${status.className}`}>{status.label}</span>
                    </td>
                    <td>
                      <span className="text-muted small">
                        {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentOrdersTable;
