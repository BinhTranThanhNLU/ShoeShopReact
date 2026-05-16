import { useState, useMemo } from "react";

import { mockUsers } from "../mockData/userMockData";
import type { UserModel } from "../models/UserModel";
import AdminPagination from "../components/AdminUserComponent/AdminPagination";
import UserDetailModal from "../components/AdminUserComponent/UserDetailModal";
import UserFilterBar from "../components/AdminUserComponent/UserFilterBar";
import UserTable from "../components/AdminUserComponent/UserTable";

const PAGE_SIZE = 6;

const AdminUserPage = () => {
  const [users, setUsers] = useState<UserModel[]>(mockUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);

  // Filter logic
  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        !search ||
        u.fullName.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        (u.phone && u.phone.includes(search));

      const matchRole = !roleFilter || u.role?.name === roleFilter;

      const matchStatus =
        !statusFilter ||
        (statusFilter === "active" ? u.status : !u.status);

      return matchSearch && matchRole && matchStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const handleRoleFilterChange = (val: string) => {
    setRoleFilter(val);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (val: string) => {
    setStatusFilter(val);
    setCurrentPage(1);
  };

  const handleToggleStatus = (user: UserModel) => {
    // TODO: Gọi API thực tế để cập nhật trạng thái
    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id ? { ...u, status: !u.status } : u
      )
    );
  };

  // Summary counts
  const activeCount = users.filter((u) => u.status).length;
  const adminCount = users.filter((u) => u.role?.name === "ADMIN").length;

  return (
    <div className="admin-page">
      {/* Page Header */}
      <div className="admin-page__header">
        <div>
          <h2 className="admin-page__title">Quản lý người dùng</h2>
          <p className="admin-page__subtitle">
            Quản lý tài khoản và phân quyền người dùng trong hệ thống.
          </p>
        </div>
        <div className="admin-page__header-actions">
          {/* TODO: Thêm nút tạo user mới khi có API */}
          <button className="btn btn-primary btn-sm" disabled title="Sắp ra mắt">
            <i className="bi bi-person-plus-fill me-1"></i>
            Thêm người dùng
          </button>
        </div>
      </div>

      {/* Summary badges */}
      <div className="admin-summary-strip">
        <div className="admin-summary-strip__item">
          <i className="bi bi-people text-primary me-2"></i>
          <span>Tổng cộng: <strong>{users.length}</strong></span>
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
          <i className="bi bi-shield-fill-check text-danger me-2"></i>
          <span>Admin: <strong>{adminCount}</strong></span>
        </div>
      </div>

      {/* Filter Bar */}
      <UserFilterBar
        search={search}
        onSearchChange={handleSearchChange}
        roleFilter={roleFilter}
        onRoleFilterChange={handleRoleFilterChange}
        statusFilter={statusFilter}
        onStatusFilterChange={handleStatusFilterChange}
        totalCount={filtered.length}
      />

      {/* Table */}
      <UserTable
        users={paginated}
        onToggleStatus={handleToggleStatus}
        onViewDetail={setSelectedUser}
      />

      {/* Pagination */}
      <AdminPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Detail Modal */}
      <UserDetailModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </div>
  );
};

export default AdminUserPage;
