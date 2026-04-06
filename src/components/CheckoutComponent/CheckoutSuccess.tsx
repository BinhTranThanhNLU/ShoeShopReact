import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-xl shadow-xl text-center">
        <h2 className="text-xl font-semibold mb-4">Thanh toán thành công 🎉</h2>
        <p className="mb-6">Cảm ơn bạn đã mua hàng!</p>
        <button
          onClick={() => navigate("/")}
          className="btn btn-dark btn-lg shadow-sm rounded-2"
        >
          Về trang chủ
        </button>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
