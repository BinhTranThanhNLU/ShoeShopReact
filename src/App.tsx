// ===== Core React =====
import { useEffect } from "react";

// ===== Animation / Effects =====
import AOS from "aos";
import "aos/dist/aos.css";

// ===== Lightbox / Zoom =====
import "glightbox/dist/css/glightbox.min.css";
import "drift-zoom/dist/drift-basic.css";

// ===== Layouts =====
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

// ===== User Pages =====
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import AccountPage from "./pages/AccountPage.tsx";
import CartPage from "./pages/CartPage.tsx";
import { ResetPasswordPage } from "./pages/ResetPasswordPage.tsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.tsx";
import { GoogleCallback } from "./components/LoginComponent/GoogleCallback.tsx";
import CheckoutPage from "./pages/CheckoutPage.tsx";
import CheckoutSuccess from "./components/CheckoutComponent/CheckoutSuccess.tsx";
import PaymentCallback from "./pages/PaymentCallback.tsx";

// ===== Admin Pages =====
import AdminDashboardPage from "./pages/AdminDashboardPage.tsx";
import AdminUserPage from "./pages/AdminUserPage.tsx";
import AdminProductPage from "./pages/AdminProductPage.tsx";
import { AdminOrderPage } from "./pages/AdminOrderPage.tsx";


function App() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-in-out",
      once: true,
      offset: 50,
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* ================= USER ROUTES ================= */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/product-detail/:id" element={<ProductDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/google/callback" element={<GoogleCallback />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout/success/:orderId" element={<CheckoutSuccess />} />
          <Route path="/orders/payment-callback" element={<PaymentCallback />} />
        </Route>

        {/* ================= ADMIN ROUTES ================= */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="users" element={<AdminUserPage />} />
          {/* TODO: thêm các route admin khác sau */}
           <Route path="products" element={<AdminProductPage />} />
          <Route path="orders" element={<AdminOrderPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
