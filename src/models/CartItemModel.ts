export interface CartItemModel {
  cartItemId: number;
  variantId: number;
  productId: number;
  productName: string;
  imageUrl?: string;
  color: string;
  size: string;
  unitPrice: number;
  quantity: number;
  availableStock: number;
  lineTotal: number;
}