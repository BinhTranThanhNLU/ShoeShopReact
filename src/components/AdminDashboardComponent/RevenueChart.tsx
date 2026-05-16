import { mockMonthlyRevenue } from "../../mockData/dashboardMockData";

const RevenueChart = () => {
  const maxRevenue = Math.max(...mockMonthlyRevenue.map((d) => d.revenue));

  return (
    <div className="dashboard-card">
      <div className="dashboard-card__header">
        <h5 className="dashboard-card__title">
          <i className="bi bi-bar-chart-line me-2"></i>
          Doanh thu theo tháng
        </h5>
        <div className="dashboard-card__legend">
          <span className="legend-dot legend-dot--primary"></span>
          <span className="text-muted small">Năm 2025</span>
        </div>
      </div>
      <div className="dashboard-card__body">
        <div className="revenue-chart">
          {mockMonthlyRevenue.map((item) => {
            const heightPct = maxRevenue > 0 ? (item.revenue / maxRevenue) * 100 : 0;
            return (
              <div key={item.month} className="revenue-chart__col">
                <div className="revenue-chart__bar-wrap">
                  <div
                    className="revenue-chart__bar"
                    style={{ height: `${heightPct}%` }}
                    title={`${item.revenue.toLocaleString("vi-VN")}đ`}
                  >
                    <span className="revenue-chart__tooltip">
                      {(item.revenue / 1_000_000).toFixed(1)}M
                    </span>
                  </div>
                </div>
                <span className="revenue-chart__label">{item.month}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
