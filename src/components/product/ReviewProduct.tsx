import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {fetchProductBySlug} from '@api/products';
import {ErrorMessage, LoadingSpinner} from "@components/QueryWrapper.tsx";

interface ReviewProductProps {
    slug: string;
}

const ReviewProduct: React.FC<ReviewProductProps> = ({slug}: ReviewProductProps) => {
    const {data: product, isLoading, isError, error} = useQuery({
        queryKey: ['product', slug],
        queryFn: () => fetchProductBySlug(slug),
    });

    if (isLoading) return <LoadingSpinner/>;
    if (isError) return <ErrorMessage error={error.message}/>;

    return (
        <div className="flex items-center gap-3 border-b pb-6 mb-4">
            <img src={product.thumbnail} alt={product.title} className="w-24 h-24 object-cover mr-3"/>
            <p>{product.title}</p>
        </div>
    );
};

export default ReviewProduct;