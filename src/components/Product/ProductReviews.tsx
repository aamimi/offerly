import React, { useState, useEffect } from 'react';
import RatingStars from "../Global/RatingStars.tsx";
import { fetchProductReviews } from '../../api/reviews';
import Pagination from '../Global/Pagination.tsx';
import ExpandedText from '../Global/ExpandedText.tsx';

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
    const [reviews, setReviews] = useState<Review[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());

    useEffect(() => {
        const loadReviews = async () => {
            setIsLoading(true);
            try {
                const data = await fetchProductReviews(productId, page, 5);
                setReviews(data.reviews);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error('Failed to fetch reviews:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadReviews();
    }, [productId, page]);

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

    if (isLoading) {
        return <div>Loading reviews...</div>;
    }

    if (reviews.length === 0) {
        return <div>No reviews available</div>;
    }

    return (
        <div className="space-y-4">
            {reviews.map((review) => (
                <div key={review.id} className="border p-4 rounded-lg bg-gray-50">
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <h3 className="font-semibold">{review.reviewerName}</h3>
                            <span className="text-sm text-gray-500">{review.reviewerEmail}</span>
                        </div>
                        <span className="text-sm">{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                    <RatingStars rating={review.rating} />
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
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </div>
    );
};

export default ProductReviews;