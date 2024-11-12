// src/pages/restaurants/create.tsx
import React from 'react';
import CreateRestaurant from '../../layouts/CreateRestaurant';
import RestaurantForm from '../../components/RestaurantForm/RestaurantForm';

const Create: React.FC = () => {
  return (
    <CreateRestaurant >
      <RestaurantForm  />
    </CreateRestaurant>
  );
};

export default Create;
