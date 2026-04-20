import CartItems from "../components/CartComponent/CartItems";
import CartSummary from "../components/CartComponent/CartSummary";
import { PageTitle } from "../components/utils/PageTitle";
import { useEffect, useRef, useState } from "react";
import { cartApi } from "../api/cartApi";
import type { CartModel } from "../models/CartModel";
import type { ShippingMethodModel } from "../models/ShippingMethodModel";
import { SpinningLoading } from "../components/utils/SpinningLoading";
import { ErrorMessage } from "../components/utils/ErrorMessage";
import { Link } from "react-router-dom";
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

    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = window.setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, 1800);
  };

  const enrichCartData = async (data: CartModel): Promise<CartModel> => {
    const uniqueProductIds = Array.from(new Set((data.items || []).map((item) => item.productId)));
    const imageMap = new Map<number, string>();
    const variantsMap = new Map<number, ProductVariantModel[]>();

    await Promise.all(
      uniqueProductIds.map(async (productId) => {
        try {
          const product = await productApi.getProductById(productId);
          const firstImage = product.images?.[0]?.imageUrl;
          if (firstImage) {
            imageMap.set(productId, firstImage);
          }
          variantsMap.set(productId, product.variants || []);
        } catch (imageError) {
          console.error("Không thể tải dữ liệu sản phẩm:", imageError);
        }
      }),
    );

    const enrichedItems: CartItemModel[] = (data.items || []).map((item) => ({
      ...item,
      imageUrl: imageMap.get(item.productId) || "/img/product/product-1.webp",
      availableVariants: variantsMap.get(item.productId) || [],
    }));

    return {
      ...data,
      items: enrichedItems,
    };
  };

  useEffect(() => {
    const fetchMyCart = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        setCart(null);
        return;
      }

      try {
        const [cartData, methodsData] = await Promise.all([
          cartApi.getMyCart(),
          cartApi.getShippingMethods().catch(() => []), // Fallback to empty array if shipping methods fail
        ]);
        const enrichedCart = await enrichCartData(cartData);
        setCart(enrichedCart);
        setShippingMethods(methodsData);
        setHttpError(null);
      } catch (error: any) {
        setHttpError(error?.response?.data?.message || "Không thể lấy dữ liệu giỏ hàng");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyCart();
  }, []);

  const refreshCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCart(null);
      return;
    }

    try {
      const [cartData, methodsData] = await Promise.all([
        cartApi.getMyCart(),
        cartApi.getShippingMethods().catch(() => []), // Fallback to empty array if shipping methods fail
      ]);
      const enrichedCart = await enrichCartData(cartData);
      setCart(enrichedCart);
      setShippingMethods(methodsData);
      window.dispatchEvent(new Event("cart-updated"));
    } catch (error: any) {
      setHttpError(error?.response?.data?.message || "Không thể lấy dữ liệu giỏ hàng");
    }
  };

  const handleRemoveItem = async (cartItemId: number) => {
    try {
      await cartApi.removeCartItem(cartItemId);
      await refreshCart();
    } catch (error: any) {
      console.error(error?.response?.data?.message || "Không thể xóa sản phẩm khỏi giỏ hàng");
    }
  };

  const handleClearCart = async () => {
    try {
      await cartApi.clearMyCart();
      await refreshCart();
    } catch (error: any) {
      console.error(error?.response?.data?.message || "Không thể xóa giỏ hàng");
    }
  };

  const handleUpdateItem = async (
    cartItemId: number,
    data: UpdateCartItemRequest,
  ): Promise<boolean> => {
    try {
      await cartApi.updateCartItem(cartItemId, data);
      await refreshCart();
      showToast("success", "Đã cập nhật giỏ hàng");
      return true;
    } catch (error: any) {
      showToast("danger", error?.response?.data?.message || "Không thể cập nhật sản phẩm trong giỏ hàng");
      console.error(error?.response?.data?.message || "Không thể cập nhật sản phẩm trong giỏ hàng");
      return false;
    }
  };

  const handleUpdateShippingMethod = async (shippingMethodId: number) => {
    try {
      const updatedCart = await cartApi.updateShippingMethod({ shippingMethodId });
      setCart(updatedCart);
      showToast("success", "Đã cập nhật phương thức vận chuyển");
    } catch (error: any) {
      showToast("danger", error?.response?.data?.message || "Không thể cập nhật phương thức vận chuyển");
      console.error(error?.response?.data?.message || "Không thể cập nhật phương thức vận chuyển");
    }
  };

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  if (isLoading) return <SpinningLoading />;
  if (httpError) return <ErrorMessage message={httpError} />;

  return (
    <main className="main">
      <PageTitle
        title="Danh mục sản phẩm"
        breadcrumbs={[
          { label: "Trang chủ", path: "/home" },
          { label: "Giỏ hàng" },
        ]}
      />

      <section id="cart" className="cart section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          {!localStorage.getItem("token") ? (
            <div className="alert alert-warning">
              Bạn cần đăng nhập để xem giỏ hàng. <Link to="/login">Đăng nhập ngay</Link>
            </div>
          ) : (
          <div className="row">
            <div className="col-lg-8" data-aos="fade-up" data-aos-delay="200">
              <CartItems
                items={cart?.items || []}
                onRemoveItem={handleRemoveItem}
                onClearCart={handleClearCart}
                onUpdateItem={handleUpdateItem}
              />
            </div>

            <div
              className="col-lg-4 mt-4 mt-lg-0"
              data-aos="fade-up"
              data-aos-delay="300"
            >
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

      {toast && (
        <div
          className={`alert alert-${toast.type}`}
          style={{
            position: "fixed",
            top: "90px",
            right: "20px",
            zIndex: 1200,
            minWidth: "280px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
          }}
        >
          {toast.message}
        </div>
      )}
    </main>
  );
};

export default CartPage;
