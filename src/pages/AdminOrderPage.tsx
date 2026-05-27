import { useEffect, useState } from "react";
import { orderApi } from "../api/orderApi";
import { OrderFilterBar } from "../components/AdminOrderComponent/OrderFilterBar";
import { OrderModal } from "../components/AdminOrderComponent/OrderModal";
import { OrderTable } from "../components/AdminOrderComponent/OrderTable";
import AdminPagination from "../components/AdminUserComponent/AdminPagination";
import type { OrderModel } from "../models/OrderModel";

const PAGE_SIZE = 10;

export const AdminOrderPage = () => {
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderModel | null>(null);
  const [modalMode, setModalMode] = useState<"view" | "status" | null>(null);

  const fetchOrders = async (pageNumber: number) => {
    setLoading(true);
    try {
      const data = await orderApi.getAdminOrders({
        keyword: search.trim() || undefined,
        status: statusFilter || undefined,
        paymentStatus: paymentStatusFilter || undefined,
        page: pageNumber - 1,
        size: PAGE_SIZE,
      });

      setOrders(data.content || []);
      setTotalPages(data.totalPages || 1);
      setTotalElements(data.totalElements || 0);
    } catch (error) {
      console.error("Lỗi khi tải danh sách đơn hàng admin:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [search, statusFilter, paymentStatusFilter, currentPage]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    void fetchOrders(currentPage);
  };

  const openOrderModal = async (order: OrderModel, mode: "view" | "status") => {
    try {
      const freshOrder = await orderApi.getAdminOrderById(order.id);
      setSelectedOrder(freshOrder);
      setModalMode(mode);
    } catch (error) {
      console.error("Không thể tải chi tiết đơn hàng:", error);
      alert("Không thể tải chi tiết đơn hàng từ máy chủ.");
    }
  };

  const handleUpdateOrderStatus = async (status: string) => {
    if (!selectedOrder) return;

    try {
      const updatedOrder = await orderApi.updateAdminOrderStatus(
        selectedOrder.id,
        status,
      );
      setSelectedOrder(updatedOrder);
      setOrders((prev) =>
        prev.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order,
        ),
      );
      setModalMode("view");
      await fetchOrders(currentPage);
      alert("Cập nhật trạng thái đơn hàng thành công!");
    } catch (error) {
      console.error("Cập nhật trạng thái thất bại:", error);
      alert("Cập nhật trạng thái đơn hàng thất bại.");
    }
  };

  return (
    <div className="admin-page p-4">
      <div className="admin-page__header d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="admin-page__title fw-bold text-dark m-0">
            Quản Lý Đơn Hàng
          </h2>
          <p className="admin-page__subtitle text-muted small m-0">
            Theo dõi trạng thái xử lý, thanh toán và thông tin giao nhận của
            từng đơn hàng.
          </p>
        </div>
      </div>

      <div className="admin-summary-strip mb-4">
        <div className="admin-summary-strip__item">
          <i className="bi bi-receipt text-primary me-2"></i>
          <span>
            Tổng hiển thị: <strong>{orders.length}</strong>
          </span>
        </div>
        <div className="admin-summary-strip__item">
          <i className="bi bi-list-ol text-success me-2"></i>
          <span>
            Tổng đơn: <strong>{totalElements}</strong>
          </span>
        </div>
        <div className="admin-summary-strip__item">
          <i className="bi bi-hourglass-split text-warning me-2"></i>
          <span>
            Chờ xác nhận:{" "}
            <strong>
              {orders.filter((order) => order.status === "PENDING").length}
            </strong>
          </span>
        </div>
        <div className="admin-summary-strip__item">
          <i className="bi bi-cash-coin text-info me-2"></i>
          <span>
            Thanh toán COD:{" "}
            <strong>
              {orders.filter((order) => order.paymentMethod === "COD").length}
            </strong>
          </span>
        </div>
      </div>

      <OrderFilterBar
        search={search}
        onSearchChange={handleSearchChange}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        paymentStatusFilter={paymentStatusFilter}
        onPaymentStatusFilterChange={setPaymentStatusFilter}
        totalCount={totalElements}
        onRefresh={handleRefresh}
      />

      {loading ? (
        <div className="text-center py-5 text-muted small">
          <div
            className="spinner-border spinner-border-sm text-primary me-2"
            role="status"
          ></div>
          Đang tải dữ liệu đơn hàng từ máy chủ...
        </div>
      ) : (
        <OrderTable
          orders={orders}
          onView={(order) => void openOrderModal(order, "view")}
          onUpdateStatus={(order) => void openOrderModal(order, "status")}
        />
      )}

      <div className="mt-3 d-flex justify-content-end">
        <AdminPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <OrderModal
        mode={modalMode}
        order={selectedOrder}
        onClose={() => {
          setModalMode(null);
          setSelectedOrder(null);
        }}
        onUpdateStatus={handleUpdateOrderStatus}
      />
    </div>
  );
};
