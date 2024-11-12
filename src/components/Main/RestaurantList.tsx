// src/components/RestaurantList/RestaurantList.tsx

import React from 'react';
import RestaurantListItem from './RestaurantListItem';
import { Restaurant } from '../../types/Restaurant';

interface RestaurantListProps {
  restaurants: Restaurant[];
}

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants }) => {

  return (
    <div className="flex flex-col gap-4">
      {restaurants.map((restaurant, index) => (
        <RestaurantListItem
          key={restaurant.id}
          restaurant={restaurant}
          className={index === restaurants.length - 1 ? 'mb-4' : ''}
        />
      ))}
    </div>
  );
};

export default RestaurantList;
