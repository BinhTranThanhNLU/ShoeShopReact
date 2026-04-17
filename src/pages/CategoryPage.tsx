import { useEffect, useState, useCallback, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import BrandFilterWidget from "../components/CategoryComponent/BrandFilterWidget";
import CategoryHeader from "../components/CategoryComponent/CategoryHeader";
import ColorFilterWidget from "../components/CategoryComponent/ColorFilterWidget";
import PricingRangeWidget from "../components/CategoryComponent/PricingRangeWidget";
import ProductCategoriesWidget from "../components/CategoryComponent/ProductCategoriesWidget";
import ProductList from "../components/CategoryComponent/ProductList";
import { PageTitle } from "../components/utils/PageTitle";
import Pagination from "../components/utils/Pagination";

import type { BrandModel } from "../models/BrandModel";
import { brandApi } from "../api/brandApi";

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const categoryId = Number(id) || 1;

  const [searchParams, setSearchParams] = useSearchParams();
  const [brandList, setBrandList] = useState<BrandModel[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);

  // 1. Lấy dữ liệu từ URL
  const page = Number(searchParams.get("page")) || 0;
  const filters = useMemo(
    () => ({
      minPrice: searchParams.get("minPrice"),
      maxPrice: searchParams.get("maxPrice"),
      brands: searchParams.getAll("brands"),
      colors: searchParams.getAll("colors"),
    }),
    [searchParams],
  );

  // 2. Hàm cập nhật URL tập trung
  const updateQueryParams = useCallback(
    (newParams: Record<string, any>) => {
      setSearchParams((prev) => {
        const nextParams = new URLSearchParams(prev);
        Object.entries(newParams).forEach(([key, value]) => {
          if (value === null || value === undefined || value === "") {
            nextParams.delete(key);
          } else if (Array.isArray(value)) {
            nextParams.delete(key);
            value.forEach((v) => nextParams.append(key, v.toString()));
          } else {
            nextParams.set(key, value.toString());
          }
        });
        return nextParams;
      });
    },
    [setSearchParams],
  );

  // 3. Fetch Brand List
  useEffect(() => {
    brandApi
      .getAllBrands()
      .then(setBrandList)
      .catch((err) => console.error("Failed to fetch brands", err));
  }, []);

  // 4. Reset page khi thay đổi Category
  useEffect(() => {
    if (!searchParams.has("page")) {
      updateQueryParams({ page: 0 });
    }
  }, [categoryId]);

  // 5. Tự động scroll khi thay đổi trang hoặc filter
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, categoryId]);

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
          <aside className="col-lg-4 sidebar">
            <div className="widgets-container">
              <ProductCategoriesWidget />
              <PricingRangeWidget
                value={{ min: filters.minPrice, max: filters.maxPrice }}
                onChange={(min, max) =>
                  updateQueryParams({ minPrice: min, maxPrice: max, page: 0 })
                }
              />
              <ColorFilterWidget
                selectedColors={filters.colors}
                onChange={(colors) => updateQueryParams({ colors, page: 0 })}
              />
              <BrandFilterWidget
                brandList={brandList}
                selectedBrands={filters.brands}
                onChange={(brands) => updateQueryParams({ brands, page: 0 })}
              />
            </div>
          </aside>

          <section className="col-lg-8">
            <CategoryHeader />
            <ProductList
              categoryId={categoryId}
              page={page}
              filters={filters}
              setTotalPages={setTotalPages}
            />
            <Pagination
              page={page}
              totalPages={totalPages}
              setPage={(newPage) => updateQueryParams({ page: newPage })}
            />
          </section>
        </div>
      </div>
    </main>
  );
};

export default CategoryPage;
