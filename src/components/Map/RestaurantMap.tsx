import React from 'react';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { Restaurant } from '../../types/Restaurant';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import mapStyle from '../../styles/mapStyle'; // Importa el estilo oscuro del mapa

interface RestaurantMapProps {
  restaurants: Restaurant[];
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 40.713829, // Coordenada para el centro del mapa
  lng: -73.989667,
};

// Tamaño reducido en los SVGs de los iconos de los marcadores
const normalIcon = 'data:image/svg+xml;base64,' + btoa(`
  <svg width="50" height="66.5" viewBox="0 0 100 133" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M50 132.771C50 132.771 100 78.3852 100 50.771C100 23.1568 77.6142 0.770996 50 0.770996C22.3858 0.770996 0 23.1568 0 50.771C0 78.3852 50 132.771 50 132.771ZM50 48.771C57.1797 48.771 63 42.9507 63 35.771C63 28.5913 57.1797 22.771 50 22.771C42.8203 22.771 37 28.5913 37 35.771C37 42.9507 42.8203 48.771 50 48.771Z" fill="#8DA0F0"/>
  </svg>
`);
const hoverIcon = 'data:image/svg+xml;base64,' + btoa(`
  <svg width="50" height="66.5" viewBox="0 0 100 133" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M50 132.771C50 132.771 100 78.3852 100 50.771C100 23.1568 77.6142 0.770996 50 0.770996C22.3858 0.770996 0 23.1568 0 50.771C0 78.3852 50 132.771 50 132.771ZM50 48.771C57.1797 48.771 63 42.9507 63 35.771C63 28.5913 57.1797 22.771 50 22.771C42.8203 22.771 37 28.5913 37 35.771C37 42.9507 42.8203 48.771 50 48.771Z" fill="#264BEB"/>
  </svg>
`);

const RestaurantMap: React.FC<RestaurantMapProps> = ({ restaurants = [] }) => {
  const hoveredRestaurant = useSelector((state: RootState) => state.restaurants.hoveredRestaurant);

  return (
    <GoogleMap 
      mapContainerStyle={mapContainerStyle} 
      center={center} 
      zoom={13} 
      options={{ styles: mapStyle }} // Aplica el estilo oscuro aquí
    >
      {restaurants.map((restaurant) => (
        <MarkerF
          key={restaurant.id}
          position={{
            lat: restaurant.latlng.lat,
            lng: restaurant.latlng.lng,
          }}
          icon={hoveredRestaurant?.id === restaurant.id ? hoverIcon : normalIcon}
        />
      ))}
    </GoogleMap>
  );
};

export default RestaurantMap;
