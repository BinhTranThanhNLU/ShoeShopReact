import type React from "react";
import type { ProductModel } from "../../models/ProductModel";
import { Link, useNavigate } from "react-router-dom";
import { cartApi } from "../../api/cartApi";
import { useState } from "react";

const ListProductHome: React.FC<{ products: ProductModel[] }> = ({
  products,
}) => {
  const navigate = useNavigate();
  const [addingProductId, setAddingProductId] = useState<number | null>(null);

  const handleAddToCart = async (product: ProductModel) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const inStockVariant = product.variants?.find((variant) => variant.stockQuantity > 0);
    if (!inStockVariant) {
      return;
    }

    try {
      setAddingProductId(product.id);
      await cartApi.addItemToCart({
        variantId: inStockVariant.id,
        color: inStockVariant.color,
        size: inStockVariant.size,
        quantity: 1,
      });
      window.dispatchEvent(new Event("cart-updated"));
    } catch (error: any) {
      console.error(error?.response?.data?.message || "Không thể thêm sản phẩm vào giỏ hàng");
    } finally {
      setAddingProductId(null);
    }
  };

  return (
    <section id="best-sellers" className="best-sellers section">
      {/* Section Title  */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Sản phẩm bán chạy</h2>
        <p>
          Những mẫu giày thể thao và thời trang được khách hàng yêu thích nhất
          tại cửa hàng
        </p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row g-5">
          {products.slice(0, 8).map((product) => {
            const hasDiscount = (product.discountPercent ?? 0) > 0 && !!product.discountedPrice;
            const finalPrice = hasDiscount ? (product.discountedPrice as number) : product.price;

            return (
            <div className="col-lg-3 col-md-6" key={product.id}>
              <div className="product-item">
                <div className="product-image">
                  <img
                    src={
                      product.images && product.images.length > 0
                        ? product.images[0].imageUrl
                        : "/placeholder.jpg"
                    }
                    alt={product.name}
                    className="img-fluid"
                    loading="lazy"
                  />

                  <div className="product-actions">
                    <button className="action-btn wishlist-btn">
                      <i className="bi bi-heart"></i>
                    </button>
                    <button className="action-btn compare-btn">
                      <i className="bi bi-arrow-left-right"></i>
                    </button>
                    <button className="action-btn quickview-btn">
                      <i className="bi bi-zoom-in"></i>
                    </button>
                  </div>
                  <button
                    className="cart-btn"
                    onClick={() => handleAddToCart(product)}
                    disabled={addingProductId === product.id}
                  >
                    {addingProductId === product.id ? "Đang thêm..." : "Thêm vào giỏ"}
                  </button>
                </div>
                <div className="product-info">
                  <div className="product-category">{product.category}</div>
                  <h4 className="product-name">
                    <Link to={`/product-detail/${product.id}`}>{product.name}</Link>
                  </h4>
                  <div className="product-rating">
                    <div className="stars">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star"></i>
                    </div>
                  </div>
                  <div className="product-price">
                    <span className="current-price">{finalPrice.toLocaleString()}đ</span>
                    {hasDiscount && (
                      <>
                        <span className="old-price">{product.price.toLocaleString()}đ</span>
                        <span className="badge bg-danger ms-2">-{product.discountPercent}%</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            );
          })}
        </div>

        <div className="text-center mt-4">
          <a href="#more-info" className="btn btn-dark btn-lg">
            Xem thêm
          </a>
        </div>
      </div>
    </section>
  );
};

export default ListProductHome;
