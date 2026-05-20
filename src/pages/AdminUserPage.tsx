import { useState, useEffect } from "react";
import { userAdminApi } from "../api/userAdminApi";
import type { UserModel } from "../models/UserModel";
import AdminPagination from "../components/AdminUserComponent/AdminPagination";
import UserDetailModal from "../components/AdminUserComponent/UserDetailModal";
import UserFilterBar from "../components/AdminUserComponent/UserFilterBar";
import UserTable from "../components/AdminUserComponent/UserTable";

const AdminUserPage = () => {
  // Quản lý danh sách người dùng thực tế từ API
  const [users, setUsers] = useState<UserModel[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Quản lý phân trang đồng bộ với Spring Data Page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);

  // Hàm gọi API lấy danh sách phân trang và lọc từ Backend
  const fetchUsers = async (pageNumber: number) => {
    setLoading(true);
    try {
      // Spring Boot Page tính từ trang 0, FE tính từ trang 1
      const params = {
        keyword: search.trim() || undefined,
        status: statusFilter === "active" ? "true" : statusFilter === "blocked" ? "false" : undefined,
        roleId: roleFilter === "ADMIN" ? "1" : roleFilter === "USER" ? "2" : undefined,
        page: pageNumber - 1,
        size: 6 // Số lượng bản ghi trên một trang
      };

      const data = await userAdminApi.getAllUsers(params);

      // Map dữ liệu trả về từ cấu trúc Page của Spring Data
      setUsers(data.content || []);
      setTotalPages(data.totalPages || 1);
      setTotalElements(data.totalElements || 0);
    } catch (err) {
      console.error("Lỗi khi kết nối API lấy danh sách người dùng: ", err);
    } finally {
      setLoading(false);
    }
  };

  // Tự động tải lại dữ liệu khi chuyển đổi số trang
  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  // Xử lý khi nhấn nút "Áp dụng lọc dữ liệu" hoặc Tìm kiếm
  const handleApplyFilter = () => {
    setCurrentPage(1); // Đưa về trang đầu tiên khi lọc
    fetchUsers(1);
  };

  const handleToggleStatus = async (user: UserModel) => {
    const actionText = user.status ? "KHÓA" : "MỞ KHÓA";
    if (window.confirm(`Bạn có chắc chắn muốn ${actionText} tài khoản của ${user.fullName}?`)) {
      try {
        const res = await userAdminApi.toggleUserStatus(user.id);
        alert(res.message || "Cập nhật trạng thái tài khoản thành công!");

        // Nếu đang mở Modal chi tiết của chính user này, cập nhật lại trạng thái hiển thị trên Modal luôn
        if (selectedUser && selectedUser.id === user.id) {
          setSelectedUser({ ...selectedUser, status: !user.status });
        }

        // Reload lại danh sách ở trang hiện tại
        fetchUsers(currentPage);
      } catch (err) {
        console.error(err);
        alert("Thao tác thay đổi trạng thái tài khoản thất bại!");
      }
    }
  };

  // Đếm nhanh số liệu thống kê hiển thị trên màn hình dựa trên danh sách trang hiện tại
  const activeCount = users.filter((u) => u.status).length;
  const adminCount = users.filter((u) => u.role?.name === "ADMIN").length;

  return (
      <div className="admin-page animate-fade-in">
        <div className="admin-page__header">
          <div>
            <h2 className="admin-page__title">Quản lý người dùng</h2>
            <p className="admin-page__subtitle">
              Xem danh sách, lọc tìm kiếm, phân quyền và khóa/mở khóa tài khoản thành viên hệ thống.
            </p>
          </div>
          <div className="admin-page__header-actions">
            <button className="btn btn-primary btn-sm" onClick={handleApplyFilter}>
              <i className="bi bi-funnel-fill me-1"></i>
              Áp dụng lọc dữ liệu
            </button>
          </div>
        </div>

        {/* Thanh Strip Thống kê nhanh */}
        <div className="admin-summary-strip">
          <div className="admin-summary-strip__item">
            <i className="bi bi-people text-primary me-2"></i>
            <span>Tổng số trang này: <strong>{users.length}</strong></span>
          </div>
          <div className="admin-summary-strip__item">
            <i className="bi bi-check-circle text-success me-2"></i>
            <span>Hoạt động: <strong>{activeCount}</strong></span>
          </div>
          <div className="admin-summary-strip__item">
            <i className="bi bi-x-circle text-danger me-2"></i>
            <span>Bị khoá: <strong>{users.length - activeCount}</strong></span>
          </div>
          <div className="admin-summary-strip__item">
            <i className="bi bi-shield-fill-check text-warning me-2"></i>
            <span>Admin: <strong>{adminCount}</strong></span>
          </div>
        </div>

        {/* Component Thanh Lọc */}
        <UserFilterBar
            search={search}
            onSearchChange={setSearch}
            roleFilter={roleFilter}
            onRoleFilterChange={setRoleFilter}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            totalCount={totalElements} // Tổng số bản ghi tìm thấy trong DB
        />

        {/* Bảng Dữ liệu kèm hiệu ứng loading */}
        {loading ? (
            <div className="text-center py-5 text-muted small">
              <div className="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
              Đang tải dữ liệu...
            </div>
        ) : (
            <UserTable
                users={users}
                onToggleStatus={handleToggleStatus}
                onViewDetail={setSelectedUser}
            />
        )}

        {/* Phân trang */}
        <AdminPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
        />

        {/* Modal xem chi tiết */}
        <UserDetailModal
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
            onToggleStatus={handleToggleStatus}
        />
      </div>
  );
};

export default AdminUserPage;