import type { UserModel } from "../../models/UserModel";

interface UserTableProps {
  users: UserModel[];
  onToggleStatus: (user: UserModel) => void;
  onViewDetail: (user: UserModel) => void;
}

const UserTable = ({ users, onToggleStatus, onViewDetail }: UserTableProps) => {
  return (
    <div className="dashboard-card">
      <div className="dashboard-card__body p-0">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Người dùng</th>
                <th>Số điện thoại</th>
                <th>Vai trò</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-5 text-muted">
                    <i className="bi bi-inbox fs-2 d-block mb-2"></i>
                    Không tìm thấy người dùng nào
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td className="text-muted small">{user.id}</td>
                    <td>
                      <div className="admin-table__user">
                        <div className="admin-table__avatar admin-table__avatar--lg">
                          {user.avatar ? (
                            <img src={user.avatar} alt={user.fullName} />
                          ) : (
                            user.fullName.charAt(0).toUpperCase()
                          )}
                        </div>
                        <div>
                          <p className="admin-table__user-name">{user.fullName}</p>
                          <small className="text-muted">{user.email}</small>
                        </div>
                      </div>
                    </td>
                    <td className="text-muted">{user.phone || "—"}</td>
                    <td>
                      <span
                        className={`admin-badge ${
                          user.role?.name === "ADMIN"
                            ? "badge-danger"
                            : "badge-info"
                        }`}
                      >
                        <i
                          className={`bi ${
                            user.role?.name === "ADMIN"
                              ? "bi-shield-fill-check"
                              : "bi-person-fill"
                          } me-1`}
                        ></i>
                        {user.role?.name ?? "USER"}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`admin-badge ${
                          user.status ? "badge-success" : "badge-secondary"
                        }`}
                      >
                        <span
                          className={`admin-badge__dot ${
                            user.status ? "dot--green" : "dot--gray"
                          }`}
                        ></span>
                        {user.status ? "Hoạt động" : "Bị khoá"}
                      </span>
                    </td>
                    <td className="text-muted small">
                      {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                    </td>
                    <td>
                      <div className="admin-table__actions">
                        <button
                          className="admin-table__action-btn admin-table__action-btn--view"
                          onClick={() => onViewDetail(user)}
                          title="Xem chi tiết"
                        >
                          <i className="bi bi-eye"></i>
                        </button>
                        <button
                          className={`admin-table__action-btn ${
                            user.status
                              ? "admin-table__action-btn--danger"
                              : "admin-table__action-btn--success"
                          }`}
                          onClick={() => onToggleStatus(user)}
                          title={user.status ? "Khoá tài khoản" : "Mở khoá"}
                        >
                          <i
                            className={`bi ${
                              user.status ? "bi-lock" : "bi-unlock"
                            }`}
                          ></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
