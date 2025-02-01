import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import RatingStars from "@ui/elements/RatingStars.tsx";
import { fetchProductReviews } from '@api/reviews';
import Pagination from '@ui/elements/Pagination';
import ExpandedText from '@ui/elements/ExpandedText';
import { toLocaleDateString } from "@lib/dateUtils.ts";
import {EmptyData, ErrorMessage, LoadingSpinner} from "@components/QueryWrapper.tsx";

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
                <div key={review.id} className="card lg:p-6 rounded-sm">
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <h3 className="font-semibold">{review.reviewerName}</h3>
                            <span className="text-sm text-gray-500">{review.reviewerEmail}</span>
                        </div>
                        <span className="text-sm">{toLocaleDateString(review.date)}</span>
                    </div>
                    <RatingStars rating={review.rating}/>
                    <p className="mt-2">
                        <ExpandedText
                            text={review.comment}
                            isExpanded={expandedComments.has(review.id)}
                            toggleExpand={() => toggleReadMore(review.id)}
                        />
                    </p>
                </div>
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