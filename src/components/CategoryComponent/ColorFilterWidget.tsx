const ColorFilterWidget = () => {

  const colors = [
    { name: "black", code: "#000000", label: "Black" },
    { name: "white", code: "#ffffff", label: "White" },
    { name: "red", code: "#e74c3c", label: "Red" },
    { name: "blue", code: "#3498db", label: "Blue" },
    { name: "green", code: "#2ecc71", label: "Green" },
    { name: "yellow", code: "#f1c40f", label: "Yellow" },
    { name: "purple", code: "#9b59b6", label: "Purple" },
    { name: "orange", code: "#e67e22", label: "Orange" },
    { name: "pink", code: "#fd79a8", label: "Pink" },
    { name: "brown", code: "#795548", label: "Brown" },
  ];

  return (
    <div className="color-filter-widget widget-item">
      <h3 className="widget-title">Màu sắc</h3>

      <div className="color-filter-content">
        <div className="color-options">

          {colors.map((color) => (
            <div className="form-check color-option" key={color.name}>
              <input
                className="form-check-input"
                type="checkbox"
                value={color.name}
                id={`color-${color.name}`}
              />

              <label
                className="form-check-label"
                htmlFor={`color-${color.name}`}
              >
                <span
                  className="color-swatch"
                  style={{ backgroundColor: color.code }}   // ✅ đúng syntax
                  title={color.label}
                ></span>
              </label>
            </div>
          ))}

        </div>

        <div className="filter-actions mt-3">
          <button type="button" className="btn btn-sm btn-outline-secondary">
            Xóa
          </button>
          <button type="button" className="btn btn-sm btn-primary">
            Áp dụng lọc
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorFilterWidget;