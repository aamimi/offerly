import {useQuery} from '@tanstack/react-query';
import {useNavigate, useParams} from 'react-router-dom';
import {fetchProductById} from '../api/products';
import {ArrowLeftCircle} from 'lucide-react';
import ProductImageGallery from "../components/Product/ProductImageGallery.tsx";
import RatingStars from "../components/Global/RatingStars.tsx";
import ProductReviews from "../components/Product/ProductReviews.tsx";

const ProductDetails = () => {
    const {id} = useParams();
    const navigate = useNavigate();

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
        <div className="container mx-auto px-4 py-8">
            <button
                onClick={() => navigate(-1)}
                className="mb-6 btn-icon btn-link"
            >
                <ArrowLeftCircle size={20}/>
                Back to Products
            </button>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden p-8 mb-3">
                <div className="md:flex">
                    <div className="md:flex-shrink-0">
                        <div className="md:flex-shrink-0">
                            <ProductImageGallery images={images}/>
                        </div>
                    </div>
                    <div>
                        <h1 className="mb-2">{product.title}</h1>
                        <div className="mb-4">
                            <span className="text-2xl font-bold text-gray-900">
                                ${product.price}
                            </span>
                        </div>
                        <div className="mb-4">
                            <RatingStars rating={product.rating} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden p-8 mb-3">
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
            <div className="bg-white rounded-lg shadow-sm overflow-hidden p-8">
                <h2 className="mb-4 text-xl font-semibold">Customer Reviews</h2>
                <ProductReviews productId={product.id} />
            </div>
        </div>
    );
};

export default ProductDetails;