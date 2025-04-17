import { useState } from "react";

interface ImageGalleryProps {
  images: string[];
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-2 w-full">
      <h2 className="text-xl font-bold">Gallery</h2>

      {/* Selected image preview */}
      {selectedImage !== null && (
        <div className="relative mb-2">
          <img
            src={images[selectedImage]}
            alt={`Selected image ${selectedImage + 1}`}
            className="w-full rounded-lg object-contain max-h-96"
          />
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 text-white p-1 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}

      {/* Thumbnail grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
        {images.map((src, index) => (
          <div
            key={index}
            className="cursor-pointer rounded-lg overflow-hidden border border-gray-600 hover:border-blue-500 transition-all"
            onClick={() => setSelectedImage(index)}
          >
            <img
              src={src}
              alt={`Image ${index + 1}`}
              className="w-full h-24 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};