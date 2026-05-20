import { useState, useEffect } from "react";
import type {ProductModel} from "../../models/ProductModel";

interface ProductModalProps {
  mode: "view" | "add" | "edit" | null;
  product: ProductModel | null;
  onClose: () => void;
  onSave: (p: Partial<ProductModel>) => void;
}

const ProductModal = ({ mode, product, onClose, onSave }: ProductModalProps) => {
  const [formData, setFormData] = useState<Partial<ProductModel>>({
    name: "", brand: "Nike", category: "", price: 0, stock: 0, images: "", status: true, description: ""
  });

  useEffect(() => {
    if (product && (mode === "edit" || mode === "view")) {
      setFormData(product);
    } else if (mode === "add") {
      setFormData({ name: "", brand: "Nike", category: "", price: 0, stock: 0, images: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200", status: true, description: "" });
    }
  }, [product, mode]);

  if (!mode) return null;

  const isView = mode === "view";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
      <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} role="dialog">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header bg-light">
              <h5 className="modal-title fw-bold">
                {mode === "view" && "Chi tiết sản phẩm"}
                {mode === "add" && "Thêm sản phẩm mới"}
                {mode === "edit" && "Cập nhật sản phẩm"}
              </h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body text-start" style={{ maxHeight: "70vh", overflowY: "auto" }}>
                <div className="row g-3">
                  <div className="col-md-8">
                    <div className="mb-3">
                      <label className="form-label fw-semibold small">Tên sản phẩm</label>
                      <input
                          type="text" className="form-control form-control-sm" required disabled={isView}
                          value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="row g-2 mb-3">
                      <div className="col-6">
                        <label className="form-label fw-semibold small">Thương hiệu</label>
                        <select
                            className="form-select form-select-sm" disabled={isView}
                            value={formData.brand || "Nike"} onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        >
                          <option value="Nike">Nike</option>
                          <option value="Adidas">Adidas</option>
                          <option value="Puma">Puma</option>
                        </select>
                      </div>
                      <div className="col-6">
                        <label className="form-label fw-semibold small">Danh mục (Loại)</label>
                        <input
                            type="text" className="form-control form-control-sm" required disabled={isView}
                            value={formData.category || ""} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="row g-2 mb-3">
                      <div className="col-6">
                        <label className="form-label fw-semibold small">Giá bán (đ)</label>
                        <input
                            type="number" className="form-control form-control-sm" required disabled={isView}
                            value={formData.price || 0} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                        />
                      </div>
                      <div className="col-6">
                        <label className="form-label fw-semibold small">Số lượng tồn kho</label>
                        <input
                            type="number" className="form-control form-control-sm" required disabled={isView}
                            value={formData.stock || 0} onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 text-center">
                    <label className="form-label d-block fw-semibold small">Ảnh minh họa</label>
                    <img
                        src={formData.images || "https://placehold.co/150"}
                        alt="Preview" className="img-thumbnail mb-2" style={{ width: "150px", height: "150px", objectFit: "cover" }}
                    />
                    {!isView && (
                        <input
                            type="text" className="form-control form-control-sm" placeholder="URL hình ảnh"
                            value={formData.images || ""} onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                        />
                    )}
                  </div>

                  <div className="col-12 mb-3">
                    <label className="form-label fw-semibold small">Mô tả sản phẩm</label>
                    <textarea
                        className="form-control form-control-sm" rows={3} disabled={isView}
                        value={formData.description || ""} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="col-12">
                    <div className="form-check form-switch">
                      <input
                          className="form-check-input" type="checkbox" id="productStatus" disabled={isView}
                          checked={formData.status ?? true} onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                      />
                      <label className="form-check-label small fw-semibold" htmlFor="productStatus">Kích hoạt kinh doanh</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer bg-light">
                <button type="button" className="btn btn-sm btn-secondary" onClick={onClose}>Đóng</button>
                {!isView && <button type="submit" className="btn btn-sm btn-primary">Lưu thông tin</button>}
              </div>
            </form>
          </div>
        </div>
      </div>
  );
};

export default ProductModal;