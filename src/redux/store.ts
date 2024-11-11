// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import reviewsReducer from './slices/reviewsSlice';
import restaurantsReducer from './slices/restaurantsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    reviews: reviewsReducer,
    restaurants: restaurantsReducer,
  },
});

// Tipos del store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
