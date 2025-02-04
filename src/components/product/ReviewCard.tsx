import React from 'react';
import RatingStars from "@ui/elements/RatingStars.tsx";
import ExpandedText from '@ui/elements/ExpandedText';
import { toLocaleDateString } from "@lib/dateUtils.ts";

interface Review {
    id: string;
    reviewerName: string;
    reviewerEmail: string;
    rating: number;
    comment: string;
    date: string;
}

interface ReviewCardProps {
    review: Review;
    isExpanded: boolean;
    toggleExpand: () => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, isExpanded, toggleExpand }) => {
    return (
        <div className="card lg:p-6 rounded-sm">
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
                    isExpanded={isExpanded}
                    toggleExpand={toggleExpand}
                />
            </p>
        </div>
    );
};

export default ReviewCard;