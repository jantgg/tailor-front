// src/components/Home/HeroImage.tsx
import React from 'react';
import Image from 'next/image';

interface HeroImageProps {
  imageSrc: string;
}

const HeroImage: React.FC<HeroImageProps> = ({ imageSrc }) => {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-3xl shadow-md">
      <Image
        src={imageSrc}
        alt="Imagen de restaurante"
        layout="fill"
        objectFit="cover"
        className="rounded-3xl relative"
      />
    </div>
  );
};

export default HeroImage;
