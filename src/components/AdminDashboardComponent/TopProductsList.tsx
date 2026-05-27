import type { DashboardTopProductModel } from "../../api/dashboardApi";

interface TopProductsListProps {
  topProducts: DashboardTopProductModel[];
}

const TopProductsList = ({ topProducts }: TopProductsListProps) => {
  return (
    <div className="dashboard-card">
      <div className="dashboard-card__header">
        <h5 className="dashboard-card__title">
          <i className="bi bi-trophy me-2"></i>
          Sản phẩm bán chạy
        </h5>
        <a href="/admin/products" className="dashboard-card__link">
          Xem tất cả <i className="bi bi-arrow-right ms-1"></i>
        </a>
      </div>
      <div className="dashboard-card__body">
        <ul className="top-products-list">
          {topProducts.map((product, index) => (
            <li key={product.id} className="top-products-list__item">
              <div className="top-products-list__rank">
                <span className={`top-products-list__rank-num rank-${index + 1}`}>
                  {product.rank || index + 1}
                </span>
              </div>
              <div className="top-products-list__img">
                <img
                  src={`https://placehold.co/48x48/f0f0f0/333?text=${encodeURIComponent(
                    product.brandName?.charAt(0)?.toUpperCase() || "P",
                  )}`}
                  alt={product.productName}
                />
              </div>
              <div className="top-products-list__info">
                <p className="top-products-list__name">{product.productName}</p>
                <small className="text-muted">{product.brandName}</small>
              </div>
              <div className="top-products-list__stats">
                <p className="top-products-list__sold">{product.soldQuantity} đã bán</p>
                <p className="top-products-list__revenue">
                  {product.revenue.toLocaleString("vi-VN")}đ
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopProductsList;
