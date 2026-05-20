import type { UserModel } from "../../models/UserModel";

interface UserTableProps {
  users: UserModel[];
  onToggleStatus: (user: UserModel) => void;
  onViewDetail: (user: UserModel) => void;
}

const UserTable = ({ users, onToggleStatus, onViewDetail }: UserTableProps) => {
  if (users.length === 0) {
    return (
        <div className="alert alert-info text-center my-3">
          Không tìm thấy người dùng nào khớp với điều kiện lọc.
        </div>
    );
  }

  return (
      <div className="admin-table-container mt-3">
        <div className="table-responsive">
          <table className="admin-table table table-hover align-middle">
            <thead>
            <tr>
              <th>ID</th>
              <th>Họ và tên</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Ngày tạo</th>
              <th className="text-end">Hành động</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => (
                <tr key={user.id}>
                  <td><strong>#{user.id}</strong></td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="admin-table__avatar me-2">
                        {user.fullName.charAt(0).toUpperCase()}
                      </div>
                      <span className="fw-semibold">{user.fullName}</span>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td><span className="text-muted">{user.phone || "Chưa cập nhật"}</span></td>
                  <td>
                  <span className={`badge ${user.role?.name === "ADMIN" ? "bg-danger" : "bg-info text-dark"}`}>
                    {user.role?.name || "USER"}
                  </span>
                  </td>
                  <td>
                  <span className={`admin-badge ${user.status ? "badge-success" : "badge-danger"}`}>
                    {user.status ? "Hoạt động" : "Bị khóa"}
                  </span>
                  </td>
                  <td>
                    <small className="text-muted">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString("vi-VN") : "---"}
                    </small>
                  </td>
                  <td className="text-end">
                    <div className="btn-group gap-1">
                      <button
                          className="btn btn-light btn-sm"
                          title="Xem chi tiết"
                          onClick={() => onViewDetail(user)}
                      >
                        <i className="bi bi-eye"></i>
                      </button>
                      <button
                          className={`btn btn-sm ${user.status ? "btn-outline-danger" : "btn-outline-success"}`}
                          title={user.status ? "Khóa tài khoản" : "Mở khóa tài khoản"}
                          onClick={() => onToggleStatus(user)}
                      >
                        <i className={`bi ${user.status ? "bi-lock-fill" : "bi-unlock-fill"}`}></i>
                      </button>
                    </div>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default UserTable;