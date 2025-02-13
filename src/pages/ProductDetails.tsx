import {Link, useParams} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import {Helmet} from "react-helmet";
import {ArrowLeftCircle} from 'lucide-react';
import {Button} from "@ui/button.tsx";
import {fetchProductBySlug} from '@api/products';
import ProductImageGallery from "@components/product/ProductImageGallery.tsx";
import {ErrorMessage, LoadingSpinner} from "@components/QueryWrapper.tsx";
import {IMetatags} from "@interfaces/Metatags.ts";
import {IProduct} from "@interfaces/Product/ProductDetails.ts";
import ProductPrice from "@components/product/ProductPrice.tsx";

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
                        <div>
                            <div className="mb-4">
                                {product.rating}
                            </div>
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
                            <div className="py-4 border-t-2">
                                <h2 className="mb-2">Conditions</h2>
                                {product.conditions}
                            </div>
                        )}
                        {product.instructions && (
                            <div className="py-4 border-t-2">
                                <h2 className="mb-2">Instructions</h2>
                                {product.instructions}
                            </div>
                        )}
                    </div>
                )}
                <div className="card">
                    <div className="flex items-center justify-between mb-4">
                        <h2>Customer Comments</h2>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetails;