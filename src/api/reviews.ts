import api from './axios';

export const fetchProductReviews = async (productId: string, page: number, limit: number) => {
    const response = await api.get(`/products/${productId}/reviews`, {
        params: { page, limit }
    });
    return response.data;
};