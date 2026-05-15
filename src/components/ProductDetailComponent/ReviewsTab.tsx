import { useEffect, useMemo, useState } from "react";
import { reviewApi } from "../../api/reviewApi";
import type { ReviewModel } from "../../models/ReviewModel";

type ReviewsTabProps = {
  productId: number;
};

const formatDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, index) => (
    <i key={index} className={`bi ${index < rating ? "bi-star-fill" : "bi-star"}`}></i>
  ));
};

const ReviewsTab: React.FC<ReviewsTabProps> = ({ productId }) => {
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const summary = useMemo(() => {
    if (reviews.length === 0) {
      return {
        average: 0,
        total: 0,
        distribution: [5, 4, 3, 2, 1].map((star) => ({ star, count: 0, percent: "0%" })),
      };
    }

    const total = reviews.length;
    const average = reviews.reduce((sum, review) => sum + review.rating, 0) / total;

    const distribution = [5, 4, 3, 2, 1].map((star) => {
      const count = reviews.filter((review) => review.rating === star).length;
      return {
        star,
        count,
        percent: `${Math.round((count / total) * 100)}%`,
      };
    });

    return { average, total, distribution };
  }, [reviews]);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await reviewApi.getReviewsForProduct(productId);
        setReviews(data);
      } catch (err) {
        console.error("Khong the tai danh gia san pham:", err);
        setError("Khong the tai danh gia san pham. Vui long thu lai.");
      } finally {
        setLoading(false);
      }
    };

    void loadReviews();
  }, [productId]);

  return (
    <div className="tab-pane fade show active" id="ecommerce-product-details-5-customer-reviews">
      <div className="reviews-content">
        <div className="reviews-header">
          <div className="rating-overview">
            <div className="average-score">
              <div className="score-display">{summary.average ? summary.average.toFixed(1) : "0.0"}</div>
              <div className="score-stars">
                {renderStars(Math.round(summary.average))}
              </div>
              <div className="total-reviews">{summary.total} đánh giá của khách hàng</div>
            </div>

            <div className="rating-distribution">
              {summary.distribution.map((item) => (
                <div className="rating-row" key={item.star}>
                  <span className="stars-label">{item.star}★</span>
                  <div className="progress-container">
                    <div className="progress-fill" style={{ width: item.percent }}></div>
                  </div>
                  <span className="count-label">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="write-review-cta">
            <h4>Đã có đánh giá từ người mua</h4>
            <p>Những phản hồi thực tế từ khách hàng đã mua sản phẩm này</p>
            <div className="btn review-btn">Đánh giá hiện có</div>
          </div>
        </div>

        {loading && <div className="text-center p-5">Đang tải đánh giá...</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <div className="customer-reviews-list">
            {reviews.length === 0 ? (
              <div className="text-center p-5">
                <p className="text-muted">Sản phẩm này chưa có đánh giá nào.</p>
              </div>
            ) : (
              reviews.map((review) => (
                <div className="review-card" key={review.id}>
                  <div className="reviewer-profile">
                    <div className="profile-pic d-flex align-items-center justify-content-center bg-light rounded-circle">
                      <i className="bi bi-person"></i>
                    </div>
                    <div className="profile-details">
                      <div className="customer-name">{review.userName}</div>
                      <div className="review-meta">
                        <div className="review-stars">{renderStars(review.rating)}</div>
                        <span className="review-date">{formatDate(review.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <h5 className="review-headline">Đánh giá {review.rating}/5 sao</h5>
                  <div className="review-text">
                    <p>{review.comment || "Không có nội dung bình luận."}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsTab;
