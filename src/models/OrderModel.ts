import type {OrderItemModel} from "./OrderItemModel";

export interface OrderModel {
  id: number;
  subPrice: number;
  discount: number;
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;

  // User
  idUser: number;
  username: string;

  // Payment
  idPayment?: number;
  paymentMethod: string;

  // Shipping
  idShippingMethod?: number;
  shippingMethodName: string;
  shippingFee: number;

  // Address
  idAddress: number;
  receiverName: string;
  phone: string;
  street: string;
  ward: string;
  district: string;
  province: string;

  // Order Items
  items: OrderItemModel[];
}
