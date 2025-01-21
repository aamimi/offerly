import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../api/products';
import { ArrowLeftCircle } from 'lucide-react';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: product, isLoading, isError, error } = useQuery({
        queryKey: ['product', id],
        queryFn: () => fetchProductById(id || ''),
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <button
                onClick={() => navigate(-1)}
                className="mb-6 btn-icon btn-link"
            >
                <ArrowLeftCircle size={20} />
                Back to Products
            </button>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:flex-shrink-0">
                        <img
                            className="h- w-full object-cover md:w-48"
                            src={product.thumbnail || 'https://via.placeholder.com/150'}
                            alt={product.title}
                            loading="lazy"
                        />
                    </div>
                    <div className="p-8">
                        <h1 className="mb-2">{product.title}</h1>
                        <p className="text-gray-700 mb-4">{product.description}</p>
                        <div className="mb-4">
                            <span className="text-2xl font-bold text-gray-900">
                                ${product.price}
                            </span>
                        </div>
                        <div className="mb-4">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                Category: {product.category}
                            </span>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                                Rating: {product.rating}/5
                            </span>
                        </div>
                        <p>
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis

                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;