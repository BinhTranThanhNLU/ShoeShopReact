import CartItems from "../components/CartComponent/CartItems";
import CartSummary from "../components/CartComponent/CartSummary";
import { PageTitle } from "../components/utils/PageTitle";
import { useEffect, useRef, useState } from "react";
import { cartApi } from "../api/cartApi";
import type { CartModel } from "../models/CartModel";
import type { ShippingMethodModel } from "../models/ShippingMethodModel";
import { SpinningLoading } from "../components/utils/SpinningLoading";
import { ErrorMessage } from "../components/utils/ErrorMessage";
import { Link } from "react-router-dom"; //[cite: 6]
import { productApi } from "../api/productApi";
import type { ProductVariantModel } from "../models/ProductVariantModel";
import type { CartItemModel } from "../models/CartItemModel";
import type { UpdateCartItemRequest } from "../modelRequest/UpdateCartItemRequest";
import { useAuth } from "../context/AuthContext";

const createEmptyCart = (userId = 0): CartModel => ({
  cartId: 0,
  userId,
  totalItems: 0,
  totalPrice: 0,
  items: [],
  shippingMethodId: 0,
  shippingCost: 0,
});

const isMissingCartError = (error: any) => {
  const message = String(error?.response?.data?.message || error?.message || "").toLowerCase();
  const status = error?.response?.status;

  return (
    status === 404 ||
    message.includes("cart not found") ||
    message.includes("giỏ hàng không tồn tại") ||
    message.includes("cart empty")
  );
};

const CartPage = () => {
  const [cart, setCart] = useState<CartModel | null>(null);
  const [shippingMethods, setShippingMethods] = useState<ShippingMethodModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "danger"; message: string } | null>(null);
  const toastTimerRef = useRef<number | null>(null);
  const { token } = useAuth();

  const showToast = (type: "success" | "danger", message: string) => {
    setToast({ type, message });
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(null), 1800);
  };

  const enrichCartData = async (data: CartModel): Promise<CartModel> => {
    const items = data.items || [];
    if (items.length === 0) return data; //[cite: 6]

    const uniqueProductIds = Array.from(new Set(items.map((item) => item.productId)));
    const imageMap = new Map<number, string>();
    const variantsMap = new Map<number, ProductVariantModel[]>();

    await Promise.all(
        uniqueProductIds.map(async (productId) => {
          try {
            const product = await productApi.getProductById(productId);
            const productImages = product.images ?? product.image ?? [];
            if (productImages[0]?.imageUrl) imageMap.set(productId, productImages[0].imageUrl);
            variantsMap.set(productId, product.variants || []);
          } catch (error) {
            console.error("Lỗi enrich data sản phẩm:", productId, error);
          }
        }),
    );

    const enrichedItems: CartItemModel[] = items.map((item) => ({
      ...item,
      imageUrl: imageMap.get(item.productId) || "/img/product/product-1.webp",
      availableVariants: variantsMap.get(item.productId) || [],
    }));

    return { ...data, items: enrichedItems };
  };

  const fetchCartData = async () => {
    if (!token) {
      setIsLoading(false);
      setCart(null);
      setShippingMethods([]);
      return;
    }

    try {
      const [cartData, methodsData] = await Promise.all([
        cartApi.getMyCart(),
        cartApi.getShippingMethods().catch(() => []),
      ]);
      const enrichedCart = await enrichCartData(cartData);
      setCart(enrichedCart);
      setShippingMethods(methodsData);
    } catch (error: any) {
      if (isMissingCartError(error)) {
        setCart(createEmptyCart());
        setShippingMethods(await cartApi.getShippingMethods().catch(() => []));
        setHttpError(null);
        return;
      }

      setHttpError(error?.response?.data?.message || "Không thể tải giỏ hàng");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, [token]);

  const handleUpdateItem = async (cartItemId: number, data: UpdateCartItemRequest) => {
    try {
      await cartApi.updateCartItem(cartItemId, data);
      await fetchCartData();
      showToast("success", "Đã cập nhật số lượng");
      return true;
    } catch (error: any) {
      showToast("danger", "Lỗi cập nhật");
      return false;
    }
  };

  const handleUpdateShippingMethod = async (shippingMethodId: number) => {
    if ((cart?.totalItems || 0) === 0) return; // Bảo vệ khỏi lỗi Cart Empty[cite: 6]
    try {
      const updatedCart = await cartApi.updateShippingMethod({ shippingMethodId });
      setCart(await enrichCartData(updatedCart));
      showToast("success", "Đã đổi phương thức vận chuyển");
    } catch (error: any) {
      showToast("danger", "Không thể cập nhật phí vận chuyển");
    }
  };

  if (isLoading) return <SpinningLoading />;
  if (httpError) return <ErrorMessage message={httpError} />;

  const isEmptyCart = Boolean(token && cart && cart.totalItems === 0);

  return (
      <main className="main">
        <PageTitle
            title="Giỏ hàng của bạn"
            breadcrumbs={[
              { label: "Trang chủ", path: "/home" },
              { label: "Giỏ hàng" },
            ]}
        />

        <section id="cart" className="cart section">
          <div className="container">
            {!token ? (
                <div className="row justify-content-center">
                  <div className="col-lg-8 col-xl-7">
                    <div className="card border-0 shadow-sm overflow-hidden">
                      <div className="card-body p-4 p-md-5 text-center">
                        <div
                            className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
                            style={{ width: 72, height: 72, background: "linear-gradient(135deg, #f4f7ff 0%, #e8eefc 100%)" }}
                        >
                          <i className="bi bi-cart3" style={{ fontSize: 30, color: "#2d5bff" }}></i>
                        </div>

                        <h2 className="h4 fw-bold mb-3">Giỏ hàng đang chờ bạn</h2>
                        <p className="text-muted mb-4" style={{ maxWidth: 520, margin: "0 auto" }}>
                          Đăng nhập để xem sản phẩm đã lưu, cập nhật số lượng và thanh toán nhanh hơn.
                        </p>

                        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                          <Link to="/login" className="btn btn-primary px-4">
                            Đăng nhập ngay
                          </Link>
                          <Link to="/home" className="btn btn-outline-primary px-4">
                            Tiếp tục mua sắm
                          </Link>
                        </div>

                        <div className="row g-3 mt-4 text-start">
                          <div className="col-md-4">
                            <div className="p-3 rounded-3 bg-light h-100">
                              <strong className="d-block mb-1">Lưu giỏ tự động</strong>
                              <span className="text-muted small">Không lo mất sản phẩm khi đổi thiết bị.</span>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="p-3 rounded-3 bg-light h-100">
                              <strong className="d-block mb-1">Thanh toán nhanh</strong>
                              <span className="text-muted small">Nhận đầy đủ phí ship và tổng tiền.</span>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="p-3 rounded-3 bg-light h-100">
                              <strong className="d-block mb-1">Hỗ trợ đơn hàng</strong>
                              <span className="text-muted small">Quản lý đơn của bạn ở một nơi.</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            ) : isEmptyCart ? (
                <div className="row justify-content-center">
                  <div className="col-lg-8 col-xl-7">
                    <div className="card border-0 shadow-sm overflow-hidden">
                      <div className="card-body p-4 p-md-5 text-center">
                        <div
                            className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
                            style={{ width: 84, height: 84, background: "linear-gradient(135deg, #fff5e6 0%, #ffe8cc 100%)" }}
                        >
                          <i className="bi bi-cart-x" style={{ fontSize: 34, color: "#ff7a18" }}></i>
                        </div>

                        <h2 className="h4 fw-bold mb-3">Giỏ hàng của bạn đang trống</h2>
                        <p className="text-muted mb-4" style={{ maxWidth: 520, margin: "0 auto" }}>
                          Bạn chưa thêm sản phẩm nào vào giỏ. Hãy chọn vài mẫu giày yêu thích để bắt đầu mua sắm.
                        </p>

                        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                          <Link to="/home" className="btn btn-primary px-4">
                            Khám phá sản phẩm
                          </Link>
                          <Link to="/wishlist" className="btn btn-outline-primary px-4">
                            Xem danh sách yêu thích
                          </Link>
                        </div>

                        <div className="row g-3 mt-4 text-start">
                          <div className="col-md-4">
                            <div className="p-3 rounded-3 bg-light h-100">
                              <strong className="d-block mb-1">Mới mỗi ngày</strong>
                              <span className="text-muted small">Nhiều mẫu giày thể thao, thời trang, chạy bộ.</span>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="p-3 rounded-3 bg-light h-100">
                              <strong className="d-block mb-1">Thêm nhanh</strong>
                              <span className="text-muted small">Bấm một lần là lưu ngay vào giỏ của bạn.</span>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="p-3 rounded-3 bg-light h-100">
                              <strong className="d-block mb-1">Thanh toán dễ</strong>
                              <span className="text-muted small">Hoàn tất đơn chỉ với vài thao tác.</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            ) : (
                <div className="row">
                  <div className="col-lg-8">
                    <CartItems
                        items={cart?.items || []}
                        onRemoveItem={async (id) => { await cartApi.removeCartItem(id); fetchCartData(); }}
                        onClearCart={async () => { await cartApi.clearMyCart(); fetchCartData(); }}
                        onUpdateItem={handleUpdateItem}
                    />
                  </div>
                  <div className="col-lg-4">
                    <CartSummary
                        totalItems={cart?.totalItems || 0}
                        totalPrice={cart?.totalPrice || 0}
                        shippingCost={cart?.shippingCost || 0}
                        shippingMethodId={cart?.shippingMethodId || 0}
                        shippingMethods={shippingMethods}
                        onUpdateShippingMethod={handleUpdateShippingMethod}
                    />
                  </div>
                </div>
            )}
          </div>
        </section>
        {toast && <div className={`alert alert-${toast.type} toast-custom`}>{toast.message}</div>}
      </main>
  );
};

export default CartPage;