import React, { useState, useEffect } from "react";

interface ColorOption {
  name: string;
  code: string;
  label: string;
}

interface ColorFilterWidgetProps {
  selectedColors: string[];
  onChange: (colors: string[]) => void;
}

const COLOR_DATA: ColorOption[] = [
  { name: "Xanh Dương", code: "#3498db", label: "Xanh dương" },
  { name: "Đỏ", code: "#e74c3c", label: "Đỏ" },
  { name: "Xanh Lá", code: "#2ecc71", label: "Xanh lá" },
  { name: "Xanh Navy", code: "#000080", label: "Xanh Navy" },
  { name: "Đen", code: "#000000", label: "Đen" },
  { name: "Trắng", code: "#ffffff", label: "Trắng" },
];

const ColorFilterWidget: React.FC<ColorFilterWidgetProps> = ({ selectedColors, onChange }) => {
  
  const [tempSelected, setTempSelected] = useState<string[]>(selectedColors);

  
  useEffect(() => {
    setTempSelected(selectedColors);
  }, [selectedColors]);

  const handleToggleColor = (colorName: string) => {
    setTempSelected((prev) =>
      prev.includes(colorName)
        ? prev.filter((c) => c !== colorName) // Bỏ chọn
        : [...prev, colorName] // Thêm mới
    );
  };

  const handleApply = () => onChange(tempSelected);
  const handleClear = () => {
    setTempSelected([]);
    onChange([]);
  };

  return (
    <div className="color-filter-widget widget-item border p-3 rounded mb-4">
      <h3 className="widget-title mb-3" style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
        Màu sắc
      </h3>

      <div className="color-filter-content">
        <div className="d-flex flex-wrap gap-2 mb-3">
          {COLOR_DATA.map((color) => {
            const isChecked = tempSelected.includes(color.name);
            return (
              <div className="color-option-wrapper" key={color.name}>
                <input
                  type="checkbox"
                  className="btn-check" 
                  id={`color-${color.name}`}
                  checked={isChecked}
                  onChange={() => handleToggleColor(color.name)}
                />
                <label
                  className={`btn btn-outline-light p-1 d-flex align-items-center justify-content-center color-swatch-label ${
                    isChecked ? "border-dark shadow-sm" : ""
                  }`}
                  htmlFor={`color-${color.name}`}
                  style={{ width: "32px", height: "32px", borderRadius: "50%" }}
                  title={color.label}
                >
                  <span
                    className="color-swatch"
                    style={{
                      backgroundColor: color.code,
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      border: color.name === "white" ? "1px solid #ddd" : "none",
                    }}
                  ></span>
                </label>
              </div>
            );
          })}
        </div>

        <div className="filter-actions d-flex gap-2 mt-3">
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary w-50"
            onClick={handleClear}
          >
            Xóa
          </button>
          <button
            type="button"
            className="btn btn-sm btn-dark w-50"
            onClick={handleApply}
          >
            Lọc
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorFilterWidget;