interface CategoryFilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  totalCount: number;
  onAddNew: () => void;
  onReload: () => void;
}

export const CategoryFilterBar = ({
  search,
  onSearchChange,
  totalCount,
  onAddNew,
  onReload,
}: CategoryFilterBarProps) => {
  return (
    <div className="card p-3 mb-4 shadow-sm border-0">
      <div className="row g-3 align-items-center">
        <div className="col-md-4">
          <div className="input-group input-group-sm">
            <span className="input-group-text bg-white text-muted">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Tìm theo tên danh mục, mô tả..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-2 text-muted small">
          Tìm thấy: <strong>{totalCount}</strong> danh mục
        </div>
        <div className="col-md-2 text-end">
          <button
            className="btn btn-sm btn-outline-secondary w-100"
            onClick={onReload}
          >
            <i className="bi bi-arrow-clockwise me-1"></i> Làm mới
          </button>
        </div>
        <div className="col-md-2 text-end">
          <button
            className="btn btn-sm btn-primary w-100"
            onClick={onAddNew}
          >
            <i className="bi bi-plus-lg me-1"></i> Thêm mới
          </button>
        </div>
      </div>
    </div>
  );
};
