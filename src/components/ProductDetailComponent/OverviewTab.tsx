import { useEffect, useState } from "react";
import { productApi } from "../../api/productApi";
import type { ProductModel } from "../../models/ProductModel";
import { Link } from "react-router-dom";

type OverviewTabProps = {
  productId: number;
  description?: string;
};

const OverviewTab: React.FC<OverviewTabProps> = ({
  productId,
  description,
}) => {
  const [recommendations, setRecommendations] = useState<ProductModel[]>([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await productApi.getRecommendedProducts(productId);
        setRecommendations(data);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm gợi ý:", error);
      }
    };

    if (productId) {
      fetchRecommendations();
    }
  }, [productId]);

  // Hàm chia mảng thành các nhóm nhỏ (mỗi nhóm 4 sản phẩm cho 1 slide)
  const chunkArray = (arr: ProductModel[], size: number) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size),
    );
  };

  const groupedRecommendations = chunkArray(recommendations, 4);

  return (
    <div
      className="tab-pane fade show active"
      id="ecommerce-product-details-5-overview"
    >
      <div className="overview-content">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="content-section">
              <h3>Mô tả sản phẩm</h3>
              {/* Tui render thêm mô tả động từ product luôn cho tiện */}
              <p>
                {description ||
                  "Bởi vì không ai khinh miệt, ghét bỏ hay trốn tránh lạc thú chỉ vì nó là lạc thú..."}
              </p>

              {/* Chỉ hiển thị phần gợi ý nếu có dữ liệu trả về từ ML */}
              {recommendations.length > 0 && (
                <>
                  <h4>Sản phẩm thường được mua kèm</h4>
                  <div
                    id="relatedProductsCarousel"
                    className="carousel slide"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-inner">
                      {groupedRecommendations.map((group, slideIndex) => (
                        <div
                          className={`carousel-item ${slideIndex === 0 ? "active" : ""}`}
                          key={slideIndex}
                        >
                          <div className="row g-4">
                            {group.map((prod) => (
                              <div className="col-md-3" key={prod.id}>
                                <div className="product-card">
                                  <div className="product-image">
                                    {/* Link tới trang chi tiết của sản phẩm gợi ý */}
                                    <Link to={`/product-detail/${prod.id}`}>
                                      <img
                                        src={
                                          prod.image && prod.image.length > 0
                                            ? prod.image[0].imageUrl
                                            : "img/product/product-1.webp"
                                        }
                                        className="main-image img-fluid"
                                        alt={prod.name}
                                      />
                                    </Link>
                                  </div>
                                  <div className="product-details">
                                    <div className="product-category">
                                      {prod.brand || "THƯƠNG HIỆU"}
                                    </div>
                                    <h6 className="product-title">
                                      <Link
                                        to={`/product-detail/${prod.id}`}
                                        style={{
                                          textDecoration: "none",
                                          color: "inherit",
                                        }}
                                      >
                                        {prod.name}
                                      </Link>
                                    </h6>
                                    <div className="product-price">
                                      {/* Format tiền tệ VNĐ */}
                                      {prod.discountedPrice
                                        ? prod.discountedPrice.toLocaleString(
                                            "vi-VN",
                                          ) + "₫"
                                        : prod.price.toLocaleString("vi-VN") +
                                          "₫"}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Chỉ hiển thị nút Next/Prev nếu có nhiều hơn 1 slide (tức là > 4 sản phẩm gợi ý) */}
                    {groupedRecommendations.length > 1 && (
                      <>
                        <button
                          className="carousel-control-prev"
                          type="button"
                          data-bs-target="#relatedProductsCarousel"
                          data-bs-slide="prev"
                        >
                          <span
                            className="carousel-control-prev-icon"
                            style={{
                              backgroundColor: "#000",
                              borderRadius: "50%",
                            }}
                          ></span>
                        </button>
                        <button
                          className="carousel-control-next"
                          type="button"
                          data-bs-target="#relatedProductsCarousel"
                          data-bs-slide="next"
                        >
                          <span
                            className="carousel-control-next-icon"
                            style={{
                              backgroundColor: "#000",
                              borderRadius: "50%",
                            }}
                          ></span>
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="package-contents">
              <h4>Phụ kiện</h4>
              <ul className="contents-list">
                <li>
                  <i className="bi bi-check-circle"></i>01 Đôi giày chính hãng
                </li>
                <li>
                  <i className="bi bi-check-circle"></i>Hộp giày bảo vệ
                </li>
                <li>
                  <i className="bi bi-check-circle"></i>Bao đựng chống bụi
                </li>
                <li>
                  <i className="bi bi-check-circle"></i>1 cặp dây giày dự phòng
                </li>
                <li>
                  <i className="bi bi-check-circle"></i>Thẻ bảo hành chính hãng
                </li>
                <li>
                  <i className="bi bi-check-circle"></i>Hướng dẫn chăm sóc & vệ
                  sinh giày
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
