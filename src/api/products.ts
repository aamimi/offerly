import api from './axios';

export const fetchProducts = async (limit: number, skip: number) => {
    const response = await api.get(`/products?limit=${limit}&skip=${skip}`);
    return response.data;
};

export const fetchProductBySlug = async (slug: string) => {
    const response = await api.get(`/products/${slug}`);
    return response.data;
};