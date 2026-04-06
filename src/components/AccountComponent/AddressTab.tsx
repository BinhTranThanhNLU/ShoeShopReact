const AddressTab = () => {
  return (
    <div className="tab-pane fade" id="addresses">
      <div className="section-header" data-aos="fade-up">
        <h2>Địa chỉ của tôi</h2>
        <div className="header-actions">
          <button
            type="button"
            className="btn btn-dark rounded-pill shadow-sm px-4"
          >
            <i className="bi bi-plus-lg me-2"></i>
            Thêm địa chỉ mới
          </button>
        </div>
      </div>

      <div className="addresses-grid">
        {/* Address Card 1 */}
        <div
          className="address-card default"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="card-header">
            <h4>Nhà riêng</h4>
            <span className="default-badge">Mặc định</span>
          </div>
          <div className="card-body">
            <p className="address-text">
              123 Đường Chính
              <br />
              Căn hộ 4B
              <br />
              Quận 1, TP. Hồ Chí Minh
              <br />
              Việt Nam
            </p>
            <div className="contact-info">
              <div>
                <i className="bi bi-person"></i> Sarah Anderson
              </div>
              <div>
                <i className="bi bi-telephone"></i> +84 912 345 678
              </div>
            </div>
          </div>
          <div className="card-actions">
            <button type="button" className="btn-edit">
              <i className="bi bi-pencil"></i>
              Chỉnh sửa
            </button>
            <button type="button" className="btn-remove">
              <i className="bi bi-trash"></i>
              Xóa
            </button>
          </div>
        </div>

        {/* Address Card 2 */}
        <div className="address-card" data-aos="fade-up" data-aos-delay="200">
          <div className="card-header">
            <h4>Cơ quan</h4>
          </div>
          <div className="card-body">
            <p className="address-text">
              456 Đường Doanh Nghiệp
              <br />
              Tầng 2<br />
              Quận 7, TP. Hồ Chí Minh
              <br />
              Việt Nam
            </p>
            <div className="contact-info">
              <div>
                <i className="bi bi-person"></i> Sarah Anderson
              </div>
              <div>
                <i className="bi bi-telephone"></i> +84 988 765 432
              </div>
            </div>
          </div>
          <div className="card-actions">
            <button type="button" className="btn-edit">
              <i className="bi bi-pencil"></i>
              Chỉnh sửa
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

export default AddressTab;
