import type { UserModel } from "../../models/UserModel";

interface UserDetailModalProps {
  user: UserModel | null;
  onClose: () => void;
  onToggleStatus: (user: UserModel) => void;
}

const UserDetailModal = ({ user, onClose, onToggleStatus }: UserDetailModalProps) => {
  if (!user) return null;

  return (
      <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">

            <div className="modal-header bg-light">
              <h5 className="modal-title fw-bold">
                <i className="bi bi-person-badge-fill me-2 text-primary"></i>
                Chi tiết tài khoản #{user.id}
              </h5>
              <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
            </div>

            <div className="modal-body p-4">
              <div className="text-center mb-4">
                <div className="mx-auto bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm" style={{ width: "70px", height: "70px", fontSize: "28px" }}>
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
                <h4 className="mt-2 mb-1 fw-bold">{user.fullName}</h4>
                <span className={`badge ${user.role?.name === "ADMIN" ? "bg-danger" : "bg-info text-dark"}`}>
                Vai trò: {user.role?.name || "USER"}
              </span>
              </div>

              <div className="card bg-strict-light border-0 p-3 mb-3">
                <div className="row g-3">
                  <div className="col-12 border-bottom pb-2">
                    <span className="text-muted small d-block">Địa chỉ Email</span>
                    <strong className="text-dark">{user.email}</strong>
                  </div>
                  <div className="col-12 border-bottom pb-2">
                    <span className="text-muted small d-block">Số điện thoại</span>
                    <strong className="text-dark">{user.phone || "Chưa cập nhật"}</strong>
                  </div>
                  <div className="col-6">
                    <span className="text-muted small d-block">Trạng thái</span>
                    <span className={`admin-badge ${user.status ? "badge-success" : "badge-danger"} mt-1`}>
                    {user.status ? "Đang hoạt động" : "Đang bị khóa"}
                  </span>
                  </div>
                  <div className="col-6">
                    <span className="text-muted small d-block">Ngày tham gia</span>
                    <span className="text-dark small fw-semibold">
                    {user.createdAt ? new Date(user.createdAt).toLocaleString("vi-VN") : "---"}
                  </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer bg-light justify-content-between">
              <button
                  type="button"
                  className={`btn ${user.status ? "btn-danger" : "btn-success"}`}
                  onClick={() => onToggleStatus(user)}
              >
                <i className={`bi ${user.status ? "bi-lock-fill" : "bi-unlock-fill"} me-1`}></i>
                {user.status ? "Khóa tài khoản này" : "Mở khóa tài khoản"}
              </button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Đóng lại
              </button>
            </div>

          </div>
        </div>
      </div>
  );
};

export default UserDetailModal;