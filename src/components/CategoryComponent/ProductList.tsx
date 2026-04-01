import ProductCard from "../utils/ProductCard";

const ProductList = () => {
  return (
    <section
      id="category-product-list"
      className="category-product-list section"
    >
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row g-4">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </section>
  );
};

export default ProductList;
