'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function PropertyGallery({ images }) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Image principale */}
        <div className="relative h-96 w-full rounded-xl overflow-hidden mb-4">
          <Image
            src={mainImage}
            alt="Property image"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Miniatures */}
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setMainImage(image)}
              className={`relative h-20 rounded-lg overflow-hidden ${mainImage === image ? 'ring-2 ring-[#8d7364]' : ''}`}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}