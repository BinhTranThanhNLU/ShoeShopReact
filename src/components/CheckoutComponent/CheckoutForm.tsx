import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { CheckoutRequest } from "../../modelRequest/CheckoutRequest";
import type { CartModel } from "../../models/CartModel";
import { cartApi } from "../../api/cartApi";
import { orderApi } from "../../api/orderApi";
import { emailRegex, phoneRegex } from "./paymentUtils";

interface FormData extends CheckoutRequest {
  shippingMethodId: number;
}

interface FormErrors {
  [key: string]: string;
}

const CheckoutForm = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [showPaymentDetails, setShowPaymentDetails] = useState<string>("COD");

  const [formData, setFormData] = useState<FormData>({
    firstName: "", lastName: "", email: "", phone: "",
    receiverName: "", receiverPhone: "", street: "", ward: "",
    district: "", province: "", country: "VN",
    saveAddress: false, useSameAddress: true,
    paymentMethod: "COD",
    shippingMethodId: 3, // Mặc định là 3[cite: 21]
  });

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartData = await cartApi.getMyCart();
        setCart(cartData);
        setFormData(prev => ({
          ...prev,
          shippingMethodId: cartData.shippingMethodId ?? 3 // Ưu tiên gán 3[cite: 21]
        }));
      } catch (error) {
        console.error("Failed to load cart:", error);
      }
    };
    loadCart();
  }, []);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "firstName":
      case "lastName":
        return value.trim() ? "" : "Trường này không được để trống";
      case "email":
        return value && emailRegex.test(value) ? "" : "Email không hợp lệ";
      case "phone":
        return value && phoneRegex.test(value) ? "" : "SĐT không hợp lệ";
      default:
        return "";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handlePaymentMethodChange = (method: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: method as any }));
    setShowPaymentDetails(method);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Vui lòng nhập họ";
    if (!formData.lastName.trim()) newErrors.lastName = "Vui lòng nhập tên";
    if (!formData.email || !emailRegex.test(formData.email)) newErrors.email = "Email không hợp lệ";
    if (!formData.phone.trim()) newErrors.phone = "SĐT không hợp lệ";
    if (!formData.receiverName.trim()) newErrors.receiverName = "Vui lòng nhập tên người nhận";
    if (!formData.street.trim()) newErrors.street = "Vui lòng nhập địa chỉ";
    if (!formData.province.trim()) newErrors.province = "Vui lòng nhập tỉnh/thành";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!cart || cart.items.length === 0) {
      alert("Giỏ hàng đang trống!");
      return;
    }

    setLoading(true);
    try {
      const subtotal = cart.totalPrice || 0;
      const shippingFee = cart.shippingCost || 0;
      const totalAmount = subtotal + shippingFee;

      const checkoutRequest = {
        nameCustomer: `${formData.firstName} ${formData.lastName}`,
        emailCustomer: formData.email,
        phoneCustomer: formData.phone,
        fullName: formData.receiverName,
        phone: formData.receiverPhone,
        street: formData.street,
        ward: formData.ward,
        district: formData.district,
        city: formData.province,
        paymentMethod: formData.paymentMethod,
        shippingMethodId: cart.shippingMethodId || 3, // Luôn ưu tiên 3[cite: 21]
        subtotal: subtotal,
        shippingFee: shippingFee,
        discount: 0,
        totalAmount: totalAmount,
        items: cart.items.map((item: any) => ({
          idVariant: item.variantId || item.id_variant,
          quantity: item.quantity,
          price: item.unitPrice
        }))
      };

      const order = await orderApi.createOrder(checkoutRequest as any);

      if (formData.paymentMethod === "VNPAY") {
        const response = await orderApi.processVNPayPayment(order.id);
        if (response?.paymentUrl) window.location.href = response.paymentUrl;
      } else {
        setSuccessMessage(`Đặt hàng thành công! Mã đơn: #${order.id}`);
        setTimeout(() => navigate(`/checkout/success/${order.id}`), 2000);
      }
    } catch (error: any) {
      setErrors({ submit: error.response?.data?.message || "Lỗi xử lý đơn hàng." });
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="checkout-container">
        {errors.submit && <div className="alert alert-danger">{errors.submit}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="checkout-section">
            <h3>1. Thông tin khách hàng</h3>
            <div className="row">
              <div className="col-md-6">
                <input type="text" name="firstName" className="form-control" placeholder="Họ" value={formData.firstName} onChange={handleInputChange} required />
              </div>
              <div className="col-md-6">
                <input type="text" name="lastName" className="form-control" placeholder="Tên" value={formData.lastName} onChange={handleInputChange} required />
              </div>
            </div>
            <input type="email" name="email" className="form-control mt-2" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
            <input type="tel" name="phone" className="form-control mt-2" placeholder="Số điện thoại" value={formData.phone} onChange={handleInputChange} required />
          </div>

          <div className="checkout-section mt-4">
            <h3>2. Địa chỉ giao hàng</h3>
            <input type="text" name="receiverName" className="form-control" placeholder="Tên người nhận" value={formData.receiverName} onChange={handleInputChange} required />
            <input type="tel" name="receiverPhone" className="form-control mt-2" placeholder="SĐT người nhận" value={formData.receiverPhone} onChange={handleInputChange} required />
            <input type="text" name="street" className="form-control mt-2" placeholder="Địa chỉ" value={formData.street} onChange={handleInputChange} required />
            <div className="row mt-2">
              <div className="col-md-4"><input type="text" name="ward" className="form-control" placeholder="Phường/Xã" value={formData.ward} onChange={handleInputChange} /></div>
              <div className="col-md-4"><input type="text" name="district" className="form-control" placeholder="Quận/Huyện" value={formData.district} onChange={handleInputChange} /></div>
              <div className="col-md-4"><input type="text" name="province" className="form-control" placeholder="Tỉnh/Thành phố" value={formData.province} onChange={handleInputChange} /></div>
            </div>
          </div>

          <div className="checkout-section mt-4">
            <h3>3. Phương thức thanh toán</h3>
            {["COD", "VNPAY", "BANK_TRANSFER"].map((method) => (
                <div key={method} className="d-flex align-items-center mb-2">
                  <input
                      type="radio"
                      name="paymentMethod"
                      id={method}
                      value={method}
                      checked={formData.paymentMethod === method}
                      onChange={() => handlePaymentMethodChange(method)} // Gọi hàm này[cite: 16]
                  />
                  <label htmlFor={method} className="ms-2">{method}</label>
                </div>
            ))}
          </div>

          <div className="mt-4">
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Đang xử lý..." : `Thanh toán ${((cart?.totalPrice || 0) + (cart?.shippingCost || 0)).toLocaleString()}₫`}
            </button>
          </div>
        </form>
      </div>
  );
};

export default CheckoutForm;