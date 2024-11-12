// ImageUploader.tsx

import React, { useState } from 'react';
import Input from '../UI/Input';
import Button from '../UI/Button';

interface ImageUploaderProps {
  onImageUrlChange: (url: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUrlChange }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [imageAdded, setImageAdded] = useState(false);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  const handleAddImage = () => {
    setImageAdded(!imageAdded);
    if (!imageAdded) {
      onImageUrlChange(imageUrl); // Solo llamamos a onImageUrlChange cuando la imagen es añadida
    } else {
      onImageUrlChange(''); // Reseteamos la URL si se elimina la imagen
    }
  };

  return (
    <div
      className="flex flex-col items-center w-full h-full border border-black rounded-2xl justify-center bg-cover bg-center px-4 min-h-[300px]"
      style={{ backgroundImage: imageAdded ? `url(${imageUrl})` : 'none' }}
    >
      {!imageAdded && (
        <Input
          label=""
          placeholder="Ingrese URL de la imagen"
          value={imageUrl}
          onChange={handleUrlChange}
          name="imageUrl"
          additionalClasses="mb-2 border-black text-2xl"
        />
      )}
      <Button
        text={imageAdded ? 'Eliminar' : 'Añadir'}
        onClick={handleAddImage}
        additionalClasses="text-2xl mt-2 rounded-md"
        type="button"
      />

    </div>
  );
};

export default ImageUploader;
