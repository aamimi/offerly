import React from 'react';
import {useNavigate} from 'react-router-dom';
import {ICategory, IProduct} from "@api/search";

interface SearchResultsProps {
    isError: boolean;
    isLoading: boolean;
    categories: ICategory[];
    products: IProduct[];
    onClose?: () => void;
}

export const SearchResults: React.FC<SearchResultsProps> = (
    {
        isError,
        isLoading,
        categories,
        products,
        onClose
    }
) => {
    const navigate = useNavigate();

    const handleResultItemClick = (type: 'category' | 'product', item: ICategory | IProduct) => {
        // Handle click on search result item
        switch (type) {
            case 'category':
                navigate(`/categories/${(item as ICategory).slug}`);
                break;
            case 'product':
                navigate(`/product/${(item as IProduct).slug}`);
                break;
        }
        onClose?.();
    };

    if (isLoading) {
        return (
            <div className="px-6 py-3 text-zinc-500">
                Loading...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="px-6 py-3 text-red-500">
                An error occurred. Please try again later.
            </div>
        );
    }

    if (categories.length === 0 && products.length === 0) {
        return (
            <div className="px-6 py-3 text-zinc-500">
                No results found
            </div>
        );
    }

    return (
        <div>
            {categories.length > 0 && (
                <div>
                    <div className="bg-zinc-200 dark:bg-zinc-900 px-6 py-3 font-bold">
                        Categories
                    </div>
                    {categories.map((category) => (
                        <div
                            key={category.slug}
                            className="px-6 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer"
                            onClick={() => handleResultItemClick('category', category)}>
                            {category.name}
                        </div>
                    ))}
                </div>
            )}

            {products.length > 0 && (
                <div>
                    <div className="bg-zinc-200 dark:bg-zinc-900 px-6 py-3 font-bold">
                        Products
                    </div>
                    {products.map((product) => (
                        <div
                            key={product.slug}
                            className="px-6 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer flex items-center"
                            onClick={() => handleResultItemClick('product', product)}>
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="w-8 h-8 mr-3"
                            />
                            <div>
                                <div>{product.title}</div>
                                <div className="text-sm text-zinc-500">
                                    ${product.price} | Rating: {product.rating}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};