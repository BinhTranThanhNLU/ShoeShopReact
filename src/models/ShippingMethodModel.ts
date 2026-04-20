export interface ShippingMethodModel {
  id: number;
  name: string;
  description: string;
  cost: number;
  estimatedDays: number;
  isActive: boolean;
}
