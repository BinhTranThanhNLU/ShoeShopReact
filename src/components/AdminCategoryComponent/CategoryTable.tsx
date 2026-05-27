import type { CategoryModel } from "../../models/CategoryModel";

interface CategoryRow extends CategoryModel {
  level: number;
  parentId: number | null;
}

interface CategoryTableProps {
  categories: CategoryRow[];
  onView: (category: CategoryRow) => void;
  onEdit: (category: CategoryRow) => void;
  onDelete: (category: CategoryRow) => void;
}

const renderName = (category: CategoryRow) => (
  <div style={{ paddingLeft: `${category.level * 20}px` }}>
    {category.level > 0 && (
      <i className="bi bi-arrow-return-right text-muted me-1"></i>
    )}
    <span className="fw-semibold text-dark">{category.name}</span>
    {category.level === 0 && (
      <span className="badge bg-secondary-subtle text-secondary ms-2">
        Gốc
      </span>
    )}
  </div>
);

export const CategoryTable = ({
  categories,
  onView,
  onEdit,
  onDelete,
}: CategoryTableProps) => {
  return (
    <div className="table-responsive bg-white rounded shadow-sm">
      <table className="table align-middle table-hover mb-0 admin-table">
        <thead className="table-light text-uppercase fs-7">
          <tr>
            <th style={{ width: "110px" }}>Mã</th>
            <th>Tên danh mục</th>
            <th>Mô tả</th>
            <th style={{ width: "150px" }}>Cấp độ</th>
            <th style={{ width: "160px" }}>Danh mục con</th>
            <th className="text-end" style={{ width: "180px" }}>
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center text-muted py-4">
                Chưa có danh mục nào hoặc không tìm thấy kết quả phù hợp.
              </td>
            </tr>
          ) : (
            categories.map((category) => {
              const subCount = category.subCategories?.length || 0;

              return (
                <tr key={category.id}>
                  <td>
                    <div className="fw-bold text-dark">#{category.id}</div>
                  </td>
                  <td>{renderName(category)}</td>
                  <td>
                    <span className="text-muted">
                      {category.description?.trim() || "Không có mô tả"}
                    </span>
                  </td>
                  <td>
                    <span className="badge bg-primary-subtle text-primary">
                      Cấp {category.level + 1}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        subCount > 0
                          ? "bg-success-subtle text-success"
                          : "bg-secondary-subtle text-secondary"
                      }`}
                    >
                      {subCount} danh mục con
                    </span>
                  </td>
                  <td className="text-end">
                    <div className="btn-group btn-group-sm">
                      <button
                        className="btn btn-outline-info"
                        title="Xem chi tiết"
                        onClick={() => onView(category)}
                      >
                        <i className="bi bi-eye"></i>
                      </button>
                      <button
                        className="btn btn-outline-primary"
                        title="Chỉnh sửa"
                        onClick={() => onEdit(category)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        title="Xóa"
                        onClick={() => onDelete(category)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};