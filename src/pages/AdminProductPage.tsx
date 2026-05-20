import { useState, useMemo } from "react";
import { mockProducts } from "../mockData/productMockData";
import type {ProductModel} from "../models/ProductModel";
import ProductFilterBar from "../components/AdminProductComponent/ProductFilterBar";
import ProductTable from "../components/AdminProductComponent/ProductTable";
import ProductModal from "../components/AdminProductComponent/ProductModal";
import AdminPagination from "../components/AdminUserComponent/AdminPagination"; // Tái sử dụng Pagination có sẵn của dự án

const PAGE_SIZE = 5;

const AdminProductPage = () => {
  const [products, setProducts] = useState<ProductModel[]>(mockProducts);
  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Quản lý Modal state
  const [modalMode, setModalMode] = useState<"view" | "add" | "edit" | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductModel | null>(null);

  // Logic Lọc Dữ Liệu
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
          !search ||
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.brand.toLowerCase().includes(search.toLowerCase());

      const matchBrand = !brandFilter || p.brand === brandFilter;

      const matchStatus =
          !statusFilter ||
          (statusFilter === "active" ? p.status : !p.status);

      return matchSearch && matchBrand && matchStatus;
    });
  }, [products, search, brandFilter, statusFilter]);

  // Logic Phân Trang dữ liệu sau lọc
  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE) || 1;
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredProducts.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredProducts, currentPage]);

  // Hành động mở Modal xem chi tiết
  const handleViewDetails = (product: ProductModel) => {
    setSelectedProduct(product);
    setModalMode("view");
  };

  // Hành động mở Modal chỉnh sửa
  const handleEditInit = (product: ProductModel) => {
    setSelectedProduct(product);
    setModalMode("edit");
  };

  // Hành động xóa sản phẩm kèm cảnh báo confirm
  const handleDeleteProduct = (id: number) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm mã #${id} không?`)) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  // Xử lý Lưu thông tin khi Thêm / Sửa sản phẩm
  const handleSaveProduct = (formData: Partial<ProductModel>) => {
    if (modalMode === "add") {
      const newProduct: ProductModel = {
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        name: formData.name || "Sản phẩm chưa đặt tên",
        brand: formData.brand || "Nike",
        category: formData.category || "Chưa phân loại",
        price: formData.price || 0,
        stock: formData.stock || 0,
        image: formData.images || "https://placehold.co/150",
        status: formData.status ?? true,
        description: formData.description,
        createdAt: new Date().toISOString().split("T")[0]
      };
      setProducts([newProduct, ...products]);
    } else if (modalMode === "edit" && selectedProduct) {
      setProducts(products.map(p => p.id === selectedProduct.id ? { ...p, ...formData } as ProductModel : p));
    }
    setModalMode(null);
    setSelectedProduct(null);
  };

  return (
      <div className="admin-page p-4">
        {/* Tiêu đề Trang */}
        <div className="admin-page__header d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="admin-page__title fw-bold text-dark m-0">Quản Lý Sản Phẩm</h2>
            <p className="admin-page__subtitle text-muted small m-0">Cập nhật, chỉnh sửa danh mục kho hàng của cửa hàng.</p>
          </div>
        </div>

        {/* Thanh lọc & Nút bấm thêm mới */}
        <ProductFilterBar
            search={search}
            onSearchChange={(val) => { setSearch(val); setCurrentPage(1); }}
            brandFilter={brandFilter}
            onBrandFilterChange={(val) => { setBrandFilter(val); setCurrentPage(1); }}
            statusFilter={statusFilter}
            onStatusFilterChange={(val) => { setStatusFilter(val); setCurrentPage(1); }}
            totalCount={filteredProducts.length}
            onAddNew={() => setModalMode("add")}
        />

        {/* Bảng chứa dữ liệu */}
        <ProductTable
            products={paginatedProducts}
            onView={handleViewDetails}
            onEdit={handleEditInit}
            onDelete={handleDeleteProduct}
        />

        {/* Thanh Phân Trang */}
        <div className="mt-3 d-flex justify-content-end">
          <AdminPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
          />
        </div>

        {/* Popup Modal dùng chung cho Xem/Thêm/Sửa */}
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