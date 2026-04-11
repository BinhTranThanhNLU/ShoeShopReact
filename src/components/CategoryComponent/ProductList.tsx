import { useEffect, useState } from "react";
import ProductCard from "../utils/ProductCard";
import type { ProductModel } from "../../models/ProductModel";
import { getProductsByCategory, getProductsWithFilters } from "../../api/productApi";
import { SpinningLoading } from "../utils/SpinningLoading";
import { ErrorMessage } from "../utils/ErrorMessage";

interface ProductListProps {
  categoryId: number;
  page: number;
  filters: {
    minPrice: string | null;
    maxPrice: string | null;
    brands: string[];
    colors: string[];
  };
  setTotalPages: (total: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ categoryId, page, filters, setTotalPages }) => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);


  useEffect(() => {
    const fetchProductsWithFilters = async () => {
      try {
        const data = await getProductsWithFilters(categoryId, page, filters);
        setProducts(data.products);
        setTotalPages(data.totalPages);
      } catch (err: any) {
        setHttpError(err.message || "Failed to fetch !");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductsWithFilters();
  }, [categoryId, page, filters, setTotalPages]);

  if (isLoading) return <SpinningLoading />;
  if (httpError) return <ErrorMessage message={httpError} />;

  return (
    <section
      id="category-product-list"
      className="category-product-list section"
    >
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row g-4">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="mt-3">
              <div className="alert alert-warning text-center rounded shadow-sm">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                Không tìm thấy sản phẩm
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
