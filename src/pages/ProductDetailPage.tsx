import ProductDetail from "../components/ProductDetailComponent/ProductDetail";
import ProductGallery from "../components/ProductDetailComponent/ProductGallery";
import ProductTab from "../components/ProductDetailComponent/ProductTab";
import { PageTitle } from "../components/utils/PageTitle";

const ProductDetailPage = () => {
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
            <ProductGallery />
            <ProductDetail />
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
