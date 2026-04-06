const PaymentMethodTab = () => {
  return (
    <div className="tab-pane fade" id="wallet">
      <div className="section-header" data-aos="fade-up">
        <h2>Phương thức thanh toán</h2>
        <div className="header-actions">
          <button
            type="button"
            className="btn btn-dark rounded-pill shadow-sm px-4"
          >
            <i className="bi bi-plus-lg me-2"></i>
            Thêm phương thức
          </button>
        </div>
      </div>

      <div className="payment-cards-grid">
        {/* Ví MoMo */}
        <div
          className="payment-card default"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="card-header">
            <img
              src="../../assets/img/payment/momo.png"
              alt="MoMo"
              className="payment-logo"
            />
            <div className="card-badges">
              <span className="default-badge">Mặc định</span>
              <span className="card-type">MoMo</span>
            </div>
          </div>
          <div className="card-body">
            <div className="card-number">SĐT: 0987 654 321</div>
            <div className="card-info">
              <span>Liên kết: Vietcombank</span>
            </div>
          </div>
          <div className="card-actions">
            <button type="button" className="btn-edit">
              <i className="bi bi-pencil"></i>
              Sửa
            </button>
            <button type="button" className="btn-remove">
              <i className="bi bi-trash"></i>
              Xóa
            </button>
          </div>
        </div>

        {/* ZaloPay */}
        <div className="payment-card" data-aos="fade-up" data-aos-delay="200">
          <div className="card-header">
            <img
              src="../../assets/img/payment/zalopay.png"
              alt="ZaloPay"
              className="payment-logo"
            />
            <div className="card-badges">
              <span className="card-type">ZaloPay</span>
            </div>
          </div>
          <div className="card-body">
            <div className="card-number">SĐT: 0912 345 678</div>
            <div className="card-info">
              <span>Liên kết: BIDV</span>
            </div>
          </div>
          <div className="card-actions">
            <button type="button" className="btn-edit">
              <i className="bi bi-pencil"></i>
              Sửa
            </button>
            <button type="button" className="btn-remove">
              <i className="bi bi-trash"></i>
              Xóa
            </button>
            <button type="button" className="btn-make-default">
              Đặt làm mặc định
            </button>
          </div>
        </div>

        {/* Thẻ ATM nội địa */}
        <div className="payment-card" data-aos="fade-up" data-aos-delay="300">
          <div className="card-header">
            <img
              src="../../assets/img/payment/vietcombank.png"
              alt="Vietcombank"
              className="payment-logo"
            />
            <div className="card-badges">
              <span className="card-type">Ngân hàng</span>
            </div>
          </div>
          <div className="card-body">
            <div className="card-number">Vietcombank - **** 6521</div>
            <div className="card-info">
              <span>Chủ thẻ: Nguyễn Văn A</span>
            </div>
          </div>
          <div className="card-actions">
            <button type="button" className="btn-edit">
              <i className="bi bi-pencil"></i>
              Sửa
            </button>
            <button type="button" className="btn-remove">
              <i className="bi bi-trash"></i>
              Xóa
            </button>
            <button type="button" className="btn-make-default">
              Đặt làm mặc định
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodTab;
