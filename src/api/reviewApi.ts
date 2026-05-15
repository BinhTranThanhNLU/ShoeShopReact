import axiosClient from "./axiosClient";
import type { CreateReviewRequest } from "../modelRequest/CreateReviewRequest";
import type { UpdateReviewRequest } from "../modelRequest/UpdateReviewRequest";
import type { ReviewModel } from "../models/ReviewModel";
import type { UnreviewedProductModel } from "../models/UnreviewedProductModel";

export const reviewApi = {
  getUnreviewedProducts: async (): Promise<UnreviewedProductModel[]> => {
    const response = await axiosClient.get("/reviews/me/unreviewed-products");
    return response.data;
  },

  getMyReviews: async (): Promise<ReviewModel[]> => {
    const response = await axiosClient.get("/reviews/me");
    return response.data;
  },

  getReviewsForProduct: async (productId: number): Promise<ReviewModel[]> => {
    const response = await axiosClient.get(`/reviews/product/${productId}`);
    return response.data;
  },

  createReview: async (data: CreateReviewRequest): Promise<ReviewModel> => {
    const response = await axiosClient.post("/reviews", data);
    return response.data;
  },

  updateReview: async (id: number, data: UpdateReviewRequest): Promise<ReviewModel> => {
    const response = await axiosClient.patch(`/reviews/${id}`, data);
    return response.data;
  },

  deleteReview: async (id: number): Promise<void> => {
    await axiosClient.delete(`/reviews/${id}`);
  },
};
