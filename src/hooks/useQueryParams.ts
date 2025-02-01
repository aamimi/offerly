import {useSearchParams} from 'react-router-dom';

export const useQueryParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const getQueryParam = (key: string): string | null => {
        return searchParams.get(key);
    };

    const getQueryArray = (key: string): string[] => {
        // Handle array parameters like categories[]=value1&categories[]=value2
        return Array.from(searchParams.entries())
            .filter(([paramKey]) => paramKey === `${key}[]` || paramKey === key)
            .map(([, value]) => value);
    };

    const setQueryParam = (key: string, value: string | string[] | null) => {
        const newSearchParams = new URLSearchParams(searchParams);

        if (value === null) {
            newSearchParams.delete(key);
            newSearchParams.delete(`${key}[]`);
        } else if (Array.isArray(value)) {
            // Clear existing values first
            newSearchParams.delete(key);
            newSearchParams.delete(`${key}[]`);
            // Add new values
            value.forEach(v => newSearchParams.append(`${key}[]`, v));
        } else {
            newSearchParams.set(key, value);
        }

        setSearchParams(newSearchParams);
    };

    return {
        getQueryParam,
        getQueryArray,
        setQueryParam,
    };
};