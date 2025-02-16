import {Link, useParams} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import {Helmet} from "react-helmet";
import {ArrowLeftCircle} from 'lucide-react';
import {Button} from "@ui/button.tsx";
import {fetchProductBySlug} from '@api/products';
import {ErrorMessage, LoadingSpinner} from "@components/QueryWrapper.tsx";
import {IMetatags} from "@interfaces/Metatags.ts";
import {IProduct} from "@interfaces/Product/ProductDetails.ts";
import ProductComments from "@components/product/comment/ProductComments.tsx";
import ProductHeader from "@components/product/header/ProductHeader.tsx";
import ProductInfo from "@components/product/info/ProductInfo.tsx";

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
                    <ProductHeader product={product} />
                </div>
                {(product.description || product.conditions || product.instructions) && (
                    <div className="card mb-4">
                        <ProductInfo
                            description={product.description}
                            conditions={product.conditions}
                            instructions={product.instructions}
                        />
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