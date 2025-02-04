import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProductReviews } from '@api/reviews';
import Pagination from '@ui/elements/Pagination';
import {EmptyData, ErrorMessage, LoadingSpinner} from "@components/QueryWrapper.tsx";
import ReviewCard from "@components/product/ReviewCard.tsx";

interface Review {
    id: string;
    reviewerName: string;
    reviewerEmail: string;
    rating: number;
    comment: string;
    date: string;
}

interface ProductReviewsProps {
    productId: string;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
    const [page, setPage] = useState<number>(1);
    const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['productReviews', productId, page],
        queryFn: () => fetchProductReviews(productId, page, 5),
    });

    const toggleReadMore = (id: string) => {
        setExpandedComments(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    if (isLoading) return <LoadingSpinner/>;
    if (isError) return <ErrorMessage error={error.message}/>;
    if (data.reviews.length === 0) return <EmptyData message="No reviews available."/>;

    return (
        <div className="space-y-4">
            {data.reviews.map((review: Review) => (
                <ReviewCard
                    key={review.id}
                    review={review}
                    isExpanded={expandedComments.has(review.id)}
                    toggleExpand={() => toggleReadMore(review.id)}
                />
            ))}
            <Pagination
                currentPage={page}
                totalPages={data.totalPages}
                onPageChange={setPage}
            />
        </div>
    );
};

export default ProductReviews;