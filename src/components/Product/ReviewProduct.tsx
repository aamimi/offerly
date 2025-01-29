import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '@api/products';

interface ReviewProductProps {
    productId: string;
}

const ReviewProduct: React.FC<ReviewProductProps> = ({ productId }: ReviewProductProps) => {
    const { data: product, isLoading, isError, error } = useQuery({
        queryKey: ['product', productId],
        queryFn: () => fetchProductById(productId),
    });

    if (isLoading) return <div className="py-4" aria-live="polite">Loading...</div>;
    if (isError) return <div className="py-4" aria-live="polite">Error: {error.message}</div>;

    return (
        <div className="flex items-center gap-3 border-b pb-6 mb-4">
            <img src={product.thumbnail} alt={product.title} className="w-24 h-24 object-cover mr-3" />
            <p>{product.title}</p>
        </div>
    );
};

export default ReviewProduct;