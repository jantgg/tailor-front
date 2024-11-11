// src/types/Favorite.ts
import { User } from './Auth';
import { Restaurant } from './Restaurant';

export interface Favorite {
  id: string;
  user: User;             // Usuario que marcó como favorito
  restaurant: Restaurant; // Restaurante marcado como favorito
  createdAt: Date;
}
