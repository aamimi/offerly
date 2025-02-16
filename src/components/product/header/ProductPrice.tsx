import React from 'react';

interface ProductPriceProps {
    price?: number;
    discountPrice?: number;
}

const ProductPrice: React.FC<ProductPriceProps> = ({price, discountPrice}) => {
    return (
        <>
            {Boolean(discountPrice) && (
                <span className="text-xl text-zinc-900 dark:text-zinc-300 font-semibold">
                    ${discountPrice}
                </span>
            )}
            {Boolean(price) && (
                <span
                    className={`text-xl ${discountPrice ? 'text-zinc-500 dark:text-zinc-400 line-through' : 'text-zinc-900 dark:text-zinc-300 '} ml-2`}>
                    ${price}
                </span>
            )}
        </>
    );
};

export default ProductPrice;