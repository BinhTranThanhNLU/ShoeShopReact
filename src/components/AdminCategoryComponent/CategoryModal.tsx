import { useEffect, useState, type FormEvent } from "react";
import type { CategoryModel } from "../../models/CategoryModel";

interface CategoryOption {
  id: number;
  name: string;
  level: number;
}

interface CategoryRow extends CategoryModel {
  level: number;
  parentId: number | null;
}

interface CategoryModalProps {
  mode: "view" | "add" | "edit" | null;
  category: CategoryRow | null;
  categories: CategoryOption[];
  onClose: () => void;
  onSave: (data: {
    name: string;
    description: string;
    parentId?: number | null;
  }) => Promise<void> | void;
}

export const CategoryModal = ({
  mode,
  category,
  categories,
  onClose,
  onSave,
}: CategoryModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [parentId, setParentId] = useState<string>("");

  useEffect(() => {
    if (!mode) return;

    setName(category?.name || "");
    setDescription(category?.description || "");
    setParentId(category?.parentId ? String(category.parentId) : "");
  }, [category, mode]);

  if (!mode) return null;

  const isView = mode === "view";
  const title =
    mode === "add"
      ? "Thêm danh mục mới"
      : mode === "edit"
        ? `Cập nhật danh mục #${category?.id}`
        : `Chi tiết danh mục #${category?.id}`;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSave({
      name: name.trim(),
      description: description.trim(),
      parentId: parentId ? Number(parentId) : null,
    });
  };

  return (
    <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} role="dialog">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header bg-light">
            <h5 className="modal-title fw-bold">{title}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body text-start" style={{ maxHeight: "75vh", overflowY: "auto" }}>
              <div className="row g-3">
                <div className="col-md-7">
                  <div className="mb-3">
                    <label className="form-label fw-semibold small">Tên danh mục</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={name}
                      disabled={isView}
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold small">Mô tả</label>
                    <textarea
                      className="form-control form-control-sm"
                      rows={4}
                      value={description}
                      disabled={isView}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold small">Danh mục cha</label>
                    <select
                      className="form-select form-select-sm"
                      value={parentId}
                      disabled={isView}
                      onChange={(e) => setParentId(e.target.value)}
                    >
                      <option value="">Danh mục gốc</option>
                      {categories.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.level > 0 ? `${"—".repeat(option.level)} ` : ""}
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-md-5">
                  <div className="border rounded p-3 bg-light-subtle h-100">
                    <div className="fw-semibold mb-2">Thông tin danh mục</div>
                    <div className="small mb-1">
                      <span className="text-muted">Mã:</span> #{category?.id || "mới"}
                    </div>
                    <div className="small mb-1">
                      <span className="text-muted">Tên:</span> {name || "Chưa nhập"}
                    </div>
                    <div className="small mb-1">
                      <span className="text-muted">Danh mục cha:</span>{" "}
                      {parentId
                        ? categories.find((item) => String(item.id) === parentId)?.name || "Không xác định"
                        : "Danh mục gốc"}
                    </div>
                    <div className="small mb-1">
                      <span className="text-muted">Mô tả:</span> {description || "Không có"}
                    </div>
                    <div className="small text-muted mt-3">
                      {isView
                        ? "Đây là chế độ xem chi tiết."
                        : "Bạn có thể gắn danh mục này làm danh mục con bằng cách chọn danh mục cha."}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer bg-light">
              <button type="button" className="btn btn-sm btn-secondary" onClick={onClose}>
                Đóng
              </button>
              {!isView && (
                <button type="submit" className="btn btn-sm btn-primary">
                  Lưu danh mục
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
