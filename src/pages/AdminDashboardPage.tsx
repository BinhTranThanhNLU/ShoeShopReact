
import RecentOrdersTable from "../components/AdminDashboardComponent/RecentOrdersTable";
import RevenueChart from "../components/AdminDashboardComponent/RevenueChart";
import StatsCard from "../components/AdminDashboardComponent/StatsCard";
import TopProductsList from "../components/AdminDashboardComponent/TopProductsList";
import { mockStats } from "../mockData/dashboardMockData";

const AdminDashboardPage = () => {
  return (
    <div className="admin-page">
      {/* Page Header */}
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

      {/* Stats Cards */}
      <div className="admin-stats-grid">
        <StatsCard
          title="Tổng doanh thu"
          value={mockStats.totalRevenue.toLocaleString("vi-VN") + "đ"}
          icon="bi-currency-exchange"
          colorClass="icon-wrap--green"
          trend={mockStats.revenueGrowth}
        />
        <StatsCard
          title="Tổng đơn hàng"
          value={mockStats.totalOrders}
          icon="bi-receipt"
          colorClass="icon-wrap--blue"
          trend={mockStats.ordersGrowth}
        />
        <StatsCard
          title="Người dùng"
          value={mockStats.totalUsers.toLocaleString("vi-VN")}
          icon="bi-people-fill"
          colorClass="icon-wrap--purple"
          trend={mockStats.usersGrowth}
        />
        <StatsCard
          title="Sản phẩm"
          value={mockStats.totalProducts}
          icon="bi-box-seam"
          colorClass="icon-wrap--orange"
          trend={mockStats.productsGrowth}
        />
      </div>

      {/* Charts row */}
      <div className="admin-content-grid admin-content-grid--70-30">
        <RevenueChart />
        <TopProductsList />
      </div>

      {/* Recent Orders */}
      <RecentOrdersTable />
    </div>
  );
};

export default AdminDashboardPage;
