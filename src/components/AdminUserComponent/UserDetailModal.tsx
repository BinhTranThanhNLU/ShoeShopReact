import type { UserModel } from "../../models/UserModel";

interface UserDetailModalProps {
  user: UserModel | null;
  onClose: () => void;
}

const UserDetailModal = ({ user, onClose }: UserDetailModalProps) => {
  if (!user) return null;

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal__header">
          <h5 className="admin-modal__title">Chi tiết người dùng</h5>
          <button className="admin-modal__close" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="admin-modal__body">
          {/* Avatar + Name */}
          <div className="admin-modal__user-hero">
            <div className="admin-modal__avatar">
              {user.avatar ? (
                <img src={user.avatar} alt={user.fullName} />
              ) : (
                <span>{user.fullName.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <div>
              <h4 className="admin-modal__user-name">{user.fullName}</h4>
              <span
                className={`admin-badge ${
                  user.role?.name === "ADMIN" ? "badge-danger" : "badge-info"
                }`}
              >
                {user.role?.name ?? "USER"}
              </span>
              <span
                className={`admin-badge ms-2 ${
                  user.status ? "badge-success" : "badge-secondary"
                }`}
              >
                {user.status ? "Hoạt động" : "Bị khoá"}
              </span>
            </div>
          </div>

          {/* Info grid */}
          <div className="admin-modal__info-grid">
            <div className="admin-modal__info-item">
              <span className="admin-modal__info-label">
                <i className="bi bi-envelope me-1"></i> Email
              </span>
              <span className="admin-modal__info-value">{user.email}</span>
            </div>
            <div className="admin-modal__info-item">
              <span className="admin-modal__info-label">
                <i className="bi bi-telephone me-1"></i> Số điện thoại
              </span>
              <span className="admin-modal__info-value">{user.phone || "Chưa cập nhật"}</span>
            </div>
            <div className="admin-modal__info-item">
              <span className="admin-modal__info-label">
                <i className="bi bi-calendar3 me-1"></i> Ngày tạo
              </span>
              <span className="admin-modal__info-value">
                {new Date(user.createdAt).toLocaleString("vi-VN")}
              </span>
            </div>
            <div className="admin-modal__info-item">
              <span className="admin-modal__info-label">
                <i className="bi bi-clock-history me-1"></i> Cập nhật lần cuối
              </span>
              <span className="admin-modal__info-value">
                {new Date(user.updatedAt).toLocaleString("vi-VN")}
              </span>
            </div>
          </div>
        </div>

        <div className="admin-modal__footer">
          <button className="btn btn-outline-secondary" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
