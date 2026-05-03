import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"processing" | "success" | "failed">("processing");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Chuyển đổi SearchParams thành Object để gửi cho Backend[cite: 13]
        const params = Object.fromEntries([...searchParams]);

        // Backend cần endpoint này để kiểm tra mã phản hồi và checksum[cite: 13]
        const response = await axiosClient.get("/api/orders/vnpay/callback", { params });

        if (params.vnp_ResponseCode === "00") {
          setStatus("success");
          // Chuyển về trang thành công sau 2 giây[cite: 13]
          setTimeout(() => navigate(`/checkout/success/${params.vnp_TxnRef}`), 2000);
        } else {
          setStatus("failed");
        }
      } catch (error) {
        console.error("Lỗi xác thực thanh toán:", error);
        setStatus("failed");
      }
    };
    verifyPayment();
  }, [searchParams, navigate]);

  return (
      <div className="container text-center py-5">
        <div className="card shadow p-4">
          {status === "processing" && (
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Đang xử lý...</span>
                <h4 className="mt-3">Đang xác nhận kết quả từ VNPay...</h4>
              </div>
          )}
          {status === "success" && (
              <div className="alert alert-success">
                <h4 className="alert-heading">Thanh toán thành công!</h4>
                <p>Đơn hàng của bạn đã được ghi nhận. Hệ thống đang chuyển hướng...</p>
              </div>
          )}
          {status === "failed" && (
              <div className="alert alert-danger">
                <h4 className="alert-heading">Thanh toán thất bại!</h4>
                <p>Đã có lỗi xảy ra hoặc giao dịch đã bị hủy.</p>
                <button className="btn btn-outline-danger mt-2" onClick={() => navigate("/checkout")}>Thử lại</button>
              </div>
          )}
        </div>
      </div>
  );
};

export default PaymentCallback;