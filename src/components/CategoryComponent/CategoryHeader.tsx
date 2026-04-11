const CategoryHeader = () => {
  return (
    <section id="category-header" className="category-header section">
      <div className="container" data-aos="fade-up">
        {/* Filter and Sort Options */}
        <div
          className="filter-container mb-4"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="row g-3">
            <div className="col-12 col-md-6 col-lg-4">
             
            </div>

            <div className="col-12 col-md-6 col-lg-2">
              <div className="filter-item">
                <label htmlFor="priceRange" className="form-label">
                  Giá tiền
                </label>
                <select className="form-select" id="priceRange" defaultValue="">
                  <option value="">Tất cả giá tiền</option>
                  <option value="under-250">Dưới 250.000đ</option>
                  <option value="250-500">250.000đ đến 500.000đ</option>
                  <option value="500-1000">500.000đ đến 1.000.000đ</option>
                  <option value="1000-1500">1.000.000đ đến 1.500.000đ</option>
                  <option value="over-1500">Trên 1.500.000đ</option>
                </select>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-2">
              <div className="filter-item">
                <label htmlFor="sortBy" className="form-label">
                  Lọc theo
                </label>

                <select className="form-select" id="sortBy" defaultValue="">
                  <option value="">Sắp xếp</option>
                  <option value="price-asc">Giá tiền: thấp đến cao</option>
                  <option value="price-desc">Giá tiền: cao đến thấp</option>
                  <option value="rating">Đánh giá</option>
                  <option value="newest">Sản phẩm mới nhất</option>
                </select>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CategoryHeader;
