import type {ProductModel} from "../../models/ProductModel";

interface ProductTableProps {
  products: ProductModel[];
  onView: (p: ProductModel) => void;
  onEdit: (p: ProductModel) => void;
  onDelete: (id: number) => void;
}

const ProductTable = ({ products, onView, onEdit, onDelete }: ProductTableProps) => {
  return (
      <div className="table-responsive bg-white rounded shadow-sm">
        <table className="table align-middle table-hover mb-0 admin-table">
          <thead className="table-light text-uppercase fs-7">
          <tr>
            <th style={{ width: "80px" }}>Hình ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Thương hiệu / Loại</th>
            <th>Giá bán</th>
            <th>Kho hàng</th>
            <th>Trạng thái</th>
            <th className="text-end" style={{ width: "150px" }}>Hành động</th>
          </tr>
          </thead>
          <tbody>
          {products.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-muted py-4">Không tìm thấy sản phẩm nào.</td>
              </tr>
          ) : (
              products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img src={product.images} alt={product.name} className="rounded" style={{ width: "50px", height: "50px", objectFit: "cover" }} />
                    </td>
                    <td>
                      <div className="fw-bold text-dark">{product.name}</div>
                      <small className="text-muted">Mã: #{product.id}</small>
                    </td>
                    <td>
                      <div>{product.brand}</div>
                      <small className="badge bg-secondary-subtle text-secondary">{product.category}</small>
                    </td>
                    <td className="fw-bold text-primary">
                      {product.price.toLocaleString("vi-VN")}đ
                    </td>
                    <td>
                      {product.stock > 0 ? (
                          <span className="text-success">{product.stock} chiếc</span>
                      ) : (
                          <span className="text-danger fw-bold">Hết hàng</span>
                      )}
                    </td>
                    <td>
                      {product.status ? (
                          <span className="badge bg-success-subtle text-success">Kinh doanh</span>
                      ) : (
                          <span className="badge bg-danger-subtle text-danger">Tạm ngưng</span>
                      )}
                    </td>
                    <td className="text-end">
                      <div className="btn-group btn-group-sm">
                        <button className="btn btn-outline-info" title="Xem chi tiết" onClick={() => onView(product)}>
                          <i className="bi bi-eye"></i>
                        </button>
                        <button className="btn btn-outline-primary" title="Chỉnh sửa" onClick={() => onEdit(product)}>
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-outline-danger" title="Xóa" onClick={() => onDelete(product.id)}>
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
              ))
          )}
          </tbody>
        </table>
      </div>
  );
};

export default ProductTable;