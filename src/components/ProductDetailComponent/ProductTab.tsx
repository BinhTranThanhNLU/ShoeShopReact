import OverviewTab from "./OverviewTab";
import ReviewsTab from "./ReviewsTab";
import type { ProductModel } from "../../models/ProductModel";

type ProductTabProps = {
  product: ProductModel;
};

const ProductTab: React.FC<ProductTabProps> = ({ product }) => {
  return (
    <div className="col-12">
      <div className="info-tabs-container">
        <nav className="tabs-navigation nav">
          <button
            className="nav-link active"
            data-bs-toggle="tab"
            data-bs-target="#ecommerce-product-details-5-overview"
            type="button"
          >
            Mô tả
          </button>
          <button
            className="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#ecommerce-product-details-5-customer-reviews"
            type="button"
          >
            Đánh giá
          </button>
        </nav>

        <div className="tab-content">
          <OverviewTab productId={product.id} description={product.description} />
          <ReviewsTab productId={product.id} />
        </div>
      </div>
    </div>
  );
};

export default ProductTab;
