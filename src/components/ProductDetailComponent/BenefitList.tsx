const BenefitList = () => {
  return (
    <div className="benefits-list">
      <div className="benefit-item">
        <i className="bi bi-truck"></i>
        <span>Giao hàng miễn phí cho đơn hàng trên 1.000.000đ</span>
      </div>
      <div className="benefit-item">
        <i className="bi bi-arrow-clockwise"></i>
        <span>Trả hàng miễn phí trong vòng 45 ngày</span>
      </div>
      <div className="benefit-item">
        <i className="bi bi-shield-check"></i>
        <span>Bảo hành 3 năm của nhà sản xuất</span>
      </div>
      <div className="benefit-item">
        <i className="bi bi-headset"></i>
        <span>Hỗ trợ khách hàng 24/7</span>
      </div>
    </div>
  );
};

export default BenefitList;
