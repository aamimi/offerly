import React from 'react';
import {Link} from 'react-router-dom';
import {CircleChevronRight} from 'lucide-react';
import {Button} from "@ui/button.tsx";
import {IProduct} from "@interfaces/Product/ProductList.ts";
import ProductPrice from "@components/product/ProductPrice.tsx";

interface ProductListCardProps {
    product: IProduct;
}

const ProductListCard: React.FC<ProductListCardProps> = ({product}) => {
    return (
        <article
            className="card lg:p-6"
            aria-labelledby={`product-title-${product.slug}`}>
            <div className="flex flex-col sm:flex-row">
                <img
                    className="sm:w-48 sm:h-48 w-52 h-52 object-cover sm:mr-4 sm:mx-0 mx-auto sm:mb-0 mb-4 bg-gray-200 rounded-sm"
                    src={product.thumbnail.url || 'https://placehold.co/150x150'}
                    alt={product.title}
                />
                <div className="flex flex-col justify-between sm:w-full">
                        <div className="mb-2">
                            {product.rating}
                        </div>
                        <h2 id={`product-title-${product.slug}`} className="mb-2">
                            <Link
                                to={`/products/${product.slug}`}
                                className="text-zinc-900 dark:text-zinc-300"
                            >
                                {product.title}
                            </Link>
                        </h2>
                        {product.summary && (
                            <p className="text-zinc-700 dark:text-zinc-400 mb-2 line-clamp-2">{product.summary}</p>
                        )}
                        <div className="mb-2">
                            <ProductPrice price={product.price} discountPrice={product.discount_price}/>
                        </div>
                        <div className="mb-2 sm:flex items-center justify-end">
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
        </article>
    );
};

export default ProductListCard;