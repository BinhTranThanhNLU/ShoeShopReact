
import { useEffect, useMemo, useState } from "react";
import { dashboardApi } from "../api/dashboardApi";
import { orderApi } from "../api/orderApi";
import RecentOrdersTable from "../components/AdminDashboardComponent/RecentOrdersTable";
import RevenueChart from "../components/AdminDashboardComponent/RevenueChart";
import StatsCard from "../components/AdminDashboardComponent/StatsCard";
import TopProductsList from "../components/AdminDashboardComponent/TopProductsList";
import type { OrderModel } from "../models/OrderModel";

const statusTrendLabel = "so với tháng trước";

const getTrend = (value: number | null | undefined, fallbackLabel = statusTrendLabel) => {
  if (value === null || value === undefined) return undefined;
  const numericValue = Number(value.toFixed(1));
  return {
    value: Math.abs(numericValue),
    label: fallbackLabel,
    isPositive: numericValue >= 0,
  };
};

const AdminDashboardPage = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [overview, setOverview] = useState<Awaited<ReturnType<typeof dashboardApi.getOverview>> | null>(null);
  const [recentOrders, setRecentOrders] = useState<OrderModel[]>([]);
  const [loading, setLoading] = useState(false);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const [overviewData, ordersData] = await Promise.all([
        dashboardApi.getOverview({ year, topLimit: 5 }),
        orderApi.getAdminOrders({ page: 0, size: 5 }),
      ]);

      setOverview(overviewData);
      setRecentOrders(ordersData.content || []);
      setYear(overviewData.year || year);
    } catch (error) {
      console.error("Không thể tải dữ liệu dashboard admin:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadDashboard();
  }, [year]);

  const summary = overview?.summary;
  const revenueByMonth = overview?.revenueByMonth || [];
  const topProducts = overview?.topProducts || [];

  const orderStatusMap = useMemo(() => {
    return (overview?.orderStatusCounts || []).reduce<Record<string, number>>((acc, item) => {
      acc[item.status] = item.count;
      return acc;
    }, {});
  }, [overview?.orderStatusCounts]);

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h2 className="admin-page__title">Dashboard</h2>
          <p className="admin-page__subtitle">
            Chào mừng trở lại! Đây là tổng quan hoạt động của cửa hàng.
          </p>
        </div>
        <div className="admin-page__header-actions">
          <span className="text-muted small">
            <i className="bi bi-calendar3 me-1"></i>
            {new Date().toLocaleDateString("vi-VN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      <div className="admin-stats-grid">
        <StatsCard
          title="Tổng doanh thu"
          value={summary?.totalRevenue ? Number(summary.totalRevenue).toLocaleString("vi-VN") + "đ" : "0đ"}
          icon="bi-currency-exchange"
          colorClass="icon-wrap--green"
          trend={getTrend(summary?.revenueGrowthPercent)}
        />
        <StatsCard
          title="Tổng đơn hàng"
          value={summary?.totalOrders ?? 0}
          icon="bi-receipt"
          colorClass="icon-wrap--blue"
          trend={getTrend(summary?.ordersGrowthPercent)}
        />
        <StatsCard
          title="Người dùng"
          value={summary?.totalUsers?.toLocaleString("vi-VN") ?? "0"}
          icon="bi-people-fill"
          colorClass="icon-wrap--purple"
          trend={getTrend(summary?.usersGrowthPercent)}
        />
        <StatsCard
          title="Sản phẩm"
          value={summary?.totalProducts ?? 0}
          icon="bi-box-seam"
          colorClass="icon-wrap--orange"
          trend={getTrend(summary?.productsGrowthPercent, "đối với kỳ trước")}
        />
      </div>

      <div className="admin-content-grid admin-content-grid--70-30">
        <RevenueChart revenueByMonth={revenueByMonth} year={year} />
        <TopProductsList topProducts={topProducts} />
      </div>

      <div className="admin-summary-strip mt-4 mb-3">
        <div className="admin-summary-strip__item">
          <i className="bi bi-hourglass-split text-warning me-2"></i>
          <span>Chờ xác nhận: <strong>{orderStatusMap.PENDING || 0}</strong></span>
        </div>
        <div className="admin-summary-strip__item">
          <i className="bi bi-check2-circle text-info me-2"></i>
          <span>Đã xác nhận: <strong>{orderStatusMap.CONFIRMED || 0}</strong></span>
        </div>
        <div className="admin-summary-strip__item">
          <i className="bi bi-truck text-primary me-2"></i>
          <span>Đang giao: <strong>{(orderStatusMap.SHIPPING || 0) + (orderStatusMap.SHIPPED || 0)}</strong></span>
        </div>
        <div className="admin-summary-strip__item">
          <i className="bi bi-check-circle-fill text-success me-2"></i>
          <span>Đã giao: <strong>{orderStatusMap.DELIVERED || 0}</strong></span>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5 text-muted small">
          <div className="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
          Đang tải dữ liệu dashboard từ máy chủ...
        </div>
      ) : (
        <RecentOrdersTable orders={recentOrders} />
      )}
    </div>
  );
};

export default AdminDashboardPage;
