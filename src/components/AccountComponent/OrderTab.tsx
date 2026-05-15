import { useEffect, useMemo, useState } from "react";
import { orderApi } from "../../api/orderApi";
import type { OrderModel } from "../../models/OrderModel";
import { OrderDetail } from "./OrderDetail";
import { TrackingOrder } from "./TrackingOrder";

const getStatusLabel = (status: string) => {
  const normalized = status.toLowerCase();

  if (normalized.includes("pending") || normalized.includes("process")) {
    return "Dang xu ly";
  }

  if (normalized.includes("ship")) {
    return "Da van chuyen";
  }

  if (normalized.includes("deliver")) {
    return "Da giao";
  }

  if (normalized.includes("cancel")) {
    return "Da huy";
  }

  return status;
};

const getStatusClassName = (status: string) => {
  const normalized = status.toLowerCase();

  if (normalized.includes("pending") || normalized.includes("process")) {
    return "processing";
  }

  if (normalized.includes("ship")) {
    return "shipped";
  }

  if (normalized.includes("deliver")) {
    return "delivered";
  }

  if (normalized.includes("cancel")) {
    return "cancelled";
  }

  return "processing";
};

const formatDate = (value: string) => {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const formatPrice = (value: number) => {
  return value.toLocaleString("vi-VN") + "d";
};

const OrderTab = () => {
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await orderApi.getUserOrders();
        setOrders(data);
      } catch (err) {
        console.error("Loi khi tai danh sach don hang:", err);
        setError("Khong the tai danh sach don hang. Vui long thu lai.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id.toString().includes(searchTerm.trim()) ||
        order.receiverName.toLowerCase().includes(searchTerm.trim().toLowerCase());

      const matchesFilter =
        statusFilter === "all" || order.status.toLowerCase().includes(statusFilter);

      return matchesSearch && matchesFilter;
    });
  }, [orders, searchTerm, statusFilter]);

  return (
    <div className="tab-pane fade show active" id="orders">
      <div className="section-header" data-aos="fade-up">
        <h2>Don hang cua toi</h2>
        <div className="header-actions">
          <div className="search-box">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Tim kiem ma don hoac ten nguoi nhan..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <div className="dropdown">
            <button className="filter-btn" data-bs-toggle="dropdown" type="button">
              <i className="bi bi-funnel"></i>
              <span>Loc</span>
            </button>
            <ul className="dropdown-menu">
              <li>
                <button type="button" className="dropdown-item" onClick={() => setStatusFilter("all")}>
                  Tat ca don hang
                </button>
              </li>
              <li>
                <button type="button" className="dropdown-item" onClick={() => setStatusFilter("pending")}>
                  Dang xu ly
                </button>
              </li>
              <li>
                <button type="button" className="dropdown-item" onClick={() => setStatusFilter("ship")}>
                  Da van chuyen
                </button>
              </li>
              <li>
                <button type="button" className="dropdown-item" onClick={() => setStatusFilter("deliver")}>
                  Da giao
                </button>
              </li>
              <li>
                <button type="button" className="dropdown-item" onClick={() => setStatusFilter("cancel")}>
                  Da huy
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {loading && <div className="text-center p-4">Dang tai don hang...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="orders-grid">
          {filteredOrders.length === 0 && (
            <div className="text-center p-4">Khong co don hang nao phu hop.</div>
          )}

          {filteredOrders.map((order, index) => (
            <div className="order-card" data-aos="fade-up" data-aos-delay={(index + 1) * 100} key={order.id}>
              <div className="order-header">
                <div className="order-id">
                  <span className="label">Ma don hang:</span>
                  <span className="value">#{order.id}</span>
                </div>
                <div className="order-date">{formatDate(order.createdAt)}</div>
              </div>

              <div className="order-content">
                <div className="product-grid">
                  {order.items.slice(0, 3).map((item) => (
                    <img src={item.image} alt={item.name} loading="lazy" key={item.id} />
                  ))}
                  {order.items.length > 3 && <span className="more-items">+{order.items.length - 3}</span>}
                </div>

                <div className="order-info">
                  <div className="info-row">
                    <span>Trang thai</span>
                    <span className={`status ${getStatusClassName(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                  <div className="info-row">
                    <span>So luong</span>
                    <span>{order.items.length} san pham</span>
                  </div>
                  <div className="info-row">
                    <span>Tong cong</span>
                    <span className="price">{formatPrice(order.totalAmount)}</span>
                  </div>
                </div>
              </div>

              <div className="order-footer">
                <button
                  type="button"
                  className="btn-track"
                  data-bs-toggle="collapse"
                  data-bs-target={`#tracking-${order.id}`}
                  aria-expanded="false"
                >
                  Theo doi don
                </button>
                <button
                  type="button"
                  className="btn-details"
                  data-bs-toggle="collapse"
                  data-bs-target={`#details-${order.id}`}
                  aria-expanded="false"
                >
                  Xem chi tiet
                </button>
              </div>

              <TrackingOrder order={order} />
              <OrderDetail order={order} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderTab;
