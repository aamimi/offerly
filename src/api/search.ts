import api from "@api/axios";

interface ICategory {
    slug: string;
    name: string;
}

interface IProduct {
    slug: string;
    title: string;
    price: number;
    rating: number;
    thumbnail: string;
}

interface ISearchResult {
    data: {
        categories: ICategory[];
        products: IProduct[];
    }
}

const getSearchResult = async (query: string): Promise<ISearchResult> => {
    const params = query !== '' ? {query} : {};
    const response = await api.get(`/search`, {params});
    return response.data;
}

export {getSearchResult};
export type {IProduct, ICategory, ISearchResult};