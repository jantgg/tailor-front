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


export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: { message: string; status: number } | null;
}