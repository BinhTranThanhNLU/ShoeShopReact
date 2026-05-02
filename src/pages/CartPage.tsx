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

const CartPage = () => {
  const [cart, setCart] = useState<CartModel | null>(null);
  const [shippingMethods, setShippingMethods] = useState<ShippingMethodModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "danger"; message: string } | null>(null);
  const toastTimerRef = useRef<number | null>(null);

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
            if (product.images?.[0]?.imageUrl) imageMap.set(productId, product.images[0].imageUrl);
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
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoading(false);
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
      setHttpError(error?.response?.data?.message || "Không thể tải giỏ hàng");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

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
            {!localStorage.getItem("token") ? (
                <div className="alert alert-warning">
                  Vui lòng <Link to="/login">đăng nhập</Link> để xem giỏ hàng.
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