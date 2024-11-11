// src/types/Auth.ts
import { Favorite } from './Favorite';
import { Review } from './Review';

export interface User {
  id: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  favorites: Favorite[];
  reviews: Review[];
}
