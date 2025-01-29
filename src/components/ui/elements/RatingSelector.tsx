import React, {useState} from 'react';
import {Star} from 'lucide-react';

interface RatingSelectorProps {
    initialRating?: number;
    onRatingChange?: (rating: number) => void;
    ariaInvalid?: boolean;
}

const RatingSelector: React.FC<RatingSelectorProps> = ({initialRating = 0, onRatingChange, ariaInvalid}) => {
    const [rating, setRating] = useState(initialRating);
    const [hoverRating, setHoverRating] = useState(0);

    const handleRating = (newRating: number): void => {
        setRating(newRating);
        if (onRatingChange) {
            onRatingChange(newRating);
        }
    };

    return (
        <div className="flex" aria-invalid={ariaInvalid}>
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    size={32}
                    className={`cursor-pointer ${star <= (hoverRating || rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                    onClick={() => handleRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                />
            ))}
        </div>
    );
};

export default RatingSelector;