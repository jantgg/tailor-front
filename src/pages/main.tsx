import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchRestaurants, setHoveredRestaurant } from '../redux/slices/restaurantsSlice';
import MainLayout from "../layouts/MainLayout";
import RestaurantList from '../components/Main/RestaurantList';
import Spinner from '../components/UI/Spinner';
import { useLoadScript } from '@react-google-maps/api';

// Carga dinámica del componente RestaurantMap solo en el cliente
const RestaurantMap = dynamic(() => import('../components/Map/RestaurantMap'), {
  ssr: false, // Deshabilita el renderizado del lado del servidor
});

const Main = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { restaurants, loading } = useSelector((state: RootState) => state.restaurants);
  const token = useSelector((state: RootState) => state.auth.token);

  // Llamada inicial a la API para obtener restaurantes si el token está disponible
  useEffect(() => {
    if (token) {
      dispatch(fetchRestaurants(token));
    }
  }, [dispatch, token]);

  // Efecto para establecer el primer restaurante en hover después de cargar
  useEffect(() => {
    if (restaurants.length > 0 && !loading) {
      dispatch(setHoveredRestaurant(restaurants[0])); // Establece el primer restaurante en hover
    }
  }, [restaurants, loading, dispatch]);

  // Carga el script de Google Maps
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  if (loadError) return <div>Error al cargar el mapa</div>;

  return (
    <MainLayout 
      left={
        loading || !isLoaded ? (
          <div className="flex justify-center items-center h-full">
            <Spinner size="w-12 h-12" />
          </div>
        ) : (
          <RestaurantMap restaurants={restaurants} />
        )
      }
      right={<RestaurantList restaurants={restaurants} />}
    />
  );
};

export default Main;
