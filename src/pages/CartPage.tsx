import CartItems from "../components/CartComponent/CartItems";
import CartSummary from "../components/CartComponent/CartSummary";
import { PageTitle } from "../components/utils/PageTitle";
import { useEffect, useState } from "react";
import { cartApi } from "../api/cartApi";
import type { CartModel } from "../models/CartModel";
import { SpinningLoading } from "../components/utils/SpinningLoading";
import { ErrorMessage } from "../components/utils/ErrorMessage";
import { Link } from "react-router-dom";
import { productApi } from "../api/productApi";

const CartPage = () => {
  const [cart, setCart] = useState<CartModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyCart = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        setCart(null);
        return;
      }

      try {
        const data = await cartApi.getMyCart();
        const uniqueProductIds = Array.from(new Set((data.items || []).map((item) => item.productId)));
        const imageMap = new Map<number, string>();

        await Promise.all(
          uniqueProductIds.map(async (productId) => {
            try {
              const product = await productApi.getProductById(productId);
              const firstImage = product.images?.[0]?.imageUrl;
              if (firstImage) {
                imageMap.set(productId, firstImage);
              }
            } catch (imageError) {
              console.error("Không thể tải ảnh sản phẩm:", imageError);
            }
          }),
        );

        const enrichedItems = (data.items || []).map((item) => ({
          ...item,
          imageUrl: imageMap.get(item.productId) || "/img/product/product-1.webp",
        }));

        setCart({
          ...data,
          items: enrichedItems,
        });
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
      const data = await cartApi.getMyCart();
      const uniqueProductIds = Array.from(new Set((data.items || []).map((item) => item.productId)));
      const imageMap = new Map<number, string>();

      await Promise.all(
        uniqueProductIds.map(async (productId) => {
          try {
            const product = await productApi.getProductById(productId);
            const firstImage = product.images?.[0]?.imageUrl;
            if (firstImage) {
              imageMap.set(productId, firstImage);
            }
          } catch (imageError) {
            console.error("Không thể tải ảnh sản phẩm:", imageError);
          }
        }),
      );

      const enrichedItems = (data.items || []).map((item) => ({
        ...item,
        imageUrl: imageMap.get(item.productId) || "/img/product/product-1.webp",
      }));

      setCart({
        ...data,
        items: enrichedItems,
      });
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
              />
            </div>
          </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default CartPage;
