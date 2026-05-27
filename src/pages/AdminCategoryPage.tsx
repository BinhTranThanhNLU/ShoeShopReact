import { useEffect, useMemo, useState } from "react";
import { categoryApi } from "../api/categoryApi";
import { CategoryFilterBar } from "../components/AdminCategoryComponent/CategoryFilterBar";
import { CategoryModal } from "../components/AdminCategoryComponent/CategoryModal";
import { CategoryTable } from "../components/AdminCategoryComponent/CategoryTable.tsx";
import type { CategoryModel } from "../models/CategoryModel";

type CategoryRow = CategoryModel & {
  level: number;
  parentId: number | null;
};

const flattenCategories = (
  categories: CategoryModel[],
  level = 0,
  parentId: number | null = null,
): CategoryRow[] => {
  return categories.flatMap((category) => [
    { ...category, level, parentId },
    ...flattenCategories(category.subCategories || [], level + 1, category.id),
  ]);
};

const findCategoryNode = (
  categories: CategoryModel[],
  categoryId: number,
): CategoryModel | null => {
  for (const category of categories) {
    if (category.id === categoryId) return category;
    const nested = findCategoryNode(category.subCategories || [], categoryId);
    if (nested) return nested;
  }
  return null;
};

const collectDescendantIds = (category: CategoryModel | null): number[] => {
  if (!category) return [];
  const directChildren = category.subCategories || [];
  return [
    ...directChildren.map((child) => child.id),
    ...directChildren.flatMap((child) => collectDescendantIds(child)),
  ];
};

const AdminCategoryPage = () => {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "add" | "edit" | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryRow | null>(null);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await categoryApi.getAllCategories();
      setCategories(data || []);
    } catch (error) {
      console.error("Lỗi khi tải danh sách danh mục:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadCategories();
  }, []);

  const flatCategories = useMemo(() => flattenCategories(categories), [categories]);

  const filteredCategories = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return flatCategories;
    return flatCategories.filter((category) => {
      return (
        category.name.toLowerCase().includes(keyword) ||
        (category.description || "").toLowerCase().includes(keyword)
      );
    });
  }, [flatCategories, search]);

  const rootCount = useMemo(
    () => flatCategories.filter((category) => category.level === 0).length,
    [flatCategories],
  );

  const leafCount = useMemo(
    () => flatCategories.filter((category) => (category.subCategories || []).length === 0).length,
    [flatCategories],
  );

  const openAddModal = () => {
    setSelectedCategory(null);
    setModalMode("add");
  };

  const openCategoryModal = async (
    category: CategoryRow,
    mode: "view" | "edit",
  ) => {
    try {
      const freshCategory = await categoryApi.getCategoryById(category.id);
      const freshFlat = flattenCategories(categories);
      const freshRow = freshFlat.find((item) => item.id === freshCategory.id) ?? category;
      setSelectedCategory(freshRow);
      setModalMode(mode);
    } catch (error) {
      console.error("Không thể tải chi tiết danh mục:", error);
      alert("Không thể tải chi tiết danh mục từ máy chủ.");
    }
  };

  const handleSaveCategory = async (data: {
    name: string;
    description: string;
    parentId?: number | null;
  }) => {
    try {
      if (modalMode === "add") {
        await categoryApi.createCategory(data);
        alert("Thêm danh mục thành công!");
      } else if (modalMode === "edit" && selectedCategory) {
        await categoryApi.updateCategory(selectedCategory.id, data);
        alert("Cập nhật danh mục thành công!");
      }

      setModalMode(null);
      setSelectedCategory(null);
      await loadCategories();
    } catch (error) {
      console.error("Lưu danh mục thất bại:", error);
      alert("Thao tác danh mục thất bại. Vui lòng kiểm tra tên, danh mục cha hoặc ràng buộc dữ liệu.");
    }
  };

  const handleDeleteCategory = async (category: CategoryRow) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa danh mục "${category.name}"?`)) {
      return;
    }

    try {
      await categoryApi.deleteCategory(category.id);
      alert("Xóa danh mục thành công!");
      await loadCategories();
    } catch (error) {
      console.error("Xóa danh mục thất bại:", error);
      alert("Không thể xóa danh mục. Có thể danh mục này đang có danh mục con hoặc sản phẩm.");
    }
  };

  const parentOptions = useMemo(() => {
    if (!selectedCategory || modalMode === "add") {
      return flatCategories;
    }

    const currentNode = findCategoryNode(categories, selectedCategory.id);
    const excludedIds = new Set<number>([
      selectedCategory.id,
      ...collectDescendantIds(currentNode),
    ]);

    return flatCategories.filter((category) => !excludedIds.has(category.id));
  }, [categories, flatCategories, modalMode, selectedCategory]);

  return (
    <div className="admin-page p-4">
      <div className="admin-page__header d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="admin-page__title fw-bold text-dark m-0">
            Quản Lý Danh Mục
          </h2>
          <p className="admin-page__subtitle text-muted small m-0">
            Quản lý cây danh mục, thêm danh mục con và điều chỉnh cấu trúc hiển thị sản phẩm.
          </p>
        </div>
      </div>

      <div className="admin-summary-strip mb-4">
        <div className="admin-summary-strip__item">
          <i className="bi bi-tags-fill text-primary me-2"></i>
          <span>
            Tổng danh mục: <strong>{flatCategories.length}</strong>
          </span>
        </div>
        <div className="admin-summary-strip__item">
          <i className="bi bi-diagram-3-fill text-success me-2"></i>
          <span>
            Danh mục gốc: <strong>{rootCount}</strong>
          </span>
        </div>
        <div className="admin-summary-strip__item">
          <i className="bi bi-layers text-warning me-2"></i>
          <span>
            Danh mục lá: <strong>{leafCount}</strong>
          </span>
        </div>
      </div>

      <CategoryFilterBar
        search={search}
        onSearchChange={setSearch}
        totalCount={flatCategories.length}
        onAddNew={openAddModal}
        onReload={loadCategories}
      />

      {loading ? (
        <div className="text-center py-5 text-muted small">
          <div className="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
          Đang tải dữ liệu danh mục từ máy chủ...
        </div>
      ) : (
        <CategoryTable
          categories={filteredCategories}
          onView={(category: CategoryRow) => void openCategoryModal(category, "view")}
          onEdit={(category: CategoryRow) => void openCategoryModal(category, "edit")}
          onDelete={handleDeleteCategory}
        />
      )}

      <CategoryModal
        mode={modalMode}
        category={selectedCategory}
        categories={parentOptions}
        onClose={() => {
          setModalMode(null);
          setSelectedCategory(null);
        }}
        onSave={handleSaveCategory}
      />
    </div>
  );
};

export default AdminCategoryPage;
