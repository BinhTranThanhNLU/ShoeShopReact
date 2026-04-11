import React, { useState, useEffect } from "react";

interface PricingRangeWidgetProps {
  value: { min: string | null; max: string | null };
  onChange: (min: number | null, max: number | null) => void;
  minLimit?: number;
  maxLimit?: number;
}

const PricingRangeWidget: React.FC<PricingRangeWidgetProps> = ({
  value,
  onChange,
  minLimit = 0,
  maxLimit = 10000000,
}) => {
  
  const [tempMin, setTempMin] = useState<number>(Number(value.min) || minLimit);
  const [tempMax, setTempMax] = useState<number>(Number(value.max) || maxLimit);

 
  useEffect(() => {
    setTempMin(Number(value.min) || minLimit);
    setTempMax(Number(value.max) || maxLimit);
  }, [value, minLimit, maxLimit]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value), tempMax - 10000);
    setTempMin(val);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value), tempMin + 10000);
    setTempMax(val);
  };

  const handleApply = () => {
    onChange(tempMin, tempMax);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="pricing-range-widget widget-item border p-3 rounded mb-4">
      <h3 className="widget-title mb-3" style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
        Khoảng giá
      </h3>

      <div className="price-range-container">
        <div className="current-range d-flex justify-content-between mb-3 fw-medium">
          <span className="text-primary">{formatCurrency(tempMin)}</span>
          <span className="text-primary">{formatCurrency(tempMax)}</span>
        </div>

        {/* Range Slider Logic */}
        <div className="range-slider-wrapper position-relative" style={{ height: "30px" }}>
          <input
            type="range"
            className="form-range position-absolute top-0 start-0 w-100"
            min={minLimit}
            max={maxLimit}
            step={10000}
            value={tempMin}
            onChange={handleMinChange}
            style={{ zIndex: tempMin > maxLimit / 2 ? 5 : 3 }}
          />
          <input
            type="range"
            className="form-range position-absolute top-0 start-0 w-100"
            min={minLimit}
            max={maxLimit}
            step={10000}
            value={tempMax}
            onChange={handleMaxChange}
            style={{ zIndex: 4 }}
          />
        </div>

        <div className="price-inputs mt-2">
          <div className="row g-2">
            <div className="col-6">
              <label className="small text-muted">Tối thiểu</label>
              <input
                type="number"
                className="form-control form-control-sm"
                value={tempMin}
                onChange={(e) => setTempMin(Number(e.target.value))}
              />
            </div>
            <div className="col-6">
              <label className="small text-muted">Tối đa</label>
              <input
                type="number"
                className="form-control form-control-sm"
                value={tempMax}
                onChange={(e) => setTempMax(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        <button 
          onClick={handleApply}
          className="btn btn-dark btn-sm w-100 mt-3 shadow-sm"
        >
          Áp dụng lọc
        </button>
      </div>
    </div>
  );
};

export default PricingRangeWidget;