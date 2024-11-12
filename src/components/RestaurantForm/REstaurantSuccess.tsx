// src/components/RestaurantForm/RestaurantSuccess.tsx
import React from 'react';
import Button from '../UI/Button';

const RestaurantSuccess: React.FC = () => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <h2 className="text-tailor-blue text-lg font-semibold">Restaurante guardado</h2>
      <Button href="/main" additionalClasses="border border-black rounded-full text-black">
        Ver restaurante
      </Button>
    </div>
  );
};

export default RestaurantSuccess;
