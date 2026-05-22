import { useState, useEffect } from "react";
import { productAdminApi } from "../../api/productAdminApi";
import type { ProductModel } from "../../models/ProductModel";

interface ProductModalProps {
  mode: "view" | "add" | "edit" | null;
  product: ProductModel | null;
  onClose: () => void;
  onSave: (formData: FormData) => void;
}

const ProductModal = ({ mode, product, onClose, onSave }: ProductModalProps) => {
  const [formData, setFormData] = useState<any>({
    name: "", brand: "nike", category: "", price: 0, discountPercent: 0, description: ""
  });

  const [variantsList, setVariantsList] = useState<Array<{ color: string; size: string; stockQuantity: number }>>([
    { color: "", size: "", stockQuantity: 0 }
  ]);

  const [dbColors, setDbColors] = useState<string[]>([]);
  const [dbSizes, setDbSizes] = useState<string[]>([]);

  // BỔ SUNG: State lưu trữ danh sách danh mục từ Backend gửi về
  const [dbCategories, setDbCategories] = useState<string[]>([]);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  // Tự động load dữ liệu thuộc tính từ Backend khi mở Modal lên
  useEffect(() => {
    const loadAttributes = async () => {
      try {
        const res = await productAdminApi.getAttributes();
        setDbColors(res.colors || []);
        setDbSizes(res.sizes || []);
        setDbCategories(res.categories || []); // Nhận danh sách danh mục từ BE
      } catch (err) {
        console.error("Không thể tải thuộc tính tự động từ BE:", err);
      }
    };
    if (mode) {
      loadAttributes();
    }
  }, [mode]);

  useEffect(() => {
    if (product && (mode === "edit" || mode === "view")) {
      const currentImgUrl = product.image && product.image.length > 0 ? product.image[0].imageUrl : "";
      setFormData({ ...product });
      setPreviewUrl(currentImgUrl);
      setVariantsList(product.variants && product.variants.length > 0 ? product.variants : [{ color: "", size: "", stockQuantity: 0 }]);
      setSelectedFile(null);
    } else if (mode === "add") {
      setFormData({ name: "", brand: "nike", category: "", price: 0, discountPercent: 0, description: "" });
      setVariantsList([{ color: "", size: "", stockQuantity: 0 }]);
      setPreviewUrl("https://placehold.co/150?text=Upload+Image");
      setSelectedFile(null);
    }
  }, [product, mode]);

  if (!mode) return null;
  const isView = mode === "view";

  const handleVariantChange = (index: number, field: string, value: any) => {
    const updated = [...variantsList];
    updated[index] = { ...updated[index], [field]: value };
    setVariantsList(updated);
  };

  const addVariantRow = () => {
    setVariantsList([...variantsList, { color: "", size: "", stockQuantity: 0 }]);
  };

  const removeVariantRow = (index: number) => {
    if (variantsList.length > 1) {
      setVariantsList(variantsList.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedData = { ...formData };

    if (mode === "add") {
      delete cleanedData.id;
    }

    cleanedData.price = cleanedData.price ? Number(cleanedData.price) : 0;
    cleanedData.discountPercent = cleanedData.discountPercent ? Number(cleanedData.discountPercent) : 0;

    cleanedData.variants = variantsList.map(v => ({
      ...v,
      stockQuantity: v.stockQuantity ? Number(v.stockQuantity) : 0
    })).filter(v => v.color !== "" && v.size !== "");

    delete cleanedData.image;

    const dataToSend = new FormData();
    const productBlob = new Blob([JSON.stringify(cleanedData)], { type: "application/json" });
    dataToSend.append("product", productBlob);

    if (selectedFile) {
      dataToSend.append("imageFile", selectedFile);
    }

    onSave(dataToSend);
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
              <div className="modal-body text-start" style={{ maxHeight: "75vh", overflowY: "auto" }}>
                <div className="row g-3">

                  {/* Ô thông tin cơ bản bên trái */}
                  <div className="col-md-8">
                    <div className="mb-3">
                      <label className="form-label fw-semibold small">Tên sản phẩm giày</label>
                      <input
                          type="text" className="form-control form-control-sm" required disabled={isView}
                          value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="row g-2 mb-3">
                      <div className="col-6">
                        <label className="form-label fw-semibold small">Thương hiệu</label>
                        <select
                            className="form-select form-select-sm text-uppercase" disabled={isView}
                            value={formData.brand?.toLowerCase() || "nike"}
                            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        >
                          <option value="nike">Nike</option>
                          <option value="adidas">Adidas</option>
                          <option value="puma">Puma</option>
                          <option value="asics">Asics</option>
                          <option value="mizuno">Mizuno</option>
                          <option value="kamito">Kamito</option>
                        </select>
                      </div>

                      {/* CHỈNH SỬA: CHUYỂN Ô DANH MỤC SANG SELECT ĐỘNG TỪ BE */}
                      <div className="col-6">
                        <label className="form-label fw-semibold small">Danh mục (Loại)</label>
                        <select
                            className="form-select form-select-sm" required disabled={isView}
                            value={formData.category || ""}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                          <option value="">-- Chọn Danh Mục --</option>
                          {dbCategories.map((cat, idx) => (
                              <option key={idx} value={cat}>{cat}</option>
                          ))}
                          {/* Dự phòng nếu ở chế độ Edit mà danh mục của SP chưa kịp quét ra trong dbCategories */}
                          {mode === "edit" && formData.category && !dbCategories.includes(formData.category) && (
                              <option value={formData.category}>{formData.category}</option>
                          )}
                        </select>
                      </div>
                    </div>

                    <div className="row g-2 mb-3">
                      <div className="col-6">
                        <label className="form-label fw-semibold small">Giá bán gốc (đ)</label>
                        <input
                            type="number" className="form-control form-control-sm" required disabled={isView}
                            value={formData.price || 0} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                        />
                      </div>
                      <div className="col-6">
                        <label className="form-label fw-semibold small">Giảm giá (%)</label>
                        <input
                            type="number" className="form-control form-control-sm" disabled={isView}
                            value={formData.discountPercent || 0} onChange={(e) => setFormData({ ...formData, discountPercent: Number(e.target.value) })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Khối hình ảnh bên phải */}
                  <div className="col-md-4 text-center">
                    <label className="form-label d-block fw-semibold small">Hình ảnh đại diện</label>
                    <img
                        src={previewUrl || "https://placehold.co/150"} alt="Preview"
                        className="img-thumbnail mb-2 shadow-sm" style={{ width: "150px", height: "150px", objectFit: "cover" }}
                    />
                    {!isView && (
                        <input type="file" className="form-control form-control-sm" accept="image/*" onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            setSelectedFile(e.target.files[0]);
                            setPreviewUrl(URL.createObjectURL(e.target.files[0]));
                          }
                        }} />
                    )}
                  </div>

                  <div className="col-12 mb-2">
                    <label className="form-label fw-semibold small">Mô tả sản phẩm</label>
                    <textarea
                        className="form-control form-control-sm" rows={2} disabled={isView}
                        value={formData.description || ""} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    ></textarea>
                  </div>

                  {/* KHỐI BIẾN THỂ (MÀU, SIZE, SỐ LƯỢNG) */}
                  <div className="col-12 border-top pt-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <label className="form-label fw-bold text-primary m-0 small">Thuộc tính số lượng từng biến thể giày</label>
                      {!isView && (
                          <button type="button" className="btn btn-xs btn-outline-success px-2 py-1" style={{ fontSize: "11px" }} onClick={addVariantRow}>
                            + Thêm dòng biến thể
                          </button>
                      )}
                    </div>

                    {variantsList.map((variant, index) => (
                        <div className="row g-2 mb-2 align-items-center" key={index}>
                          <div className="col-4">
                            <select
                                className="form-select form-select-sm" required disabled={isView}
                                value={variant.color || ""} onChange={(e) => handleVariantChange(index, "color", e.target.value)}
                            >
                              <option value="">-- Chọn Màu Sắc --</option>
                              {dbColors.map((c, idx) => <option key={idx} value={c}>{c}</option>)}
                              {mode === "edit" && variant.color && !dbColors.includes(variant.color) && (
                                  <option value={variant.color}>{variant.color}</option>
                              )}
                            </select>
                          </div>

                          <div className="col-4">
                            <select
                                className="form-select form-select-sm" required disabled={isView}
                                value={variant.size || ""} onChange={(e) => handleVariantChange(index, "size", e.target.value)}
                            >
                              <option value="">-- Chọn Size giày --</option>
                              {dbSizes.map((s, idx) => <option key={idx} value={s}>{s}</option>)}
                              {mode === "edit" && variant.size && !dbSizes.includes(variant.size) && (
                                  <option value={variant.size}>{variant.size}</option>
                              )}
                            </select>
                          </div>

                          <div className="col-3">
                            <input
                                type="number" className="form-control form-control-sm" placeholder="Số lượng nhập" required disabled={isView}
                                value={variant.stockQuantity} onChange={(e) => handleVariantChange(index, "stockQuantity", e.target.value)}
                            />
                          </div>

                          <div className="col-1 text-center">
                            {!isView && variantsList.length > 1 && (
                                <button type="button" className="btn btn-sm btn-outline-danger border-0" onClick={() => removeVariantRow(index)}>
                                  <i className="bi bi-trash"></i>
                                </button>
                            )}
                          </div>
                        </div>
                    ))}
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