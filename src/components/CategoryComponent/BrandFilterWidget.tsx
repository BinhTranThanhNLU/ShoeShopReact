const BrandFilterWidget = () => {
  const brands = [
    { id: 1, name: "Nike", count: 24 },
    { id: 2, name: "Adidas", count: 18 },
    { id: 3, name: "Puma", count: 12 },
    { id: 4, name: "Reebok", count: 9 },
    { id: 5, name: "Under Armour", count: 7 },
    { id: 6, name: "New Balance", count: 6 },
    { id: 7, name: "Converse", count: 5 },
    { id: 8, name: "Vans", count: 4 },
  ];

  return (
    <div className="brand-filter-widget widget-item">
      <h3 className="widget-title">Thương hiệu</h3>

      <div className="brand-filter-content">
        <div className="brand-search">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm thương hiệu..."
          />
          <i className="bi bi-search"></i>
        </div>

        <div className="brand-list">
          {brands.map((brand) => (
            <div className="brand-item" key={brand.id}>
              <div className="form-check">
                {" "}
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`brand${brand.id}`}
                />
                <label
                  className="form-check-label"
                  htmlFor={`brand${brand.id}`}
                >
                  {brand.name}
                  <span className="brand-count">({brand.count})</span>
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="brand-actions">
          <button className="btn btn-sm btn-outline-primary">
            Áp dụng lọc
          </button>
          <button className="btn btn-sm btn-link">Xóa</button>
        </div>
      </div>
    </div>
  );
};

export default BrandFilterWidget;
