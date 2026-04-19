import type { CartItemModel } from "./CartItemModel";

export interface CartModel {
  cartId: number;
  userId: number;
  totalItems: number;
  totalPrice: number;
  items: CartItemModel[];
}