import type { ProductImageModel } from "./ProductImageModel";
import type { ProductVariantModel } from "./ProductVariantModel";

export interface ProductModel {
    id:number;
    name:string;
    price:number;
    discountPercent: number;
    discountedPrice: number;
    description: string,
    totalQuantity: number;
    brand: string | null,
    category: string | null,
    images: ProductImageModel[];
    variants: ProductVariantModel[];
}