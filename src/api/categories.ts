import api from './axios';

export const fetchCategories = async () => {
    const response = await api.get(`/categories`);
    return response.data;
};

export const fetchCategoriesBySlug = async (slug: string) => {
    const response = await api.get(`/categories/${slug}`);
    return response.data;
};
