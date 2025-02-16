import React from 'react';
import {ArrowBigDown, ArrowBigUp} from 'lucide-react';

interface ProductRatingProps {
    rating: number;
}

const ProductRating: React.FC<ProductRatingProps> = ({rating}: ProductRatingProps) => {
    return (
        <div className="flex flex-row items-center p-1 border border-color text-lg font-semibold">
            <button
                className="w-8 h-8 lg:w-10 lg:h-10 bg-zinc-200 dark:bg-zinc-900 rounded-sm cursor-pointer">
                <ArrowBigDown className="w-5 h-8 lg:w-7 lg:h-10 mx-auto text-blue-500"/>
            </button>
            <span className="mx-2">{rating}°</span>
            <button
                className="w-8 h-8 lg:w-10 lg:h-10 bg-zinc-200 dark:bg-zinc-900 rounded-sm cursor-pointer">
                <ArrowBigUp className="w-5 h-8 lg:w-7 lg:h-10 mx-auto text-red-500"/>
            </button>
        </div>
    );
};

export default ProductRating;