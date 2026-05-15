export interface CreateReviewRequest {
  productId: number;
  rating: number;
  comment?: string;
}
