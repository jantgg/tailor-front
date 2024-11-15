// src/slices/restaurantsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { restaurantRequest } from '../../api/restaurantsAPI';
import { Restaurant, RestaurantData } from '../../types/Restaurant';

interface RestaurantsState {
  restaurants: Restaurant[];
  singleRestaurant: Restaurant | null;
  hoveredRestaurant: Restaurant | null;
  loading: boolean;
  error: string | null;
  formStatus: 'idle' | 'success' | 'error';
}

const initialState: RestaurantsState = {
  restaurants: [],
  singleRestaurant: null,
  hoveredRestaurant: null,
  loading: false,
  error: null,
  formStatus: 'idle',
};



const fetchRestaurants = createAsyncThunk(
  'restaurants/fetchRestaurants',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await restaurantRequest({ method: 'GET', token });
      return response as Restaurant[];
    } catch (error) {
      console.error('Error al obtener los restaurantes:', error);
      return rejectWithValue('Error al obtener los restaurantes');
    }
  }
);

const fetchRestaurant = createAsyncThunk(
  'restaurants/fetchRestaurant',
  async ({ id, token }: { id: string; token: string }, { rejectWithValue }) => {
    try {
      const response = await restaurantRequest({ method: 'GET', id, token });
      return response as Restaurant;
    } catch (error) {
      console.error('Error al obtener el restaurante:', error);
      return rejectWithValue('Error al obtener el restaurante');
    }
  }
);


const createRestaurant = createAsyncThunk(
  'restaurants/createRestaurant',
  async ({ restaurantData, token }: { restaurantData: RestaurantData; token: string }, { rejectWithValue }) => {
    try {
      const response = await restaurantRequest({ method: 'POST', data: restaurantData as Record<string, unknown>, token });
      return response as Restaurant;
    } catch (error) {
      console.error('Error al crear el restaurante:', error);
      return rejectWithValue('Error al crear el restaurante');
    }
  }
);


const updateRestaurant = createAsyncThunk(
  'restaurants/updateRestaurant',
  async ({ id, updatedData, token }: { id: string; updatedData: Record<string, unknown>; token: string }, { rejectWithValue }) => {
    try {
      const response = await restaurantRequest({ method: 'PUT', id, data: updatedData, token });
      return response as Restaurant;
    } catch (error) {
      console.error('Error al actualizar el restaurante:', error);
      return rejectWithValue('Error al actualizar el restaurante');
    }
  }
);

const deleteRestaurant = createAsyncThunk(
  'restaurants/deleteRestaurant',
  async ({ id, token }: { id: string; token: string }, { rejectWithValue }) => {
    try {
      await restaurantRequest({ method: 'DELETE', id, token });
      return id;
    } catch (error) {
      console.error('Error al eliminar el restaurante:', error);
      return rejectWithValue('Error al eliminar el restaurante');
    }
  }
);

const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    setHoveredRestaurant(state, action: PayloadAction<Restaurant | null>) {
      state.hoveredRestaurant = action.payload;
    },
    resetFormStatus(state) {
      state.formStatus = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action: PayloadAction<Restaurant[]>) => {
        state.loading = false;
        state.restaurants = action.payload;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchRestaurant.fulfilled, (state, action: PayloadAction<Restaurant>) => {
        state.loading = false;
        state.singleRestaurant = action.payload;
      })      
      .addCase(fetchRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.singleRestaurant = null;
      })
      .addCase(fetchRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.formStatus = 'idle';
      })
      .addCase(createRestaurant.fulfilled, (state, action: PayloadAction<Restaurant>) => {
        state.loading = false;
        state.restaurants.push(action.payload);
        state.formStatus = 'success';
      })
      .addCase(createRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.formStatus = 'error';
      })
      .addCase(updateRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRestaurant.fulfilled, (state, action: PayloadAction<Restaurant>) => {
        state.loading = false;
        const index = state.restaurants.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.restaurants[index] = action.payload;
        }
      })
      .addCase(updateRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRestaurant.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.restaurants = state.restaurants.filter(restaurant => restaurant.id !== action.payload);
      })
      .addCase(deleteRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export { 
  fetchRestaurants, 
  fetchRestaurant, 
  createRestaurant, 
  updateRestaurant, 
  deleteRestaurant, 
};

export const { setHoveredRestaurant, resetFormStatus } = restaurantsSlice.actions;

export default restaurantsSlice.reducer;
