import BrandFilterWidget from "../components/CategoryComponent/BrandFilterWidget";
import CategoryHeader from "../components/CategoryComponent/CategoryHeader";
import ColorFilterWidget from "../components/CategoryComponent/ColorFilterWidget";
import PricingRangeWidget from "../components/CategoryComponent/PricingRangeWidget";
import ProductCategoriesWidget from "../components/CategoryComponent/ProductCategoriesWidget";
import ProductList from "../components/CategoryComponent/ProductList";
import { PageTitle } from "../components/utils/PageTitle";
import Pagination from "../components/utils/Pagination";

const CategoryPage = () => {
  return (
    <main className="main">
      <PageTitle
        title="Danh mục sản phẩm"
        breadcrumbs={[
          { label: "Trang chủ", path: "/home" },
          { label: "Danh mục" },
        ]}
      />

      <div className="container">
        <div className="row">
          <div className="col-lg-4 sidebar">
            <div className="widgets-container">
              <ProductCategoriesWidget />
              <PricingRangeWidget />
              <ColorFilterWidget />
              <BrandFilterWidget />
            </div>
          </div>

          <div className="col-lg-8">
            <CategoryHeader />
            <ProductList />
            <Pagination />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CategoryPage;
