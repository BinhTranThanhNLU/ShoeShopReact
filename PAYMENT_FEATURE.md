# 💳 Chức Năng Thanh Toán (Payment Feature)

Hướng dẫn chi tiết về hệ thống thanh toán của Shoe Shop React.

## 📋 Nội Dung

- [Tổng Quan](#tổng-quan)
- [Kiến Trúc](#kiến-trúc)
- [Phương Thức Thanh Toán](#phương-thức-thanh-toán)
- [Hướng Dẫn Sử Dụng](#hướng-dẫn-sử-dụng)
- [API Endpoints](#api-endpoints)
- [Validation & Error Handling](#validation--error-handling)

## 🎯 Tổng Quan

Hệ thống thanh toán được thiết kế để hỗ trợ đầy đủ bao gồm:

- ✅ Thanh toán khi nhận hàng (COD)
- ✅ Chuyển khoản ngân hàng (Bank Transfer)
- ✅ Ví MoMo (MoMo E-Wallet)
- ✅ ZaloPay (Zalo E-Wallet)
- ✅ VNPay QR (VNPay Gateway)

## 🏗️ Kiến Trúc

### Tệp tin chính

```
src/
├── api/
│   ├── orderApi.ts                    # API endpoints cho đơn hàng
│   ├── axiosClient.ts                 # Axios client được cấu hình
│   └── cartApi.ts                     # API quản lý giỏ hàng
├── components/
│   └── CheckoutComponent/
│       ├── CheckoutForm.tsx           # Form thanh toán chính
│       ├── CheckoutSuccess.tsx        # Trang thành công
│       ├── OrderSummary.tsx           # Tóm tắt đơn hàng
│       ├── TermAndPrivacy.tsx         # Điều khoản và chính sách
│       └── paymentUtils.ts            # Utility functions cho thanh toán
├── modelRequest/
│   └── CheckoutRequest.ts             # Model request cho checkout
├── models/
│   ├── OrderModel.ts                  # Model đơn hàng
│   ├── PaymentModel.ts                # Model thanh toán
│   └── CartModel.ts                   # Model giỏ hàng
└── pages/
    ├── CheckoutPage.tsx               # Trang checkout
    └── App.tsx                        # Router chính
```

## 💰 Phương Thức Thanh Toán

### 1. Thanh Toán Khi Nhận Hàng (COD)
- **Tên:** `COD`
- **Mô tả:** Khách hàng thanh toán trực tiếp khi nhận hàng
- **Quy trình:**
  1. Tạo đơn hàng
  2. Từ chối thanh toán trực tuyến
  3. Gửi yêu cầu giao hàng

### 2. Chuyển Khoản Ngân Hàng
- **Tên:** `BANK_TRANSFER`
- **Mô tả:** Khách hàng chuyển khoản qua tài khoản ngân hàng
- **Thông tin ngân hàng:**
  - **Ngân hàng:** Vietcombank
  - **Số tài khoản:** 123456789
  - **Chủ tài khoản:** Nguyễn Văn A

### 3. MoMo E-Wallet
- **Tên:** `MOMO`
- **Mô tả:** Thanh toán thông qua ứng dụng MoMo
- **Quy trình:**
  1. Chọn MoMo là phương thức thanh toán
  2. Hệ thống tạo URL thanh toán
  3. Chuyển hướng đến MoMo
  4. Hoàn tất thanh toán trên MoMo
  5. Quay lại trang thành công

### 4. ZaloPay
- **Tên:** `ZALOPAY`
- **Mô tả:** Thanh toán thông qua ứng dụng ZaloPay
- **Quy trình:** Tương tự như MoMo

### 5. VNPay QR
- **Tên:** `VNPAY`
- **Mô tả:** Thanh toán thông qua mã QR hoặc ứng dụng ngân hàng
- **Quy trình:** Tương tự như MoMo

## 🚀 Hướng Dẫn Sử Dụng

### Luồng Checkout Cơ Bản

```
Giỏ Hàng → Thanh Toán → Điền Thông Tin → Chọn Phương Thức → Xác Nhận → Thanh Toán → Thành Công
```

### Bước 1: Điền Thông Tin Khách Hàng

```
Họ: Nguyễn
Tên: Văn A
Email: nguyen@email.com
Số điện thoại: 0987654321
```

### Bước 2: Điền Địa Chỉ Giao Hàng

```
Họ và tên: Nguyễn Văn A
Số điện thoại: 0987654321
Địa chỉ: 123 Lê Lợi
Phường: Phường 1
Quận: Quận 1
Tỉnh: TP. Hồ Chí Minh
```

### Bước 3: Chọn Phương Thức Thanh Toán

Chọn một trong 5 phương thức trên.

### Bước 4: Xác Nhận Điều Khoản

Đánh dấu checkbox xác nhận đồng ý với điều khoản.

### Bước 5: Nhấn Nút Thanh Toán

Hệ thống sẽ:
1. Xác thực dữ liệu
2. Tạo đơn hàng
3. Xử lý thanh toán
4. Chuyển hướng đến trang thành công

## 🔌 API Endpoints

### Tạo Đơn Hàng
```
POST /api/orders
Content-Type: application/json

{
  "firstName": "Nguyễn",
  "lastName": "Văn A",
  "email": "nguyen@email.com",
  "phone": "0987654321",
  "receiverName": "Nguyễn Văn A",
  "receiverPhone": "0987654321",
  "street": "123 Lê Lợi",
  "ward": "Phường 1",
  "district": "Quận 1",
  "province": "TP. Hồ Chí Minh",
  "country": "VN",
  "paymentMethod": "COD",
  "shippingMethodId": 1,
  "saveAddress": false,
  "useSameAddress": true
}
```

### Xử Lý COD
```
POST /api/orders/{orderId}/payment/cod
```

### Xử Lý MoMo
```
POST /api/orders/{orderId}/payment/momo

Response:
{
  "paymentUrl": "https://momo.vn/..."
}
```

### Xử Lý ZaloPay
```
POST /api/orders/{orderId}/payment/zalopay

Response:
{
  "paymentUrl": "https://zalopay.vn/..."
}
```

### Xử Lý VNPay
```
POST /api/orders/{orderId}/payment/vnpay

Response:
{
  "paymentUrl": "https://vnpay.vn/..."
}
```

### Lấy Chi Tiết Đơn Hàng
```
GET /api/orders/{orderId}

Response:
{
  "id": 1,
  "subPrice": 1000000,
  "discount": 0,
  "totalAmount": 1000000,
  "status": "PENDING",
  "paymentMethod": "COD",
  "shippingMethodName": "Standard",
  "shippingFee": 50000,
  "receiverName": "Nguyễn Văn A",
  "phone": "0987654321",
  "street": "123 Lê Lợi",
  "ward": "Phường 1",
  "district": "Quận 1",
  "province": "TP. Hồ Chí Minh"
}
```

## ✅ Validation & Error Handling

### Validation TypeScript

```typescript
interface CheckoutRequest {
  firstName: string;          // Bắt buộc, không trống
  lastName: string;           // Bắt buộc, không trống
  email: string;              // Bắt buộc, định dạng email hợp lệ
  phone: string;              // Bắt buộc, số điện thoại VN (10 chữ số)
  receiverName: string;       // Bắt buộc, không trống
  receiverPhone: string;      // Bắt buộc, số điện thoại VN
  street: string;             // Bắt buộc, không trống
  ward: string;               // Bắt buộc, không trống
  district: string;           // Bắt buộc, không trống
  province: string;           // Bắt buộc, không trống
  country: string;            // Bắt buộc, mã quốc gia
  paymentMethod: PaymentMethod; // Bắt buộc, một trong 5 phương thức
  shippingMethodId: number;   // Bắt buộc
}
```

### Validation Functions

```typescript
// Kiểm tra email
const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Kiểm tra số điện thoại Việt Nam
const isValidPhone = (phone: string): boolean => {
  return /^(\+84|0)[1-9]\d{8}$/.test(phone.replace(/\s/g, ""));
};
```

### Error Handling

Các lỗi có thể gặp:

1. **400 - Bad Request**: Dữ liệu không hợp lệ
2. **401 - Unauthorized**: Chưa đăng nhập
3. **402 - Payment Required**: Thanh toán không thành công
4. **404 - Not Found**: Đơn hàng không tồn tại
5. **500 - Server Error**: Lỗi server

## 🧪 Testing

### Test Case 1: COD
```
1. Điền thông tin
2. Chọn "Thanh toán khi nhận hàng"
3. Nhấn "Thanh toán"
4. Kiểm tra xem có chuyển đến trang thành công
```

### Test Case 2: MoMo
```
1. Điền thông tin
2. Chọn "Ví MoMo"
3. Nhấn "Thanh toán"
4. Kiểm tra xem có chuyển đến MoMo
```

### Test Case 3: Validation
```
1. Để trống email
2. Nhấn "Thanh toán"
3. Kiểm tra xem có hiển thị lỗi
```

## 📞 Hỗ Trợ

Nếu có vấn đề:
1. Kiểm tra console browser (F12)
2. Kiểm tra network tab
3. Xem logs từ backend
4. Liên hệ với nhóm dev

---

**Cập nhật lần cuối:** 2026-05-02
**Phiên bản:** v1.0.0

