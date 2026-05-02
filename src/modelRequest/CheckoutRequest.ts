export interface CheckoutRequest {
  // Customer Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Shipping Address
  receiverName: string;
  receiverPhone: string;
  street: string;
  ward: string;
  district: string;
  province: string;
  country: string;
  saveAddress: boolean;

  // Billing Address (optional, if different from shipping)
  useSameAddress: boolean;
  billingStreet?: string;
  billingWard?: string;
  billingDistrict?: string;
  billingProvince?: string;

  // Payment Information
  paymentMethod: "COD" | "BANK_TRANSFER" | "MOMO" | "ZALOPAY" | "VNPAY";
  shippingMethodId: number;
}

