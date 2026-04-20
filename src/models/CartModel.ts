import type { CartItemModel } from "./CartItemModel";
import type { ShippingMethodModel } from "./ShippingMethodModel";

export interface CartModel {
  cartId: number;
  userId: number;
  totalItems: number;
  totalPrice: number;
  items: CartItemModel[];
  shippingMethodId?: number;
  shippingCost?: number;
  shippingMethod?: ShippingMethodModel;
}