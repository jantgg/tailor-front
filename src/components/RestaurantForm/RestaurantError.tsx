// src/components/RestaurantForm/RestaurantError.tsx
import React from 'react';
import Button from '../UI/Button';

const RestaurantError: React.FC = () => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <h2 className="text-tailor-blue text-lg font-semibold">Ups, algo salió mal</h2>
      <Button href="/restaurants/create" additionalClasses="border border-black rounded-full text-black">
        Volver
      </Button>
    </div>
  );
};

export default RestaurantError;
