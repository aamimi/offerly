import React from 'react';
import {Link} from 'react-router-dom';
import {CircleChevronRight} from 'lucide-react';

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
        <article className="border rounded-lg bg-white p-4" aria-labelledby={`product-title-${product.id}`}>
            <div className="flex">
                <img
                    className="w-48 h-48 object-cover mr-4 bg-gray-200 rounded-lg"
                    src={product.thumbnail || 'https://via.placeholder.com/150'}
                    alt={product.title}
                />
                <div className="flex-1 flex flex-col">
                    <div>
                        <h2 id={`product-title-${product.id}`} className="mb-2">
                            <Link
                                to={`/products/${product.id}`}
                                className="text-gray-900"
                            >
                                {product.title}
                            </Link>
                        </h2>
                        <p className="text-gray-700 mb-2 line-clamp-2">{product.description}</p>
                        <div className="mb-3">
                          <span className="text-xl font-semibold">
                            ${product.price}
                          </span>
                        </div>
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <span className="badge mr-2">
                                Category: {product.category}
                            </span>
                                <span className="badge">
                                Rating: {product.rating}/5
                            </span>
                            </div>
                            <div>
                                <Link
                                    to={`/products/${product.id}`}
                                    className="btn-base btn-outline btn-icon"
                                    aria-label={`See more details about ${product.title}`}
                                >
                                    See more
                                    <CircleChevronRight size={20}/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ProductListCard;