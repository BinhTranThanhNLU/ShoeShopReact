import { useParams } from "react-router-dom";
import ProductDetail from "../components/ProductDetailComponent/ProductDetail";
import ProductGallery from "../components/ProductDetailComponent/ProductGallery";
import ProductTab from "../components/ProductDetailComponent/ProductTab";
import { PageTitle } from "../components/utils/PageTitle";
import { useEffect, useState } from "react";
import type { ProductModel } from "../models/ProductModel";
import { getProductById } from "../api/productApi";
import { SpinningLoading } from "../components/utils/SpinningLoading";
import { ErrorMessage } from "../components/utils/ErrorMessage";

const ProductDetailPage = () => {

  const {id} = useParams<{id: string}>();
  const [product, setProduct] = useState<ProductModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data: ProductModel = await getProductById(Number(id));
        setProduct(data);
      } catch (error: any) {
        setHttpError(error.message || "Failed to fetch product");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (isLoading) return <SpinningLoading />;
  if (httpError) return <ErrorMessage message={httpError} />;

  if (!product) return <ErrorMessage message="Không tìm thấy dữ liệu sản phẩm" />;


  return (
    <main className="main">
      <PageTitle
        title="Chi tiết sản phẩm"
        breadcrumbs={[
          { label: "Trang chủ", path: "/home" },
          { label: "Chi tiết sản phẩm" },
        ]}
      />

      <section id="product-details" className="product-details section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row g-4">
            <ProductGallery product={product}/>
            <ProductDetail product={product}/>
          </div>

          <div className="row mt-5" data-aos="fade-up" data-aos-delay="300">
            <ProductTab />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetailPage;
