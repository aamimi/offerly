import api from './axios';

export const fetchProductReviews = async (productId: string, page: number, limit: number) => {
    const response = await api.get(`/products/${productId}/reviews`, {
        params: { page, limit }
    });
    return response.data;
};

export const createProductReview = async (productId: string, data: { rating: number; review: string }) => {
    const response = await api.post(`/products/${productId}/reviews`, data);
    return response.data;
};