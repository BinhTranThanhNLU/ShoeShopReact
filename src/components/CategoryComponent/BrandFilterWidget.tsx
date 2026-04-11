import React, { useState, useEffect, useMemo } from "react";
import type { BrandModel } from "../../models/BrandModel";

interface BrandFilterWidgetProps {
  brandList: BrandModel[];
  selectedBrands: string[];
  onChange: (brandIds: number[]) => void;
}

const BrandFilterWidget: React.FC<BrandFilterWidgetProps> = ({
  brandList,
  selectedBrands,
  onChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tempSelected, setTempSelected] = useState<number[]>(
    selectedBrands.map(Number)
  );

  
  useEffect(() => {
    setTempSelected(selectedBrands.map(Number));
  }, [selectedBrands]);

  
  const filteredBrands = useMemo(() => {
    return brandList.filter((brand) =>
      brand.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [brandList, searchTerm]);

  const handleToggleBrand = (id: number) => {
    setTempSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleApply = () => onChange(tempSelected);
  
  const handleClear = () => {
    setTempSelected([]);
    onChange([]);
  };

  return (
    <div className="brand-filter-widget widget-item border p-3 rounded mb-4">
      <h3 className="widget-title mb-3" style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
        Thương hiệu
      </h3>

      <div className="brand-filter-content">
        {/* Thanh tìm kiếm nội bộ */}
        <div className="brand-search mb-3 position-relative">
          <input
            type="text"
            className="form-control form-control-sm ps-4"
            placeholder="Tìm thương hiệu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="bi bi-search position-absolute start-2 top-50 translate-middle-y ms-2 text-muted" style={{ fontSize: '0.8rem' }}></i>
        </div>

        {/* Danh sách Brand có Scrollbar nếu quá dài */}
        <div 
          className="brand-list mb-3" 
          style={{ maxHeight: "200px", overflowY: "auto", overflowX: "hidden" }}
        >
          {filteredBrands.length > 0 ? (
            filteredBrands.map((brand) => (
              <div className="brand-item mb-2" key={brand.id}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`brand-${brand.id}`}
                    checked={tempSelected.includes(brand.id)}
                    onChange={() => handleToggleBrand(brand.id)}
                  />
                  <label
                    className="form-check-label small"
                    htmlFor={`brand-${brand.id}`}
                    style={{ cursor: 'pointer' }}
                  >
                    {brand.name}
                  </label>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted small italic">Không tìm thấy kết quả</p>
          )}
        </div>

        <div className="brand-actions d-flex align-items-center justify-content-between border-top pt-3">
          <button 
            className="btn btn-sm btn-link text-decoration-none text-muted p-0"
            onClick={handleClear}
          >
            Xóa tất cả
          </button>
          <button 
            className="btn btn-sm btn-dark px-3"
            onClick={handleApply}
          >
            Áp dụng
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandFilterWidget;