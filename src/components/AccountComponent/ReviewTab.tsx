import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { reviewApi } from "../../api/reviewApi";
import type { CreateReviewRequest } from "../../modelRequest/CreateReviewRequest";
import type { ReviewModel } from "../../models/ReviewModel";
import type { UnreviewedProductModel } from "../../models/UnreviewedProductModel";

const formatCurrency = (value: number) => {
  return value.toLocaleString("vi-VN") + "đ";
};

const getProductImage = (product: UnreviewedProductModel) => {
  return product.images?.[0] || "/img/product/product-1.webp";
};

type DraftState = {
  rating: number;
  comment: string;
};

const ReviewTab = () => {
  const [products, setProducts] = useState<UnreviewedProductModel[]>([]);
  const [myReviews, setMyReviews] = useState<ReviewModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [writingProductId, setWritingProductId] = useState<number | null>(null);
  const [draft, setDraft] = useState<DraftState>({ rating: 5, comment: "" });
  const [submitting, setSubmitting] = useState(false);

  const sortedProducts = useMemo(() => {
    return [...products].sort((left, right) => left.id - right.id);
  }, [products]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [unreviewedProducts, reviews] = await Promise.all([
        reviewApi.getUnreviewedProducts(),
        reviewApi.getMyReviews(),
      ]);
      setProducts(unreviewedProducts);
      setMyReviews(reviews);
    } catch (err) {
      console.error("Khong the tai san pham chua danh gia:", err);
      setError("Khong the tai danh sach san pham chua danh gia. Vui long thu lai.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const handleOpenForm = (productId: number) => {
    setWritingProductId(productId);
    setDraft({ rating: 5, comment: "" });
  };

  const handleCancelForm = () => {
    setWritingProductId(null);
    setDraft({ rating: 5, comment: "" });
  };

  const handleSubmitReview = async (event: React.FormEvent<HTMLFormElement>, productId: number) => {
    event.preventDefault();

    const payload: CreateReviewRequest = {
      productId,
      rating: draft.rating,
      comment: draft.comment.trim(),
    };

    try {
      setSubmitting(true);
      await reviewApi.createReview(payload);
      await loadData();
      handleCancelForm();
    } catch (err) {
      console.error("Khong the tao danh gia:", err);
      alert("Khong the tao danh gia. Vui long thu lai.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="tab-pane fade" id="reviews">
      <div className="section-header" data-aos="fade-up">
        <h2>Danh gia cua toi</h2>
        <div className="header-actions">
          <span className="text-muted">
            {sortedProducts.length} san pham can danh gia, {myReviews.length} danh gia da gui
          </span>
        </div>
      </div>

      {loading && <div className="text-center p-5">Dang tai san pham chua danh gia...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="reviews-grid">
          {sortedProducts.length === 0 ? (
            <div className="col-12 text-center p-5">
              <p className="text-muted">Ban da danh gia het san pham da mua.</p>
            </div>
          ) : (
            sortedProducts.map((product, index) => {
              const isWritingThisProduct = writingProductId === product.id;

              return (
                <div className="review-card" data-aos="fade-up" data-aos-delay={(index + 1) * 100} key={product.id}>
                  <div className="review-header">
                    <img
                      src={getProductImage(product)}
                      alt={product.name}
                      className="product-image"
                      loading="lazy"
                    />
                    <div className="review-meta">
                      <h4>{product.name}</h4>
                      <div className="rating">
                        <i className="bi bi-bag-check"></i>
                        <span>Sản phẩm đã mua, chưa đánh giá</span>
                      </div>
                      <div className="review-date">Mã sản phẩm: #{product.id}</div>
                      <div className="review-date">
                        Giá: {formatCurrency(product.discountedPrice ?? product.price)}
                        {product.discountPercent ? ` (-${product.discountPercent}%)` : ""}
                      </div>
                    </div>
                  </div>

                  <div className="review-content">
                    <p>{product.description || "Không có mô tả sản phẩm."}</p>
                  </div>

                  <div className="review-footer">
                    <Link to={`/product-detail/${product.id}`} className="btn-edit text-decoration-none">
                      Xem sản phẩm
                    </Link>
                    <button type="button" className="btn-delete" onClick={() => handleOpenForm(product.id)}>
                      Viết đánh giá
                    </button>
                  </div>

                  {isWritingThisProduct && (
                    <div className="settings-section mt-4" data-aos="fade-up">
                      <h3>Viết đánh giá cho {product.name}</h3>
                      <form className="settings-form" onSubmit={(event) => void handleSubmitReview(event, product.id)}>
                        <div className="row g-3">
                          <div className="col-md-4">
                            <label htmlFor={`review-rating-${product.id}`} className="form-label">
                              Số sao
                            </label>
                            <select
                              id={`review-rating-${product.id}`}
                              className="form-select"
                              value={draft.rating}
                              onChange={(event) =>
                                setDraft((prev) => ({ ...prev, rating: Number(event.target.value) }))
                              }
                              required
                            >
                              <option value={1}>1 sao</option>
                              <option value={2}>2 sao</option>
                              <option value={3}>3 sao</option>
                              <option value={4}>4 sao</option>
                              <option value={5}>5 sao</option>
                            </select>
                          </div>
                          <div className="col-md-8">
                            <label htmlFor={`review-comment-${product.id}`} className="form-label">
                              Nhận xét
                            </label>
                            <textarea
                              id={`review-comment-${product.id}`}
                              className="form-control"
                              rows={4}
                              value={draft.comment}
                              onChange={(event) =>
                                setDraft((prev) => ({ ...prev, comment: event.target.value }))
                              }
                              placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này"
                            />
                          </div>
                        </div>

                        <div className="form-buttons mt-3">
                          <button type="submit" className="btn-save" disabled={submitting}>
                            {submitting ? "Dang gui..." : "Gui danh gia"}
                          </button>
                          <button type="button" className="btn btn-outline-secondary ms-2" onClick={handleCancelForm}>
                            Huy
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {!loading && !error && (
        <div className="mt-5">
          <div className="section-header" data-aos="fade-up">
            <h3>Danh gia da gui</h3>
          </div>

          <div className="reviews-grid">
            {myReviews.length === 0 ? (
              <div className="col-12 text-center p-5">
                <p className="text-muted">Bạn chưa gửi review nào.</p>
              </div>
            ) : (
              myReviews
                .slice()
                .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime())
                .map((review, index) => (
                  <div className="review-card" data-aos="fade-up" data-aos-delay={(index + 1) * 100} key={review.id}>
                    <div className="review-header">
                      <div className="review-meta">
                        <h4>
                          <Link to={`/product-detail/${review.productId}`} className="text-decoration-none">
                            San pham #{review.productId}
                          </Link>
                        </h4>
                        <div className="rating">
                          {[...Array(5)].map((_, starIndex) => (
                            <i
                              key={starIndex}
                              className={`bi ${starIndex < review.rating ? "bi-star-fill" : "bi-star"}`}
                            ></i>
                          ))}
                          <span>({review.rating.toFixed(1)})</span>
                        </div>
                        <div className="review-date">Nguoi dang: {review.userName}</div>
                      </div>
                    </div>
                    <div className="review-content">
                      <p>{review.comment || "Khong co noi dung binh luan."}</p>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewTab;
