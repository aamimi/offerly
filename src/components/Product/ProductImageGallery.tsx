import {useState} from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react';

interface Image {
    src: string;
    alt: string;
}

interface ProductImageGalleryProps {
    images: Image[];
}

const ProductImageGallery = ({images}: ProductImageGalleryProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

    const handleNextImage = (): void => {
        setCurrentImageIndex((prev: number): number =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    const handlePrevImage = (): void => {
        setCurrentImageIndex((prev: number): number =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    const handleThumbnailClick = (index: number): void => {
        setCurrentImageIndex(index);
    };

    if (!images || images.length === 0) {
        return <div>No images available</div>;
    }

    return (
        <div className="relative w-full max-w-md mx-auto flex">
            {/* Thumbnail Strip */}
            {images.length > 1 && (
                <div className="flex flex-col justify-center space-y-2 mr-4">
                    {images.map((img, index) => (
                        <button key={index} onClick={() => handleThumbnailClick(index)}>
                            <img
                                src={img.src}
                                alt={img.alt}
                                className={`w-16 h-16 object-cover cursor-pointer border-2 ${
                                    index === currentImageIndex
                                        ? 'border-blue-500'
                                        : 'border-transparent hover:border-gray-300'
                                }`}
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Main Image */}
            <div className="relative flex-1">
                <img
                    src={images[currentImageIndex].src}
                    alt={images[currentImageIndex].alt}
                    className="w-80 h-80 object-contain mx-auto"
                />

                {/* Navigation Buttons */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={handlePrevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2 hover:bg-white/75"
                        >
                            <ChevronLeft className="w-6 h-6"/>
                        </button>
                        <button
                            onClick={handleNextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2 hover:bg-white/75"
                        >
                            <ChevronRight className="w-6 h-6"/>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductImageGallery;