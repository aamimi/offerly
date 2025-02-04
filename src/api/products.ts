import api from './axios';

export const fetchProducts = async (limit: number, skip: number, category?: string, search?: string) => {
    const query: string = `limit=${limit}&skip=${skip}` + (category ? `&category=${category}` : '') + (search ? `&search=${search}` : '');
    const response = await api.get(`/products?${query}`);
    return response.data;
};

export const fetchProductBySlug = async (slug: string) => {
    const response = await api.get(`/products/${slug}`);
    return response.data;
};