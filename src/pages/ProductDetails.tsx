import {useQuery} from '@tanstack/react-query';
import {Link, useParams} from 'react-router-dom';
import {fetchProductById} from '../api/products';
import {ArrowLeftCircle, Star} from 'lucide-react';
import ProductImageGallery from "../components/Product/ProductImageGallery.tsx";
import RatingStars from "../components/Global/RatingStars.tsx";
import ProductReviews from "../components/Product/ProductReviews.tsx";


const ProductDetails = () => {
    const {id} = useParams();

    const {data: product, isLoading, isError, error} = useQuery({
        queryKey: ['product', id],
        queryFn: () => fetchProductById(id || ''),
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    // Ensure images have src and alt properties
    const images = product.images.map((image: string, index: number) => ({
        src: image,
        alt: `Product image ${index + 1}`
    }));

    return (
        <div className="container mx-auto">
            <Link
                to="/"
                className="btn-base btn-link btn-icon mb-4">
                <ArrowLeftCircle size={20}/>
                Back to Products
            </Link>

            <div className="bg-white rounded-lg shadow-sm p-8 mb-4">
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
            <div className="bg-white rounded-lg shadow-sm p-8 mb-4">
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
            <div className="bg-white rounded-lg shadow-sm p-8">
                <div className="flex items-center justify-between mb-4">
                    <h2>Customer Reviews</h2>
                    <Link
                        to={`/products/${product.id}/create-review`}
                        className="btn-base btn-primary btn-icon"
                    >
                        <Star size={20}/>
                        Write a Review
                    </Link>
                </div>
                <ProductReviews productId={product.id}/>
            </div>
        </div>
    );
};

export default ProductDetails;