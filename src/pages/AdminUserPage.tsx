import { useState, useEffect } from "react";
import { userAdminApi } from "../api/userAdminApi";
import AdminPagination from "../components/AdminUserComponent/AdminPagination";
import UserDetailModal from "../components/AdminUserComponent/UserDetailModal";
import UserFilterBar from "../components/AdminUserComponent/UserFilterBar";
import UserTable from "../components/AdminUserComponent/UserTable";
import type { UserModel } from "../models/UserModel";

const AdminUserPage = () => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);

  // Thống kê sơ bộ số lượng tài khoản trên trang hiện tại
  const activeCount = users.filter((u) => u.status).length;
  const adminCount = users.filter((u) => u.role?.name === "ADMIN").length;

  // Hàm gọi API lấy danh sách phân trang và lọc từ Backend
  const fetchUsers = async (pageNumber: number) => {
    setLoading(true);
    try {
      // Spring Boot bắt đầu trang từ 0, Frontend bắt đầu từ 1
      const params = {
        keyword: search.trim() || undefined,
        status: statusFilter === "active" ? "true" : statusFilter === "locked" ? "false" : undefined,
        roleId: roleFilter === "ADMIN" ? "1" : roleFilter === "USER" ? "2" : undefined, // Đồng bộ mã ID Role trong DB của bạn
        page: pageNumber - 1,
        size: 6 // Số lượng bản ghi hiển thị trên mỗi trang
      };

      const data = await userAdminApi.getAllUsers(params);

      setUsers(data.content || []);
      setTotalPages(data.totalPages || 1);
      setTotalElements(data.totalElements || 0);
    } catch (error) {
      console.error("Lỗi khi kết nối lấy danh sách người dùng:", error);
    } finally {
      setLoading(false);
    }
  };

  // Kích hoạt gọi lại API mỗi khi một trong các điều kiện Lọc/Tìm kiếm/Chuyển trang thay đổi
  useEffect(() => {
    fetchUsers(currentPage);
  }, [search, roleFilter, statusFilter, currentPage]);

  // Xử lý khi người dùng thay đổi bộ lọc kiếm tìm -> Quay về trang đầu tiên tránh lỗi rỗng trang
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleRoleFilterChange = (value: string) => {
    setRoleFilter(value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  // Hàm xử lý Bật / Tắt trạng thái hoạt động của tài khoản
  const handleToggleStatus = async (id: number) => {
    try {
      await userAdminApi.toggleUserStatus(id);
      // Gọi lại danh sách để cập nhật trạng thái mới nhất trực tiếp từ DB
      fetchUsers(currentPage);
      if (selectedUser && selectedUser.id === id) {
        setSelectedUser({ ...selectedUser, status: !selectedUser.status });
      }
    } catch (error) {
      alert("Cập nhật trạng thái người dùng thất bại!");
    }
  };

  return (
      <div className="admin-page">
        <div className="admin-page__header">
          <div>
            <h2 className="admin-page__title">Quản lý người dùng</h2>
            <p className="admin-page__subtitle">Hiển thị danh sách và phân quyền thành viên hệ thống</p>
          </div>
        </div>

        {/* Thanh Strip hiển thị nhanh thống kê */}
        <div className="admin-summary-strip mb-4">
          <div className="admin-summary-strip__item">
            <i className="bi bi-people-fill text-primary me-2"></i>
            <span>Tổng số hiển thị: <strong>{users.length}</strong></span>
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
            <span>Quản trị viên: <strong>{adminCount}</strong></span>
          </div>
        </div>

        {/* Thanh công cụ Tìm kiếm và Lọc dữ liệu */}
        <UserFilterBar
            search={search}
            onSearchChange={handleSearchChange}
            roleFilter={roleFilter}
            onRoleFilterChange={handleRoleFilterChange}
            statusFilter={statusFilter}
            onStatusFilterChange={handleStatusFilterChange}
            totalCount={totalElements}
        />

        {/* Bảng danh sách người dùng kèm hiệu ứng tải */}
        {loading ? (
            <div className="text-center py-5 text-muted small">
              <div className="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
              Đang kết nối API xử lý dữ liệu...
            </div>
        ) : (
            <UserTable
                users={users}
                onToggleStatus={handleToggleStatus}
                onViewDetail={setSelectedUser}
            />
        )}

        {/* Bộ nút phân trang */}
        <AdminPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
        />

        {/* Modal xem chi tiết thông tin */}
        <UserDetailModal
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
            onToggleStatus={handleToggleStatus}
        />
      </div>
  );
};

export default AdminUserPage;