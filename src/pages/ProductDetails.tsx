import {useQuery} from '@tanstack/react-query';
import {Link, useParams} from 'react-router-dom';
import {fetchProductById} from '@api/products';
import {ArrowLeftCircle, Star} from 'lucide-react';
import ProductImageGallery from "@components/Product/ProductImageGallery.tsx";
import RatingStars from "@ui/elements/RatingStars.tsx";
import ProductReviews from "@components/Product/ProductReviews.tsx";
import {Button} from "@ui/button.tsx";
import {Helmet} from "react-helmet";
import {ErrorMessage, LoadingSpinner} from "@components/QueryWrapper.tsx";

const ProductDetails = () => {
    const {id} = useParams();

    const {data: product, isLoading, isError, error} = useQuery({
        queryKey: ['product', id],
        queryFn: () => fetchProductById(id || ''),
    });

    if (isLoading) return <LoadingSpinner/>;
    if (isError) return <ErrorMessage error={error.message}/>;

    // Ensure images have src and alt properties
    const images = product.images.map((image: string, index: number) => ({
        src: image,
        alt: `Product image ${index + 1}`
    }));

    return (
        <>
            <Helmet>
                <title>Product</title>
                <meta name="description" content={product.description} />
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
                        <div className="md:flex-shrink-0 mb-4 lg:mb-0">
                            <ProductImageGallery images={images}/>
                        </div>
                        <div>
                            <h1 className="mb-2">{product.title}</h1>
                            <div className="mb-4">
                            <span className="text-2xl font-semibold">
                                ${product.price}
                            </span>
                            </div>
                            <div className="mb-4">
                                <RatingStars rating={product.rating}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card mb-4">
                    <div className="pb-4 border-b-2">
                        <h2 className="mb-2">About</h2>
                        <p className="mb-2">{product.description}</p>
                        <h3 className="mb-2">A cumuler avec ce deal</h3>
                        <ul>
                            <li>10% de réduction sur les accessoires</li>
                            <li>20% de réduction sur les coques</li>
                        </ul>
                    </div>
                    <div className="py-4 border-b-2">
                        <h2 className="mb-2">Conditions</h2>
                        <ul>
                            <li>Valable jusqu'au 31/12/2021</li>
                            <li>Valable pour les nouveaux clients</li>
                        </ul>
                    </div>
                    <div className="py-4">
                        <p>Il suffit de vous rendre sur le site de notre partenaire et d'entrer le code promo suivant
                            : <strong>DEAL10</strong></p>
                    </div>
                </div>
                <div className="card">
                    <div className="flex items-center justify-between mb-4">
                        <h2>Customer Reviews</h2>
                        <Button asChild>
                            <Link
                                to={`/products/${product.id}/create-review`}
                                aria-label="Write a Review">
                                <Star/>
                                Write a Review
                            </Link>
                        </Button>
                    </div>
                    <ProductReviews productId={product.id}/>
                </div>
            </div>
        </>
    );
};

export default ProductDetails;