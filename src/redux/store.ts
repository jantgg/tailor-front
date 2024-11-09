// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import commentsReducer from './slices/commentsSlice';
import restaurantsReducer from './slices/restaurantsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    comments: commentsReducer,
    restaurants: restaurantsReducer,
  },
});

// Tipos del store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
