interface ProductFilterBarProps {
  search: string;
  onSearchChange: (val: string) => void;
  brandFilter: string;
  onBrandFilterChange: (val: string) => void;
  statusFilter: string;
  onStatusFilterChange: (val: string) => void;
  totalCount: number;
  onAddNew: () => void;
}

const ProductFilterBar = ({
                            search, onSearchChange,
                            brandFilter, onBrandFilterChange,
                            statusFilter, onStatusFilterChange,
                            totalCount, onAddNew
                          }: ProductFilterBarProps) => {
  return (
      <div className="card p-3 mb-4 shadow-sm border-0">
        <div className="row g-3 align-items-center">
          {/* Tìm kiếm */}
          <div className="col-md-4">
            <div className="input-group input-group-sm">
              <span className="input-group-text bg-white text-muted"><i className="bi bi-search"></i></span>
              <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm theo tên, nhãn hiệu..."
                  value={search}
                  onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>
          {/* Lọc Nhãn hiệu */}
          <div className="col-md-2">
            <select
                className="form-select form-select-sm"
                value={brandFilter}
                onChange={(e) => onBrandFilterChange(e.target.value)}
            >
              <option value="">Tất cả thương hiệu</option>
              <option value="Nike">Nike</option>
              <option value="Adidas">Adidas</option>
              <option value="Puma">Puma</option>
            </select>
          </div>
          {/* Lọc Trạng thái */}
          <div className="col-md-2">
            <select
                className="form-select form-select-sm"
                value={statusFilter}
                onChange={(e) => onStatusFilterChange(e.target.value)}
            >
              <option value="">Tất cả trạng thái</option>
              <option value="active">Đang kinh doanh</option>
              <option value="inactive">Ngừng kinh doanh</option>
            </select>
          </div>
          {/* Thống kê nhỏ */}
          <div className="col-md-2 text-muted small">
            Tìm thấy: <strong>{totalCount}</strong> sản phẩm
          </div>
          {/* Nút Thêm mới */}
          <div className="col-md-2 text-end">
            <button className="btn btn-sm btn-primary w-100" onClick={onAddNew}>
              <i className="bi bi-plus-lg me-1"></i> Thêm mới
            </button>
          </div>
        </div>
      </div>
  );
};

export default ProductFilterBar;