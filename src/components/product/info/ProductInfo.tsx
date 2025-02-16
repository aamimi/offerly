import React from 'react';

interface ProductInfoProps {
    description?: string;
    conditions?: string;
    instructions?: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({description, conditions, instructions}: ProductInfoProps) => {
    return (
        <>
            {description && (
                <div className="py-4">
                    <h2 className="mb-2">About</h2>
                    {description}
                </div>
            )}
            {conditions && (
                <div className="py-4 border-t border-color">
                    <h2 className="mb-2">Conditions</h2>
                    {conditions}
                </div>
            )}
            {instructions && (
                <div className="py-4 border-t border-color">
                    <h2 className="mb-2">Instructions</h2>
                    {instructions}
                </div>
            )}
        </>
    );
};

export default ProductInfo;