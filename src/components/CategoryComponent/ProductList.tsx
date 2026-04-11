import { useEffect, useState } from "react";
import ProductCard from "../utils/ProductCard";
import type { ProductModel } from "../../models/ProductModel";
import { getProductsByCategory } from "../../api/productApi";
import { SpinningLoading } from "../utils/SpinningLoading";
import { ErrorMessage } from "../utils/ErrorMessage";

export interface ProductListProps {
  categoryId: number;
  page: number;
  setTotalPages: (total: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ categoryId, page, setTotalPages }) => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoryProduct = async () => {
      try {
        const data = await getProductsByCategory(categoryId, page);
        setProducts(data.products);
        setTotalPages(data.totalPages);
      } catch (error: any) {
        setHttpError(error.message || "Error fetching products!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryProduct();
  }, [categoryId, page]);

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
