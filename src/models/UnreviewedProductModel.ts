export interface UnreviewedProductModel {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPercent: number | null;
  discountedPrice: number | null;
  images: string[];
}
