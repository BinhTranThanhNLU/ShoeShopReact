# 🛠️ Hướng Dẫn Tích Hợp Thanh Toán

## Nhanh Chóng Bắt Đầu

### 1. Backend Requirements

Các endpoint backend cần thiết:

```
POST   /api/orders
GET    /api/orders/my-orders
GET    /api/orders/{orderId}
POST   /api/orders/{orderId}/payment/cod
POST   /api/orders/{orderId}/payment/bank-transfer
POST   /api/orders/{orderId}/payment/momo
POST   /api/orders/{orderId}/payment/zalopay
POST   /api/orders/{orderId}/payment/vnpay
POST   /api/orders/{orderId}/payment/callback
PUT    /api/orders/{orderId}/cancel
GET    /cart
PUT    /cart/shipping
GET    /cart/shipping-methods
```

### 2. Database Schema (Ví Dụ)

```sql
-- Orders Table
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  subtotal DECIMAL(10,2),
  discount DECIMAL(10,2),
  total_amount DECIMAL(10,2),
  status VARCHAR(50),
  payment_method VARCHAR(50),
  shipping_fee DECIMAL(10,2),
  receiver_name VARCHAR(255),
  receiver_phone VARCHAR(20),
  street VARCHAR(255),
  ward VARCHAR(100),
  district VARCHAR(100),
  province VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Order Items Table
CREATE TABLE order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  variant_id INT,
  quantity INT,
  unit_price DECIMAL(10,2),
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- Payments Table
CREATE TABLE payments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  method VARCHAR(50),
  status VARCHAR(50),
  amount DECIMAL(10,2),
  transaction_id VARCHAR(255),
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id)
);
```

### 3. Environment Variables

Thêm vào `.env`:

```env
VITE_API_URL=http://localhost:8080/api
VITE_MOMO_API_KEY=your_momo_api_key
VITE_ZALOPAY_API_KEY=your_zalopay_api_key
VITE_VNPAY_API_KEY=your_vnpay_api_key
```

### 4. Test Locally

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Truy cập tại
http://localhost:5173/checkout
```

## 📚 File Structure Reference

```
ShoeShopReact/
├── src/
│   ├── api/
│   │   ├── orderApi.ts              ✅ Tạo/quản lý đơn hàng
│   │   ├── cartApi.ts               ✅ Quản lý giỏ hàng
│   │   └── axiosClient.ts           ✅ HTTP client
│   │
│   ├── components/
│   │   └── CheckoutComponent/
│   │       ├── CheckoutForm.tsx            ✅ Form chính
│   │       ├── CheckoutSuccess.tsx        ✅ Trang thành công
│   │       ├── OrderSummary.tsx           ✅ Tóm tắt đơn hàng
│   │       ├── TermAndPrivacy.tsx         ✅ T&C modal
│   │       └── paymentUtils.ts            ✅ Utility functions
│   │
│   ├── models/
│   │   ├── OrderModel.ts            ✅ Order interface
│   │   ├── PaymentModel.ts          ✅ Payment interface
│   │   ├── CartModel.ts             ✅ Cart interface
│   │   └── CartItemModel.ts         ✅ Cart item interface
│   │
│   ├── modelRequest/
│   │   └── CheckoutRequest.ts       ✅ Checkout request interface
│   │
│   ├── pages/
│   │   ├── CheckoutPage.tsx         ✅ Trang checkout
│   │   └── App.tsx                  ✅ Router chính
```

## 🔧 Customization

### Thay Đổi Ngân Hàng Mặc Định

Sửa trong `CheckoutForm.tsx`:

```typescript
// Dòng ~360
{showPaymentDetails === "BANK_TRANSFER" && (
  <div className="alert alert-info mt-3">
    <p className="payment-info mb-0">
      Vui lòng chuyển khoản đến tài khoản sau:
      <br />
      <strong>Ngân hàng:</strong> VietinBank  {/* ← Thay đổi */}
      <br />
      <strong>Số tài khoản:</strong> 987654321  {/* ← Thay đổi */}
      <br />
      <strong>Chủ tài khoản:</strong> Trần Thị B  {/* ← Thay đổi */}
    </p>
  </div>
)}
```

### Thêm Phương Thức Thanh Toán Mới

1. Thêm vào `CheckoutRequest.ts`:
```typescript
paymentMethod: "COD" | "BANK_TRANSFER" | "MOMO" | "ZALOPAY" | "VNPAY" | "NEW_METHOD";
```

2. Thêm vào `CheckoutForm.tsx`:
```typescript
case "NEW_METHOD": {
  const response = await orderApi.processNewMethod(order.id);
  window.location.href = response.paymentUrl;
  break;
}
```

3. Thêm vào `orderApi.ts`:
```typescript
processNewMethod: async (orderId: number): Promise<{ paymentUrl: string }> => {
  const response = await axiosClient.post(`/orders/${orderId}/payment/new-method`);
  return response.data;
},
```

## 🧪 Test Cases

### TC1: Checkout with COD
- [ ] Điền đầy đủ thông tin
- [ ] Chọn COD
- [ ] Nhấn Thanh toán
- [ ] Verify có chuyển đến success page
- [ ] Check database có record mới

### TC2: Checkout with MoMo
- [ ] Điền đầy đủ thông tin
- [ ] Chọn MoMo
- [ ] Nhấn Thanh toán
- [ ] Verify chuyển đến MoMo payment
- [ ] Complete payment
- [ ] Verify redirect về success page

### TC3: Validation Tests
- [ ] Để trống email → Show error
- [ ] Nhập email sai format → Show error
- [ ] Nhập phone sai format → Show error
- [ ] Để trống required fields → Show error

### TC4: Order Status
- [ ] Verify order status sau tạo là "PENDING"
- [ ] Verify payment status tương ứng
- [ ] Verify order details page loads correctly

## 📞 Troubleshooting

### Lỗi: "Cart is empty"
- **Nguyên nhân:** Giỏ hàng trống
- **Giải pháp:** Thêm sản phẩm vào giỏ trước

### Lỗi: "Invalid payment method"
- **Nguyên nhân:** Payment method không được support
- **Giải pháp:** Kiểm tra enum CheckoutRequest

### Lỗi: "Payment redirect failed"
- **Nguyên nhân:** Backend không trả paymentUrl
- **Giải pháp:** Kiểm tra backend API response

### Lỗi: "Email validation failed"
- **Nguyên nhân:** Format email không hợp lệ
- **Giải pháp:** Sử dụng email format: `your@email.com`

## 🚀 Deployment

### Production Checklist

- [ ] Thay đổi VITE_API_URL thành production URL
- [ ] Update API keys cho các Payment Gateway
- [ ] Kiểm tra SSL certificate
- [ ] Enable CORS nếu cần
- [ ] Test tất cả payment methods
- [ ] Monitor error logs
- [ ] Setup backup database

---

**Last Updated:** 2026-05-02
**Version:** 1.0.0

