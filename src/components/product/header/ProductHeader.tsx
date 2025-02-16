import React from 'react';
import { MessagesSquare, Share2 } from 'lucide-react';
import { formatDistanceToNow } from "date-fns";
import { IProduct } from "@interfaces/Product/ProductDetails.ts";
import ProductImageGallery from "./ProductImageGallery";
import ProductPrice from "./ProductPrice";
import ProductRating from "./ProductRating";

interface ProductHeaderProps {
    product: IProduct;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ product }) => {
    return (
        <div className="xl:flex">
            <div className="md:flex-shrink-0 mr-4 mb-4 lg:mb-0">
                <ProductImageGallery images={product.images}/>
            </div>
            <div className='xl:pt-0 pt-4 flex-1'>
                <div className="flex justify-between items-center mb-4 font-semibold">
                    <ProductRating rating={product.rating} />
                    <div className="flex gap-4">
                        <button className="flex items-center gap-1" title="Share">
                            <Share2/>
                            Share
                        </button>
                        {product.comments_count > 0 && (
                            <button className="flex items-center gap-1" title="Go to Comments">
                                <MessagesSquare/>
                                {product.comments_count}
                            </button>
                        )}
                    </div>
                </div>
                <span className="text-sm text-zinc-500">
                    Posted {formatDistanceToNow(new Date(product.created_at))} ago
                </span>
                <h1 className="mb-2">{product.title}</h1>
                {product.summary && (
                    <div className="mb-4">
                        {product.summary}
                    </div>
                )}
                {product.price || product.discount_price && (
                    <div className="mb-4">
                        <ProductPrice price={product.price} discountPrice={product.discount_price}/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductHeader;