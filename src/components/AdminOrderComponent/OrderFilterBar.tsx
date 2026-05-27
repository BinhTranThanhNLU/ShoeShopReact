interface OrderFilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  paymentStatusFilter: string;
  onPaymentStatusFilterChange: (value: string) => void;
  totalCount: number;
  onRefresh: () => void;
}

export const OrderFilterBar = ({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  paymentStatusFilter,
  onPaymentStatusFilterChange,
  totalCount,
  onRefresh,
}: OrderFilterBarProps) => {
  return (
    <div className="card p-3 mb-4 shadow-sm border-0">
      <div className="row g-3 align-items-center">
        <div className="col-md-4">
          <div className="input-group input-group-sm">
            <span className="input-group-text bg-white text-muted">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Tìm theo mã đơn, khách hàng, người nhận..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-2">
          <select
            className="form-select form-select-sm"
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
          >
            <option value="">Tất cả trạng thái</option>
            <option value="PENDING">Chờ xác nhận</option>
            <option value="CONFIRMED">Đã xác nhận</option>
            <option value="SHIPPED">Đang giao</option>
            <option value="DELIVERED">Đã giao</option>
            <option value="CANCELLED">Đã hủy</option>
          </select>
        </div>
        <div className="col-md-2">
          <select
            className="form-select form-select-sm"
            value={paymentStatusFilter}
            onChange={(e) => onPaymentStatusFilterChange(e.target.value)}
          >
            <option value="">Tất cả thanh toán</option>
            <option value="PENDING">Đang chờ</option>
            <option value="SUCCESS">Thành công</option>
            <option value="FAILED">Thất bại</option>
          </select>
        </div>
        <div className="col-md-2 text-muted small">
          Tìm thấy: <strong>{totalCount}</strong> đơn hàng
        </div>
        <div className="col-md-2 text-end">
          <button className="btn btn-sm btn-outline-primary w-100" onClick={onRefresh}>
            <i className="bi bi-arrow-clockwise me-1"></i> Tải lại
          </button>
        </div>
      </div>
    </div>
  );
};
