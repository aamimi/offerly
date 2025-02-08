import React from 'react';
import {Link} from 'react-router-dom';
import {CircleChevronRight} from 'lucide-react';
import {Button} from "@ui/button.tsx";

interface Product {
    slug: string;
    title: string;
    summary: string;
    price: number;
    discount_price: number;
    thumbnail: string;
    rating: number;
}

interface ProductListCardProps {
    product: Product;
}

const ProductListCard: React.FC<ProductListCardProps> = ({product}) => {
    return (
        <article
            className="card lg:p-6"
            aria-labelledby={`product-title-${product.slug}`}>
            <div className="flex">
                <img
                    className="sm:w-48 sm:h-48 w-24 h-24 object-cover mr-4 bg-gray-200 rounded-sm"
                    src={product.thumbnail || 'https://placehold.co/150x150'}
                    alt={product.title}
                />
                <div className="flex-1 flex flex-col">
                    <div>
                        <h2 id={`product-title-${product.slug}`} className="mb-2">
                            <Link
                                to={`/products/${product.slug}`}
                                className="text-zinc-900 dark:text-zinc-300"
                            >
                                {product.title}
                            </Link>
                        </h2>
                        <p className="text-zinc-700 dark:text-zinc-400 mb-2 line-clamp-2">{product.summary}</p>
                        <div className="mb-2">
                            {
                                product.discount_price && (
                                    <span className="text-xl text-zinc-900 dark:text-zinc-300 font-semibold">
                                        ${product.discount_price}
                                    </span>
                                )
                            }
                            {
                                product.price && (
                                    <span
                                        className={`text-xl ${product.discount_price ? 'text-zinc-500 dark:text-zinc-400 line-through' : 'text-zinc-900 dark:text-zinc-300 '} ml-2`}>
                                        ${product.price}
                                    </span>
                                )
                            }
                        </div>
                        <div className="mb-2 sm:flex items-center justify-between">
                            <div className="sm:mb-0 mb-4">
                                {/*<RatingStars rating={product.rating} />*/}
                            </div>
                            <div>
                                <Button asChild variant='default'>
                                    <Link
                                        to={`/products/${product.slug}`}
                                        aria-label={`See more details about ${product.title}`}>
                                        See more
                                        <CircleChevronRight/>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ProductListCard;