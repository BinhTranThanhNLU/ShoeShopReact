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
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    receiverName: "",
    receiverPhone: "",
    street: "",
    ward: "",
    district: "",
    province: "",
    country: "VN",
    saveAddress: false,
    useSameAddress: true,
    paymentMethod: "COD",
    shippingMethodId: cart?.shippingMethodId || 1,
  });

  // Load cart on component mount
  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartData = await cartApi.getMyCart();
        setCart(cartData);
      } catch (error) {
        console.error("Failed to load cart:", error);
      }
    };

    loadCart();
  }, []);

  // Validate individual field
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "firstName":
      case "lastName":
        return value.trim() ? "" : `Vui lòng nhập ${name === "firstName" ? "họ" : "tên"}`;
      case "email":
        return value && emailRegex.test(value) ? "" : "Email không hợp lệ";
      case "phone":
      case "receiverPhone":
        return value && phoneRegex.test(value.replace(/\s/g, ""))
          ? ""
          : "Số điện thoại không hợp lệ";
      case "receiverName":
      case "street":
      case "ward":
      case "district":
      case "province":
        return value.trim() ? "" : `Vui lòng nhập đầy đủ thông tin ${name}`;
      default:
        return "";
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.currentTarget;
    const finalValue = type === "checkbox" ? (e.currentTarget as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));

    // Clear error for this field if it's valid
    if (errors[name]) {
      const error = validateField(name, value as string);
      if (!error) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  };

  const handlePaymentMethodChange = (method: string) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethod: method as CheckoutRequest["paymentMethod"],
    }));
    setShowPaymentDetails(method);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate required fields
    if (!formData.firstName.trim()) newErrors.firstName = "Vui lòng nhập họ";
    if (!formData.lastName.trim()) newErrors.lastName = "Vui lòng nhập tên";
    if (!formData.email || !emailRegex.test(formData.email))
      newErrors.email = "Email không hợp lệ";
    if (!formData.phone || !phoneRegex.test(formData.phone.replace(/\s/g, "")))
      newErrors.phone = "Số điện thoại không hợp lệ";

    // Validate shipping address
    if (!formData.receiverName.trim()) newErrors.receiverName = "Vui lòng nhập họ và tên người nhận";
    if (!formData.receiverPhone || !phoneRegex.test(formData.receiverPhone.replace(/\s/g, "")))
      newErrors.receiverPhone = "Số điện thoại người nhận không hợp lệ";
    if (!formData.street.trim()) newErrors.street = "Vui lòng nhập địa chỉ";
    if (!formData.ward.trim()) newErrors.ward = "Vui lòng nhập phường/xã";
    if (!formData.district.trim()) newErrors.district = "Vui lòng nhập quận/huyện";
    if (!formData.province.trim()) newErrors.province = "Vui lòng nhập tỉnh/thành phố";

    // Validate payment method
    if (!formData.paymentMethod) newErrors.paymentMethod = "Vui lòng chọn phương thức thanh toán";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

