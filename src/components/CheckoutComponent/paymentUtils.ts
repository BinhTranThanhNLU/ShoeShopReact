// Email regex pattern for validation
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone regex pattern for validation (Vietnamese phone numbers)
export const phoneRegex = /^(\+84|0)[1-9]\d{8}$/;

// Payment utility functions for different payment methods
export const paymentUtils = {
  emailRegex,
  phoneRegex,

  // Format currency
  formatCurrency: (amount: number, currency: string = "VND"): string => {
    if (currency === "VND") {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(amount);
    }
    return `$${amount.toFixed(2)}`;
  },

  // Validate email
  isValidEmail: (email: string): boolean => {
    return emailRegex.test(email);
  },

  // Validate phone
  isValidPhone: (phone: string): boolean => {
    return phoneRegex.test(phone.replace(/\s/g, ""));
  },

  // Validate payment method
  isValidPaymentMethod: (method: string): boolean => {
    const validMethods = ["COD", "BANK_TRANSFER", "MOMO", "ZALOPAY", "VNPAY"];
    return validMethods.includes(method);
  },

  // Get payment method display name
  getPaymentMethodName: (method: string): string => {
    const methodNames: Record<string, string> = {
      COD: "Thanh toán khi nhận hàng",
      BANK_TRANSFER: "Chuyển khoản ngân hàng",
      MOMO: "Ví MoMo",
      ZALOPAY: "ZaloPay",
      VNPAY: "VNPay QR",
    };
    return methodNames[method] || method;
  },

  // Get payment method icon
  getPaymentMethodIcon: (method: string): string => {
    const icons: Record<string, string> = {
      COD: "bi-truck",
      BANK_TRANSFER: "bi-bank",
      MOMO: "bi-phone",
      ZALOPAY: "bi-chat-dots",
      VNPAY: "bi-qr-code",
    };
    return icons[method] || "bi-credit-card";
  },

  // Validate checkout data
  validateCheckoutData: (data: Record<string, unknown>): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    // Customer info validation
    if (!data.firstName || typeof data.firstName !== "string" || data.firstName.trim() === "") {
      errors.push("Vui lòng nhập họ");
    }
    if (!data.lastName || typeof data.lastName !== "string" || data.lastName.trim() === "") {
      errors.push("Vui lòng nhập tên");
    }
    if (!data.email || typeof data.email !== "string" || !emailRegex.test(data.email)) {
      errors.push("Vui lòng nhập email hợp lệ");
    }
    if (!data.phone || typeof data.phone !== "string" || !phoneRegex.test((data.phone as string).replace(/\s/g, ""))) {
      errors.push("Vui lòng nhập số điện thoại hợp lệ");
    }

    // Shipping address validation
    if (!data.receiverName || typeof data.receiverName !== "string" || data.receiverName.trim() === "") {
      errors.push("Vui lòng nhập họ và tên người nhận");
    }
    if (!data.receiverPhone || typeof data.receiverPhone !== "string" || !phoneRegex.test((data.receiverPhone as string).replace(/\s/g, ""))) {
      errors.push("Vui lòng nhập số điện thoại người nhận hợp lệ");
    }
    if (!data.street || typeof data.street !== "string" || data.street.trim() === "") {
      errors.push("Vui lòng nhập địa chỉ");
    }
    if (!data.ward || typeof data.ward !== "string" || data.ward.trim() === "") {
      errors.push("Vui lòng nhập phường/xã");
    }
    if (!data.district || typeof data.district !== "string" || data.district.trim() === "") {
      errors.push("Vui lòng nhập quận/huyện");
    }
    if (!data.province || typeof data.province !== "string" || data.province.trim() === "") {
      errors.push("Vui lòng nhập tỉnh/thành phố");
    }

    // Payment method validation
    if (!data.paymentMethod || !paymentUtils.isValidPaymentMethod(data.paymentMethod as string)) {
      errors.push("Vui lòng chọn phương thức thanh toán");
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },
};


