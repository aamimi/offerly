import {useState} from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {Button} from "@ui/button.tsx";

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
                                        ? 'border-zinc-400'
                                        : 'border-transparent hover:border-zinc-200'
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
                        <Button
                            variant='ghost'
                            size='icon'
                            className="absolute left-2 top-1/2 -translate-y-1/2"
                            onClick={handlePrevImage}
                            aria-label='Previous Image'>
                            <ChevronLeft/>
                        </Button>
                        <Button
                            variant='ghost'
                            size='icon'
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                            onClick={handleNextImage}
                            aria-label='Previous Image'>
                            <ChevronRight/>
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductImageGallery;