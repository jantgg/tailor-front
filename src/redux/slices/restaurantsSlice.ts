// src/slices/restaurantsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Restaurant {
  id: string;
  name: string;
  address: string;
  description: string;
}

interface RestaurantsState {
  restaurants: Restaurant[];
}

const initialState: RestaurantsState = {
  restaurants: [],
};

const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    addRestaurant: (state, action: PayloadAction<Restaurant>) => {
      state.restaurants.push(action.payload);
    },
    updateRestaurant: (state, action: PayloadAction<Restaurant>) => {
      const index = state.restaurants.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.restaurants[index] = action.payload;
      }
    },
    deleteRestaurant: (state, action: PayloadAction<string>) => {
      state.restaurants = state.restaurants.filter(restaurant => restaurant.id !== action.payload);
    },
  },
});

export const { addRestaurant, updateRestaurant, deleteRestaurant } = restaurantsSlice.actions;

export default restaurantsSlice.reducer;
