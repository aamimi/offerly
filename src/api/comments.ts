import api from './axios';

export const fetchProductComments = async (slug: string, page: number = 1, perPage: number = 5) => {
    const response = await api.get(`/products/${slug}/comments`, {
        params: { page, perPage }
    });
    console.log(response);
    return response.data;
};

export const createComment = async (slug: string, content: string) => {
    const response = await api.post(`/products/${slug}/comments`, { content });
    return response.data;
};