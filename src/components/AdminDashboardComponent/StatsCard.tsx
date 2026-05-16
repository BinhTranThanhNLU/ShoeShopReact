interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  colorClass: string;
  trend?: {
    value: number;
    label: string;
    isPositive: boolean;
  };
}

const StatsCard = ({ title, value, icon, colorClass, trend }: StatsCardProps) => {
  return (
    <div className="stats-card">
      <div className="stats-card__body">
        <div className="stats-card__info">
          <p className="stats-card__title">{title}</p>
          <h3 className="stats-card__value">{value}</h3>
          {trend && (
            <p className={`stats-card__trend ${trend.isPositive ? "stats-card__trend--up" : "stats-card__trend--down"}`}>
              <i className={`bi ${trend.isPositive ? "bi-arrow-up-short" : "bi-arrow-down-short"}`}></i>
              <span>{trend.value}%</span>
              <span className="stats-card__trend-label">{trend.label}</span>
            </p>
          )}
        </div>
        <div className={`stats-card__icon-wrap ${colorClass}`}>
          <i className={`bi ${icon}`}></i>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