// Cập nhật hàm handleSubmit bên trong CheckoutForm.tsx
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      setSuccessMessage("");
      return;
    }

    // Kiểm tra giỏ hàng tại Frontend trước khi gửi
    if (!cart || !cart.items || cart.items.length === 0) {
      alert("Giỏ hàng của bạn đang trống!");
      navigate("/cart");
      return;
    }

    setLoading(true);
    try {
      // CHỈNH SỬA: Map dữ liệu form sang CheckoutRequest của Backend[cite: 15, 18]
      const checkoutRequest = {
        // Thông tin khách hàng (phải map đúng tên biến trong CheckoutRequest.java)
        nameCustomer: `${formData.firstName} ${formData.lastName}`,
        emailCustomer: formData.email,
        phoneCustomer: formData.phone,

        // Địa chỉ nhận hàng
        fullName: formData.receiverName,
        phone: formData.receiverPhone,
        street: formData.street,
        ward: formData.ward,
        district: formData.district,
        city: formData.province, // Backend dùng 'city', Form dùng 'province'

        paymentMethod: formData.paymentMethod,
        shippingMethodId: cart.shippingMethodId || 1, // Lấy từ giỏ hàng hiện tại[cite: 13, 17]

        // Các trường số học (Đảm bảo gửi đúng kiểu Number để Jackson map vào BigDecimal)[cite: 15]
        subtotal: cart.totalPrice,
        shippingFee: cart.shippingCost || 0,
        discount: 0,
        totalAmount: cart.totalPrice + (cart.shippingCost || 0),

        // QUAN TRỌNG: Gửi danh sách items để tránh lỗi "Cart is empty" ở Backend
        items: cart.items.map((item: any) => ({
          idVariant: item.variantId || item.id_variant, // Phải khớp với CheckoutItemDTO[cite: 18]
          quantity: item.quantity,
          price: item.unitPrice
        }))
      };

      // Gọi API với đối tượng đã map[cite: 14]
      const order = await orderApi.createOrder(checkoutRequest as any);

      // Xử lý chuyển hướng sau khi đặt hàng thành công[cite: 22]
      if (formData.paymentMethod === "COD" || formData.paymentMethod === "BANK_TRANSFER") {
        setSuccessMessage(`Đặt hàng thành công! Mã đơn: #${order.id}`);
        setTimeout(() => navigate(`/checkout/success/${order.id}`), 2000);
      } else {
        // Các phương thức thanh toán điện tử[cite: 14, 22]
        const paymentResponse = await (formData.paymentMethod === "VNPAY"
            ? orderApi.processVNPayPayment(order.id)
            : formData.paymentMethod === "MOMO"
                ? orderApi.processMoMoPayment(order.id)
                : orderApi.processZaloPayPayment(order.id));

        window.location.href = paymentResponse.paymentUrl;
      }
    } catch (error: any) {
      console.error("Lỗi đặt hàng:", error);
      setErrors({ submit: error.response?.data?.message || "Lỗi khi tạo đơn hàng." });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="checkout-container" data-aos="fade-up">
      {/* Error Messages */}
      {errors.submit && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {errors.submit}
          <button
            type="button"
            className="btn-close"
            onClick={() => setErrors((prev) => ({ ...prev, submit: "" }))}
          ></button>
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {successMessage}
        </div>
      )}

      <form className="checkout-form" onSubmit={handleSubmit}>
        {/* Customer Information */}
        <div className="checkout-section" id="customer-info">
          <div className="section-header">
            <div className="section-number">1</div>
            <h3>Thông tin khách hàng</h3>
          </div>
          <div className="section-content">
            <div className="row">
              <div className="col-md-6 form-group">
                <label htmlFor="firstName">Họ</label>
                <input
                  type="text"
                  name="firstName"
                  className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                  id="firstName"
                  placeholder="Nhập họ của bạn"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
                {errors.firstName && <div className="invalid-feedback d-block">{errors.firstName}</div>}
              </div>
              <div className="col-md-6 form-group">
                <label htmlFor="lastName">Tên</label>
                <input
                  type="text"
                  name="lastName"
                  className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                  id="lastName"
                  placeholder="Nhập tên của bạn"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
                {errors.lastName && <div className="invalid-feedback d-block">{errors.lastName}</div>}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                name="email"
                id="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Số điện thoại</label>
              <input
                type="tel"
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                name="phone"
                id="phone"
                placeholder="0987654321"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              {errors.phone && <div className="invalid-feedback d-block">{errors.phone}</div>}
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="checkout-section" id="shipping-address">
          <div className="section-header">
            <div className="section-number">2</div>
            <h3>Địa chỉ giao hàng</h3>
          </div>
          <div className="section-content">
            <div className="form-group">
              <label htmlFor="receiverName">Họ và tên người nhận</label>
              <input
                type="text"
                className={`form-control ${errors.receiverName ? "is-invalid" : ""}`}
                name="receiverName"
                id="receiverName"
                placeholder="Nhập họ và tên"
                value={formData.receiverName}
                onChange={handleInputChange}
                required
              />
              {errors.receiverName && <div className="invalid-feedback d-block">{errors.receiverName}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="receiverPhone">Số điện thoại</label>
              <input
                type="tel"
                className={`form-control ${errors.receiverPhone ? "is-invalid" : ""}`}
                name="receiverPhone"
                id="receiverPhone"
                placeholder="0987654321"
                value={formData.receiverPhone}
                onChange={handleInputChange}
                required
              />
              {errors.receiverPhone && <div className="invalid-feedback d-block">{errors.receiverPhone}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="street">Địa chỉ (Số nhà, tên đường)</label>
              <input
                type="text"
                className={`form-control ${errors.street ? "is-invalid" : ""}`}
                name="street"
                id="street"
                placeholder="Ví dụ: 123 Lê Lợi"
                value={formData.street}
                onChange={handleInputChange}
                required
              />
              {errors.street && <div className="invalid-feedback d-block">{errors.street}</div>}
            </div>
            <div className="row">
              <div className="col-md-4 form-group">
                <label htmlFor="ward">Phường/Xã</label>
                <input
                  type="text"
                  name="ward"
                  className={`form-control ${errors.ward ? "is-invalid" : ""}`}
                  id="ward"
                  placeholder="Phường/Xã"
                  value={formData.ward}
                  onChange={handleInputChange}
                  required
                />
                {errors.ward && <div className="invalid-feedback d-block">{errors.ward}</div>}
              </div>
              <div className="col-md-4 form-group">
                <label htmlFor="district">Quận/Huyện</label>
                <input
                  type="text"
                  name="district"
                  className={`form-control ${errors.district ? "is-invalid" : ""}`}
                  id="district"
                  placeholder="Quận/Huyện"
                  value={formData.district}
                  onChange={handleInputChange}
                  required
                />
                {errors.district && <div className="invalid-feedback d-block">{errors.district}</div>}
              </div>
              <div className="col-md-4 form-group">
                <label htmlFor="province">Tỉnh/Thành phố</label>
                <input
                  type="text"
                  name="province"
                  className={`form-control ${errors.province ? "is-invalid" : ""}`}
                  id="province"
                  placeholder="Tỉnh/Thành phố"
                  value={formData.province}
                  onChange={handleInputChange}
                  required
                />
                {errors.province && <div className="invalid-feedback d-block">{errors.province}</div>}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="country">Quốc gia</label>
              <select
                className="form-select"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              >
                <option value="VN">Việt Nam</option>
                <option value="US">Hoa Kỳ</option>
                <option value="CA">Canada</option>
                <option value="UK">Vương Quốc Anh</option>
                <option value="AU">Úc</option>
                <option value="DE">Đức</option>
                <option value="FR">Pháp</option>
              </select>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="saveAddress"
                name="saveAddress"
                checked={formData.saveAddress}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="saveAddress">
                Lưu địa chỉ này cho lần đặt hàng sau
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="useSameAddress"
                name="useSameAddress"
                checked={formData.useSameAddress}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="useSameAddress">
                Sử dụng địa chỉ này cho thanh toán
              </label>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="checkout-section" id="payment-method">
          <div className="section-header">
            <div className="section-number">3</div>
            <h3>Phương thức thanh toán</h3>
          </div>
          <div className="section-content">
            <div className="payment-options">
              {/* COD */}
              <div className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  id="cod"
                  value="COD"
                  checked={formData.paymentMethod === "COD"}
                  onChange={() => handlePaymentMethodChange("COD")}
                />
                <label htmlFor="cod">
                  <span className="payment-icon">
                    <i className="bi bi-truck"></i>
                  </span>
                  <span className="payment-label">Thanh toán khi nhận hàng (COD)</span>
                </label>
              </div>

              {/* Bank transfer */}
              <div className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  id="bank-transfer"
                  value="BANK_TRANSFER"
                  checked={formData.paymentMethod === "BANK_TRANSFER"}
                  onChange={() => handlePaymentMethodChange("BANK_TRANSFER")}
                />
                <label htmlFor="bank-transfer">
                  <span className="payment-icon">
                    <i className="bi bi-bank"></i>
                  </span>
                  <span className="payment-label">Chuyển khoản ngân hàng</span>
                </label>
              </div>

              {/* Momo */}
              <div className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  id="momo"
                  value="MOMO"
                  checked={formData.paymentMethod === "MOMO"}
                  onChange={() => handlePaymentMethodChange("MOMO")}
                />
                <label htmlFor="momo">
                  <span className="payment-icon">
                    <i className="bi bi-phone"></i>
                  </span>
                  <span className="payment-label">Ví MoMo</span>
                </label>
              </div>

              {/* ZaloPay */}
              <div className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  id="zalopay"
                  value="ZALOPAY"
                  checked={formData.paymentMethod === "ZALOPAY"}
                  onChange={() => handlePaymentMethodChange("ZALOPAY")}
                />
                <label htmlFor="zalopay">
                  <span className="payment-icon">
                    <i className="bi bi-chat-dots"></i>
                  </span>
                  <span className="payment-label">ZaloPay</span>
                </label>
              </div>

              {/* VNPay */}
              <div className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  id="vnpay"
                  value="VNPAY"
                  checked={formData.paymentMethod === "VNPAY"}
                  onChange={() => handlePaymentMethodChange("VNPAY")}
                />
                <label htmlFor="vnpay">
                  <span className="payment-icon">
                    <i className="bi bi-qr-code"></i>
                  </span>
                  <span className="payment-label">VNPay QR</span>
                </label>
              </div>
            </div>

            {/* Payment Details */}
            {showPaymentDetails === "COD" && (
              <div className="alert alert-info mt-3">
                <p className="payment-info mb-0">
                  Bạn sẽ thanh toán trực tiếp cho nhân viên giao hàng khi nhận hàng.
                </p>
              </div>
            )}

            {showPaymentDetails === "BANK_TRANSFER" && (
              <div className="alert alert-info mt-3">
                <p className="payment-info mb-0">
                  Vui lòng chuyển khoản đến tài khoản sau:
                  <br />
                  <strong>Ngân hàng:</strong> Vietcombank
                  <br />
                  <strong>Số tài khoản:</strong> 123456789
                  <br />
                  <strong>Chủ tài khoản:</strong> Nguyễn Văn A
                  <br />
                  <em>Nội dung: Thanh toán đơn hàng</em>
                </p>
              </div>
            )}

            {showPaymentDetails === "MOMO" && (
              <div className="alert alert-info mt-3">
                <p className="payment-info mb-0">Bạn sẽ được chuyển hướng sang ứng dụng MoMo để hoàn tất thanh toán.</p>
              </div>
            )}

            {showPaymentDetails === "ZALOPAY" && (
              <div className="alert alert-info mt-3">
                <p className="payment-info mb-0">Bạn sẽ được chuyển hướng sang ứng dụng ZaloPay để hoàn tất thanh toán.</p>
              </div>
            )}

            {showPaymentDetails === "VNPAY" && (
              <div className="alert alert-info mt-3">
                <p className="payment-info mb-0">
                  Quét mã QR bằng ứng dụng ngân hàng hoặc ví điện tử để thanh toán qua VNPay.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Order Review */}
        <div className="checkout-section" id="order-review">
          <div className="section-header">
            <div className="section-number">4</div>
            <h3>Đánh giá &amp; Đặt hàng</h3>
          </div>
          <div className="section-content">
            {cart && (
              <div className="order-summary-inline mb-3">
                <p>
                  <strong>Tạm tính:</strong> {cart.totalPrice.toFixed(2)}₫
                </p>
                <p>
                  <strong>Phí vận chuyển:</strong> {(cart.shippingCost || 0).toFixed(2)}₫
                </p>
                <p className="mb-0">
                  <strong>Tổng cộng:</strong>{" "}
                  <span className="text-primary fs-5">
                    {(cart.totalPrice + (cart.shippingCost || 0)).toFixed(2)}₫
                  </span>
                </p>
              </div>
            )}

            <div className="form-check terms-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="terms"
                name="terms"
                required
              />
              <label className="form-check-label" htmlFor="terms">
                Tôi đồng ý với{" "}
                <a href="#" data-bs-toggle="modal" data-bs-target="#termsModal">
                  Điều khoản và Điều kiện
                </a>{" "}
                và{" "}
                <a href="#" data-bs-toggle="modal" data-bs-target="#privacyModal">
                  Chính sách Bảo mật
                </a>
              </label>
            </div>

            <div className="place-order-container mt-3">
              <button
                type="submit"
                className="btn btn-primary place-order-btn"
                disabled={loading}
              >
                <span className="btn-text">
                  {loading ? "Đang xử lý..." : "Thanh toán"}
                </span>
                {cart && (
                  <span className="btn-price">
                    {(cart.totalPrice + (cart.shippingCost || 0)).toFixed(2)}₫
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;