import { useParams, useSearchParams } from "react-router-dom";
import BrandFilterWidget from "../components/CategoryComponent/BrandFilterWidget";
import CategoryHeader from "../components/CategoryComponent/CategoryHeader";
import ColorFilterWidget from "../components/CategoryComponent/ColorFilterWidget";
import PricingRangeWidget from "../components/CategoryComponent/PricingRangeWidget";
import ProductCategoriesWidget from "../components/CategoryComponent/ProductCategoriesWidget";
import ProductList from "../components/CategoryComponent/ProductList";
import { PageTitle } from "../components/utils/PageTitle";
import Pagination from "../components/utils/Pagination";
import { useEffect, useState } from "react";

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const categoryId = id ? parseInt(id) : 1;

  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get("page");

  const initialPage = pageParam ? parseInt(pageParam) : 0;
  const [page, setPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(0);

  // Update url khi doi page
  useEffect(() => {
    setSearchParams({ page: (page + 1).toString() });
  }, [page]);

  // Reset page khi đổi category
  useEffect(() => {
    setPage(0);
    setSearchParams({ page: "0" });
  }, [categoryId]);

  // Scroll lên đầu khi đổi page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

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
            <ProductList
              categoryId={categoryId}
              page={page}
              setTotalPages={setTotalPages}
            />
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CategoryPage;
