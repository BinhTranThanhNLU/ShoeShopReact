import { useState, useEffect } from "react";
import { productAdminApi } from "../api/productAdminApi";
import ProductFilterBar from "../components/AdminProductComponent/ProductFilterBar";
import ProductTable from "../components/AdminProductComponent/ProductTable";
import ProductModal from "../components/AdminProductComponent/ProductModal";
import AdminPagination from "../components/AdminUserComponent/AdminPagination";
import type { ProductModel } from "../models/ProductModel";

const PAGE_SIZE = 6; // Số lượng sản phẩm hiển thị trên một trang

export const AdminProductPage = () => {
  // State quản lý danh sách dữ liệu thực tế nhận từ API Backend
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState(false);

  // State quản lý các bộ lọc tìm kiếm và phân trang
  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  // State quản lý đóng/mở và chế độ của Modal popup (Xem / Thêm / Sửa)
  const [modalMode, setModalMode] = useState<"view" | "add" | "edit" | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductModel | null>(null);

  // Hàm kết nối API để quét dữ liệu thực tế từ Database MySQL
  const fetchProducts = async (pageNumber: number) => {
    setLoading(true);
    try {
      // Chuẩn hóa bộ lọc (Spring Boot tính trang từ số 0, Frontend tính từ số 1)
      const params = {
        keyword: search.trim() || undefined,
        brand: brandFilter || undefined,
        category: categoryFilter || undefined,
        page: pageNumber - 1,
        size: PAGE_SIZE
      };

      // Thực hiện gọi request thông qua axiosClient
      const data = await productAdminApi.getAll(params);

      // Đổ dữ liệu phân trang thực tế vào State để render giao diện
      setProducts(data.content || []);
      setTotalPages(data.totalPages || 1);
      setTotalElements(data.totalElements || 0);
    } catch (error) {
      console.error("Lỗi khi kết nối lấy danh sách sản phẩm từ Backend:", error);
    } finally {
      setLoading(false);
    }
  };

  // Tự động kích hoạt gọi lại API mỗi khi người dùng thay đổi bộ lọc hoặc bấm chuyển trang
  useEffect(() => {
    fetchProducts(currentPage);
  }, [search, brandFilter, categoryFilter, currentPage]);

  // Xử lý khi gõ tìm kiếm hoặc đổi select-box (Đưa về trang 1 để tránh lệch trang)
  const handleSearchChange = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const handleBrandChange = (val: string) => {
    setBrandFilter(val);
    setCurrentPage(1);
  };

  // Hành động Xóa sản phẩm thực tế xuống Database
  const handleDeleteProduct = async (id: number) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa vĩnh viễn sản phẩm mã #${id} khỏi hệ thống?`)) {
      try {
        await productAdminApi.delete(id);
        alert("Xóa sản phẩm thành công!");
        fetchProducts(currentPage); // Tải lại trang hiện tại để cập nhật bảng dữ liệu
      } catch (error) {
        alert("Xóa sản phẩm thất bại! Sản phẩm này có thể đã nằm trong giỏ hàng hoặc hóa đơn của khách.");
      }
    }
  };

  // Hành động mở Modal (Gọi API lấy bản ghi mới nhất từ DB để đảm bảo chính xác)
  const handleOpenModal = async (mode: "view" | "edit", product: ProductModel) => {
    try {
      const freshData = await productAdminApi.getById(product.id);
      setSelectedProduct(freshData);
      setModalMode(mode);
    } catch (error) {
      alert("Không thể tải thông tin chi tiết sản phẩm từ máy chủ!");
    }
  };

  // Xử lý sự kiện bấm nút Lưu thông tin trên Modal (Xử lý cả Thêm mới và Chỉnh sửa)
  const handleSaveProduct = async (formData: FormData) => {
    try {
      if (modalMode === "add") {
        await productAdminApi.create(formData);
        alert("Thêm mới sản phẩm kèm ảnh thành công!");
        setCurrentPage(1);
      } else if (modalMode === "edit" && selectedProduct) {
        await productAdminApi.update(selectedProduct.id, formData);
        alert("Cập nhật sản phẩm thành công!");
        fetchProducts(currentPage);
      }
      setModalMode(null);
      setSelectedProduct(null);
    } catch (error) {
      console.error(error);
      alert("Thao tác thất bại! Lỗi upload hình ảnh hoặc dữ liệu không hợp lệ.");
    }
  };

  return (
      <div className="admin-page p-4">
        {/* Tiêu đề phân hệ quản trị */}
        <div className="admin-page__header d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="admin-page__title fw-bold text-dark m-0">Quản Lý Sản Phẩm</h2>
            <p className="admin-page__subtitle text-muted small m-0">Đồng bộ kho hàng, thương hiệu và thông tin trực tiếp từ Database hệ thống.</p>
          </div>
        </div>

        {/* Thanh công cụ tìm kiếm và lọc dữ liệu thật */}
        <ProductFilterBar
            search={search}
            onSearchChange={handleSearchChange}
            brandFilter={brandFilter}
            onBrandFilterChange={handleBrandChange}
            statusFilter={""} // Để trống hoặc truyền giá trị mặc định theo thiết kế Filter gốc của bạn
            onStatusFilterChange={() => {}}
            totalCount={totalElements}
            onAddNew={() => setModalMode("add")}
        />

        {/* Bảng chứa danh sách kèm hiệu ứng Loading xoay tròn */}
        {loading ? (
            <div className="text-center py-5 text-muted small">
              <div className="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
              Đang kết nối API đồng bộ dữ liệu kho hàng...
            </div>
        ) : (
            <ProductTable
                products={products}
                onView={(p) => handleOpenModal("view", p)}
                onEdit={(p) => handleOpenModal("edit", p)}
                onDelete={handleDeleteProduct}
            />
        )}

        {/* Thanh Phân Trang đồng bộ API */}
        <div className="mt-3 d-flex justify-content-end">
          <AdminPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
          />
        </div>

        {/* Popup Modal dùng chung cho Xem chi tiết / Thêm mới / Chỉnh sửa */}
        <ProductModal
            mode={modalMode}
            product={selectedProduct}
            onClose={() => { setModalMode(null); setSelectedProduct(null); }}
            onSave={handleSaveProduct}
        />
      </div>
  );
};

export default AdminProductPage;