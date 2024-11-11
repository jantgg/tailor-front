// src/types/Review.ts
import { User } from './Auth';
import { Restaurant } from './Restaurant';

export interface Review {
  id: string;
  name: string;
  rating: number;
  comments: string;
  createdAt: Date;
  user: User;             // Usuario que dejó la reseña, referencia al tipo User
  restaurant: Restaurant; // Restaurante al que pertenece la reseña, referencia al tipo Restaurant
}
