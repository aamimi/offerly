import React from 'react';
import {Link} from 'react-router-dom';
import {CircleChevronRight} from 'lucide-react';
import RatingStars from "@ui/elements/RatingStars.tsx";
import {Button} from "@ui/button.tsx";

interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    category: string;
    rating: number;
}

interface ProductListCardProps {
    product: Product;
}

const ProductListCard: React.FC<ProductListCardProps> = ({product}) => {
    return (
        <article
            className="card p-6"
            aria-labelledby={`product-title-${product.id}`}>
            <div className="flex">
                <img
                    className="sm:w-48 sm:h-48 w-24 h-24 object-cover mr-4 bg-gray-200 rounded-sm"
                    src={product.thumbnail || 'https://via.placeholder.com/150'}
                    alt={product.title}
                />
                <div className="flex-1 flex flex-col">
                    <div>
                        <h2 id={`product-title-${product.id}`} className="mb-2">
                            <Link
                                to={`/products/${product.id}`}
                                className="text-zinc-900 dark:text-zinc-300"
                            >
                                {product.title}
                            </Link>
                        </h2>
                        <p className="text-zinc-700 dark:text-zinc-400 mb-2 line-clamp-2">{product.description}</p>
                        <div className="mb-2">
                          <span className="text-xl text-zinc-900 dark:text-zinc-300 font-semibold">
                            ${product.price}
                          </span>
                        </div>
                        <div className="mb-2 sm:flex items-center justify-between">
                            <div className="sm:mb-0 mb-4">
                                <RatingStars rating={product.rating} />
                            </div>
                            <div>
                                <Button asChild variant='default'>
                                    <Link
                                        to={`/products/${product.id}`}
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