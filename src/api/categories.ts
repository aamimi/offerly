import api from './axios';
import axios from "axios";

export const fetchCategories = async () => {
    const response = await axios.get(`http://localhost:3001/categories`);
    return response.data;
};

export const fetchSubcategories = async (id: string) => {
    const response = await api.get(`/categories/${id}/subcategories`);
    return response.data;
};
