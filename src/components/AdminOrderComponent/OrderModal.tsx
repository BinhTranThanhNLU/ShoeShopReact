import { useEffect, useState } from "react";
import type { OrderModel } from "../../models/OrderModel";

interface OrderModalProps {
  mode: "view" | "status" | null;
  order: OrderModel | null;
  onClose: () => void;
  onUpdateStatus: (status: string) => Promise<void> | void;
}

const orderStatusLabels: Record<string, string> = {
  PENDING: "Chờ xác nhận",
  CONFIRMED: "Đã xác nhận",
  SHIPPED: "Đang giao",
  DELIVERED: "Đã giao",
  CANCELLED: "Đã hủy",
};

const statusOptions = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];

export const OrderModal = ({ mode, order, onClose, onUpdateStatus }: OrderModalProps) => {
  const [statusValue, setStatusValue] = useState(order?.status ?? "PENDING");

  useEffect(() => {
    if (order) {
      setStatusValue(order.status);
    }
  }, [order]);

  if (!mode || !order) {
    return null;
  }

  const isStatusMode = mode === "status";

  const formatCurrency = (value?: number) => {
    if (value === null || value === undefined) return "0đ";
    return `${Number(value).toLocaleString("vi-VN")}đ`;
  };

  const formatDate = (value?: string) => {
    if (!value) return "-";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value : date.toLocaleString("vi-VN");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onUpdateStatus(statusValue);
  };

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      role="dialog"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header bg-light">
            <h5 className="modal-title fw-bold">
              {isStatusMode
                ? "Cập nhật trạng thái đơn hàng"
                : `Chi tiết đơn hàng #${order.id}`}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div
              className="modal-body text-start"
              style={{ maxHeight: "75vh", overflowY: "auto" }}
            >
              <div className="row g-3">
                <div className="col-md-8">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="border rounded p-3 h-100 bg-light-subtle">
                        <div className="fw-semibold mb-2">Thông tin đơn hàng</div>
                        <div className="small mb-1">
                          <span className="text-muted">Khách hàng:</span> {order.username}
                        </div>
                        <div className="small mb-1">
                          <span className="text-muted">Người nhận:</span> {order.receiverName}
                        </div>
                        <div className="small mb-1">
                          <span className="text-muted">Số điện thoại:</span> {order.phone}
                        </div>
                        <div className="small mb-1">
                          <span className="text-muted">Địa chỉ:</span> {order.street}, {order.ward}, {order.district}, {order.province}
                        </div>
                        <div className="small mb-1">
                          <span className="text-muted">Vận chuyển:</span> {order.shippingMethodName}
                        </div>
                        <div className="small mb-1">
                          <span className="text-muted">Thanh toán:</span> {order.paymentMethod}
                        </div>
                        <div className="small mb-1">
                          <span className="text-muted">Trạng thái:</span> {orderStatusLabels[order.status] || order.status}
                        </div>
                        <div className="small mb-1">
                          <span className="text-muted">Tạo lúc:</span> {formatDate(order.createdAt)}
                        </div>
                        <div className="small">
                          <span className="text-muted">Cập nhật:</span> {formatDate(order.updatedAt)}
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="border rounded p-3 h-100">
                        <div className="fw-semibold mb-2">Tóm tắt thanh toán</div>
                        <div className="d-flex justify-content-between small mb-1">
                          <span>Tạm tính</span>
                          <span>{formatCurrency(Number(order.subPrice))}</span>
                        </div>
                        <div className="d-flex justify-content-between small mb-1">
                          <span>Giảm giá</span>
                          <span>- {formatCurrency(Number(order.discount))}</span>
                        </div>
                        <div className="d-flex justify-content-between small mb-1">
                          <span>Phí vận chuyển</span>
                          <span>{formatCurrency(Number(order.shippingFee))}</span>
                        </div>
                        <hr className="my-2" />
                        <div className="d-flex justify-content-between fw-bold text-primary">
                          <span>Tổng cộng</span>
                          <span>{formatCurrency(Number(order.totalAmount))}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 border-top pt-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <label className="form-label fw-bold text-primary m-0 small">
                        Danh sách sản phẩm trong đơn
                      </label>
                      <span className="badge bg-secondary-subtle text-secondary">
                        {order.items?.length || 0} dòng
                      </span>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-sm align-middle mb-0">
                        <thead>
                          <tr>
                            <th>Sản phẩm</th>
                            <th className="text-end">SL</th>
                            <th className="text-end">Đơn giá</th>
                            <th className="text-end">Thành tiền</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(order.items || []).map((item) => (
                            <tr key={item.id}>
                              <td>
                                <div className="d-flex align-items-center gap-2">
                                  <img
                                    src={item.image || "https://placehold.co/40x40?text=No+Img"}
                                    alt={item.name}
                                    className="rounded border"
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      objectFit: "cover",
                                    }}
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src =
                                        "https://placehold.co/40x40?text=Error";
                                    }}
                                  />
                                  <div>
                                    <div className="fw-semibold small">{item.name}</div>
                                    <small className="text-muted">Mã biến thể: #{item.idVariant}</small>
                                  </div>
                                </div>
                              </td>
                              <td className="text-end">{item.quantity}</td>
                              <td className="text-end">{formatCurrency(Number(item.price))}</td>
                              <td className="text-end fw-semibold">
                                {formatCurrency(Number(item.price) * item.quantity)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {isStatusMode && (
                    <div className="col-12 border-top pt-3">
                      <label className="form-label fw-semibold small">Cập nhật trạng thái</label>
                      <select
                        className="form-select form-select-sm"
                        value={statusValue}
                        onChange={(e) => setStatusValue(e.target.value)}
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {orderStatusLabels[status] || status}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer bg-light">
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={onClose}
              >
                Đóng
              </button>
              {isStatusMode && (
                <button type="submit" className="btn btn-sm btn-primary">
                  Cập nhật trạng thái
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
