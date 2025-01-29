import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
    rating: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {
    const roundedRating = Math.round(rating);
    const emptyStars = 5 - roundedRating;

    return (
        <div className="flex items-center">
            {[...Array(roundedRating)].map((_, index) => (
                <Star key={index} className="text-yellow-500 w-5 h-5" />
            ))}
            {[...Array(emptyStars)].map((_, index) => (
                <Star key={index} className="text-gray-300 w-5 h-5" />
            ))}
        </div>
    );
};

export default RatingStars;