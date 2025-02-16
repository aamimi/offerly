import {Link, useParams} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import {Helmet} from "react-helmet";
import {ArrowBigDown, ArrowBigUp, ArrowLeftCircle, MessagesSquare, Share2} from 'lucide-react';
import {Button} from "@ui/button.tsx";
import {fetchProductBySlug} from '@api/products';
import ProductImageGallery from "@components/product/ProductImageGallery.tsx";
import {ErrorMessage, LoadingSpinner} from "@components/QueryWrapper.tsx";
import {IMetatags} from "@interfaces/Metatags.ts";
import {IProduct} from "@interfaces/Product/ProductDetails.ts";
import ProductPrice from "@components/product/ProductPrice.tsx";
import ProductComments from "@components/product/ProductComments.tsx";
import {formatDistanceToNow} from "date-fns";

const ProductDetails = () => {
    const {slug} = useParams();

    const {data: response, isLoading, isError, error} = useQuery({
        queryKey: ['product', slug],
        queryFn: () => fetchProductBySlug(slug ?? ''),
    });

    const product: IProduct = response?.data;
    const metatags: IMetatags = response?.meta;

    if (isLoading) return <LoadingSpinner/>;
    if (isError) return <ErrorMessage error={error.message}/>;

    return (
        <>
            <Helmet>
                <title>{metatags.title}</title>
                <meta name="description" content={metatags.description}/>
            </Helmet>
            <div className="container mx-auto">
                <Button asChild variant="link">
                    <Link to="/" aria-label="Back to Products">
                        <ArrowLeftCircle/>
                        Back to Products
                    </Link>
                </Button>

                <div className="card mb-4">
                    <div className="xl:flex">
                        <div className="md:flex-shrink-0 mr-4 mb-4 lg:mb-0">
                            <ProductImageGallery images={product.images}/>
                        </div>
                        <div className='xl:pt-0 pt-4 flex-1'>
                            <div className="flex justify-between items-center mb-4 font-semibold">
                                <div className="flex flex-row items-center p-1 border border-color text-lg">
                                    <button
                                        className="w-8 h-8 lg:w-10 lg:h-10 bg-zinc-200 dark:bg-zinc-900 rounded-sm cursor-pointer">
                                        <ArrowBigDown className="w-5 h-8 lg:w-7 lg:h-10 mx-auto text-blue-500"/>
                                    </button>
                                    <span className="mx-2">{product.rating}°</span>
                                    <button
                                        className="w-8 h-8 lg:w-10 lg:h-10 bg-zinc-200 dark:bg-zinc-900 rounded-sm cursor-pointer">
                                        <ArrowBigUp className="w-5 h-8 lg:w-7 lg:h-10 mx-auto text-red-500"/>
                                    </button>
                                </div>
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
                </div>
                {(product.description || product.conditions || product.instructions) && (
                    <div className="card mb-4">
                        {product.description && (
                            <div className="py-4">
                                <h2 className="mb-2">About</h2>
                                {product.description}
                            </div>
                        )}
                        {product.conditions && (
                            <div className="py-4 border-t border-color">
                                <h2 className="mb-2">Conditions</h2>
                                {product.conditions}
                            </div>
                        )}
                        {product.instructions && (
                            <div className="py-4 border-t border-color">
                                <h2 className="mb-2">Instructions</h2>
                                {product.instructions}
                            </div>
                        )}
                    </div>
                )}
                {product.comments_count > 0 && (
                    <ProductComments slug={slug ?? ''} total={product.comments_count}/>
                )}
            </div>
        </>
    );
};

export default ProductDetails;