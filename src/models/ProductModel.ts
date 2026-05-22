import type { ProductImageModel } from "./ProductImageModel";
import type { ProductVariantModel } from "./ProductVariantModel";

export interface ProductModel {
    id: number;
    name: string;
    price: number;
    discountPercent: number | null;
    discountedPrice: number | null;
    description: string;
    totalQuantity: number;
    brand: string | null;
    category: string | null;
    image: ProductImageModel[];
    variants: ProductVariantModel[];
    status: boolean;
    stock: number;
}