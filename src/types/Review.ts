// src/types/Review.ts
import { User } from './Auth';
import { Restaurant } from './Restaurant';

export interface Review {
  id: string;
  name: string;
  rating: number;
  comments: string;
  createdAt: Date;
  user: User;
  restaurant: Restaurant;
}

// Tipo para la creación de una reseña en el frontend (solo campos necesarios)
export interface ReviewCreatePayload {
  rating: number;
  comments: string;
  userId: string;
  restaurantId: string;
  [key: string]: unknown;
}