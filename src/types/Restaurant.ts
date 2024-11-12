// src/types/Restaurant.ts
import { Review } from './Review';
import { Favorite } from './Favorite';

export interface OperatingHours {
    [day: string]: string;
  }

export interface LatLng {
    lat: number;
    lng: number;
  }
export interface Restaurant {
  id: string;
  name: string;
  neighborhood: string;
  photograph: string;
  address: string;
  latlng: LatLng;
  image: string;
  cuisine_type: string;
  operating_hours: OperatingHours;
  createdAt: Date;
  updatedAt: Date;
  reviews: Review[];       // Datos completos de las reseñas
  favorites: Favorite[];   // Datos completos de los favoritos
  averageRating: number;
}
