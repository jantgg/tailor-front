import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'; // Importa useRouter
import { setHoveredRestaurant } from '../../redux/slices/restaurantsSlice';
import { RootState } from '../../redux/store';
import StarRating from '../UI/StarRating';
import { Restaurant } from '../../types/Restaurant';

interface RestaurantListItemProps {
  restaurant: Restaurant;
  className?: string;
}

const RestaurantListItem: React.FC<RestaurantListItemProps> = ({ restaurant, className }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const hoveredRestaurant = useSelector((state: RootState) => state.restaurants.hoveredRestaurant);

  // Funciones para manejar el hover
  const handleMouseEnter = () => {
    dispatch(setHoveredRestaurant(restaurant)); 
  };
  const handleMouseLeave = () => {
    // dispatch(setHoveredRestaurant(null)); 
  };

  // Función para manejar el clic y redirigir a la vista de detalles
  const handleClick = () => {
    console.log("click"); // Confirmación del clic
    console.log("Navigating to:", `/restaurants/${restaurant.id}`); // Confirmar URL
    router.push(`/restaurants/${restaurant.id}`);
  };
  
  return (
    <div
      onMouseEnter={handleMouseEnter} // Activa el hover al entrar
      onMouseLeave={handleMouseLeave} // Desactiva el hover al salir
      onClick={handleClick} // Redirige al hacer clic
      className={`flex items-start gap-4 p-4 rounded-lg text-xl xl:text-2xl cursor-pointer ${
        hoveredRestaurant?.id === restaurant.id ? 'opacity-100' : 'md:opacity-60 opacity-100'
      } ${className}`}
    >
      <div className="w-32 h-32 2xl:w-52 2xl:h-52">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
      <div className="flex flex-col justify-between h-full 2xl:py-2">
        <div className="flex flex-col">
          <h3 className="font-semibold text-gray-800">{restaurant.name}</h3>
          <p className="text-gray-600">{restaurant.address}</p>
        </div>

        <div className="mt-1 grid grid-cols-1 md:grid-cols-2 gap-x-2">
          <StarRating rating={restaurant.averageRating} maxRating={5} />
          <span className="text-gray-500">({restaurant.reviews.length} comentarios)</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantListItem;
