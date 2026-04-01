const ReviewsTab = () => {
  const ratingData = [
    { star: 5, count: 86, percent: "68%" },
    { star: 4, count: 28, percent: "22%" },
    { star: 3, count: 8, percent: "10%" },
    { star: 2, count: 4, percent: "5%" },
    { star: 1, count: 1, percent: "2%" },
  ];

  const reviews = [
    {
      id: 1,
      name: "Sarah Martinez",
      img: "img/person/person-f-3.webp",
      stars: 5,
      date: "28 Tháng 3, 2024",
      headline: "Chất lượng tuyệt vời và rất thoải mái",
      text: "Sản phẩm có thiết kế đẹp, chất liệu tốt và đi rất êm chân. Tôi rất hài lòng với trải nghiệm này.",
      useful: 12,
    },
    {
      id: 2,
      name: "David Chen",
      img: "img/person/person-m-5.webp",
      stars: 4,
      date: "15 Tháng 3, 2024",
      headline: "Giá tốt, chất lượng ổn",
      text: "Giày đẹp và chất lượng tốt so với giá. Tuy nhiên, lúc đầu hơi cứng, cần vài ngày để làm mềm.",
      useful: 8,
    },
  ];

  return (
    <div
      className="tab-pane fade"
      id="ecommerce-product-details-5-customer-reviews"
    >
      <div className="reviews-content">
        <div className="reviews-header">
          <div className="rating-overview">
            <div className="average-score">
              <div className="score-display">4.6</div>
              <div className="score-stars">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-half"></i>
              </div>
              <div className="total-reviews">127 đánh giá của khách hàng</div>
            </div>

            <div className="rating-distribution">
              {/* Vòng lặp cho phần thanh tiến trình */}
              {ratingData.map((item) => (
                <div className="rating-row" key={item.star}>
                  <span className="stars-label">{item.star}★</span>
                  <div className="progress-container">
                    <div
                      className="progress-fill"
                      style={{ width: item.percent }}
                    ></div>
                  </div>
                  <span className="count-label">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="write-review-cta">
            <h4>Chia sẻ trải nghiệm của bạn</h4>
            <p>Giúp những người khác đưa ra quyết định đúng đắn</p>
            <button className="btn review-btn">Viết đánh giá</button>
          </div>
        </div>

        <div className="customer-reviews-list">
          {/* Vòng lặp cho danh sách đánh giá */}
          {reviews.map((rev) => (
            <div className="review-card" key={rev.id}>
              <div className="reviewer-profile">
                <img src={rev.img} alt="Khách hàng" className="profile-pic" />
                <div className="profile-details">
                  <div className="customer-name">{rev.name}</div>
                  <div className="review-meta">
                    <div className="review-stars">
                      {/* Loop hiển thị sao dựa trên số stars */}
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`bi ${i < rev.stars ? "bi-star-fill" : "bi-star"}`}
                        ></i>
                      ))}
                    </div>
                    <span className="review-date">{rev.date}</span>
                  </div>
                </div>
              </div>
              <h5 className="review-headline">{rev.headline}</h5>
              <div className="review-text">
                <p>{rev.text}</p>
              </div>
              <div className="review-actions">
                <button className="action-btn">
                  <i className="bi bi-hand-thumbs-up"></i> Hữu ích ({rev.useful}
                  )
                </button>
                <button className="action-btn">
                  <i className="bi bi-chat-dots"></i> Trả lời
                </button>
              </div>
            </div>
          ))}

          <div className="load-more-section">
            <button className="btn load-more-reviews">Xem thêm đánh giá</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsTab;
