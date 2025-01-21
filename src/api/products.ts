import api from './axios';

export const fetchProducts = async (limit: number, skip: number) => {
    const response = await api.get(`/products?limit=${limit}&skip=${skip}`);
    return response.data;
};

export const fetchProductById = async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};