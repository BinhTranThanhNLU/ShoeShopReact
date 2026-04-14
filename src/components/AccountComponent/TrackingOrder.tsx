import React from "react";
import type {TrackingOrderProps} from "../../types/AccountProps";

export const TrackingOrder:React.FC<TrackingOrderProps> = ({order}) => {
  return (
    <div className="collapse tracking-info" id={"tracking-" + order.id}>
      <div className="tracking-timeline">
        <div className="timeline-item completed">
          <div className="timeline-icon">
            <i className="bi bi-check-circle-fill"></i>
          </div>
          <div className="timeline-content">
            <h5>Đơn hàng đã được xác nhận</h5>
            <p>Đơn hàng của bạn đã được tiếp nhận và xác nhận thành công</p>
            <span className="timeline-date">20/02/2025 - 10:30 AM</span>
          </div>
        </div>

        <div className="timeline-item completed">
          <div className="timeline-icon">
            <i className="bi bi-check-circle-fill"></i>
          </div>
          <div className="timeline-content">
            <h5>Đang xử lý</h5>
            <p>Đơn hàng đang được chuẩn bị để giao</p>
            <span className="timeline-date">20/02/2025 - 2:45 PM</span>
          </div>
        </div>

        <div className="timeline-item active">
          <div className="timeline-icon">
            <i className="bi bi-box-seam"></i>
          </div>
          <div className="timeline-content">
            <h5>Đóng gói</h5>
            <p>Sản phẩm đang được đóng gói để giao</p>
            <span className="timeline-date">20/02/2025 - 4:15 PM</span>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-icon">
            <i className="bi bi-truck"></i>
          </div>
          <div className="timeline-content">
            <h5>Đang vận chuyển</h5>
            <p>Dự kiến giao cho đơn vị vận chuyển trong vòng 24 giờ</p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-icon">
            <i className="bi bi-house-door"></i>
          </div>
          <div className="timeline-content">
            <h5>Giao hàng</h5>
            <p>Dự kiến giao: 22/02/2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};
