interface UserFilterBarProps {
  search: string;
  onSearchChange: (val: string) => void;
  roleFilter: string;
  onRoleFilterChange: (val: string) => void;
  statusFilter: string;
  onStatusFilterChange: (val: string) => void;
  totalCount: number;
}

const UserFilterBar = ({
  search,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  statusFilter,
  onStatusFilterChange,
  totalCount,
}: UserFilterBarProps) => {
  return (
    <div className="user-filter-bar">
      {/* Search */}
      <div className="user-filter-bar__search">
        <i className="bi bi-search user-filter-bar__search-icon"></i>
        <input
          type="text"
          className="user-filter-bar__input"
          placeholder="Tìm theo tên, email, số điện thoại..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {search && (
          <button
            className="user-filter-bar__clear"
            onClick={() => onSearchChange("")}
          >
            <i className="bi bi-x"></i>
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="user-filter-bar__filters">
        <select
          className="user-filter-bar__select"
          value={roleFilter}
          onChange={(e) => onRoleFilterChange(e.target.value)}
        >
          <option value="">Tất cả vai trò</option>
          <option value="ADMIN">Admin</option>
          <option value="USER">User</option>
        </select>

        <select
          className="user-filter-bar__select"
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="active">Hoạt động</option>
          <option value="inactive">Bị khoá</option>
        </select>
      </div>

      {/* Count */}
      <div className="user-filter-bar__count">
        <span className="text-muted small">
          <strong>{totalCount}</strong> người dùng
        </span>
      </div>
    </div>
  );
};

export default UserFilterBar;
