// src/slices/reviewsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { reviewRequest } from '../../api/reviewsAPI';
import { Review, ReviewCreatePayload } from '../../types/Review';

interface ReviewsState {
  reviews: Review[];
  singleReview: Review | null;
  loading: boolean;
  error: string | null;
}

const initialState: ReviewsState = {
  reviews: [],
  singleReview: null,
  loading: false,
  error: null,
};


// Async thunks para operaciones CRUD de reseñas

// Obtener todas las reseñas de la base de datos
const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async ({ token }: { token: string }, { rejectWithValue }) => {
    try {
      const response = await reviewRequest({ method: 'GET', token });
      return response as Review[];
    } catch (error) {
      console.error('Error al obtener todas las reseñas:', error);
      return rejectWithValue('Error al obtener todas las reseñas');
    }
  }
);

// Obtener una reseña en particular
const fetchReview = createAsyncThunk(
  'reviews/fetchReview',
  async ({ reviewId, token }: { reviewId: string; token: string }, { rejectWithValue }) => {
    try {
      const response = await reviewRequest({ method: 'GET', reviewId, token });
      return response as Review;
    } catch (error) {
      console.error(`Error al obtener la reseña con ID ${reviewId}:`, error);
      return rejectWithValue(`Error al obtener la reseña con ID ${reviewId}`);
    }
  }
);

const createReview = createAsyncThunk(
  'reviews/createReview',
  async ({ reviewData, token }: { reviewData: ReviewCreatePayload; token: string }, { rejectWithValue }) => {
    try {
      const response = await reviewRequest({ 
        method: 'POST', 
        data: reviewData as Record<string, unknown>,
        token 
      });
      return response as Review;
    } catch (error) {
      console.error('Error al crear la reseña:', error);
      return rejectWithValue('Error al crear la reseña');
    }
  }
);


const updateReview = createAsyncThunk(
  'reviews/updateReview',
  async ({ reviewId, updatedData, token }: { reviewId: string; updatedData: Record<string, unknown>; token: string }, { rejectWithValue }) => {
    try {
      const response = await reviewRequest({ method: 'PUT', reviewId, data: updatedData, token });
      return response as Review;
    } catch (error) {
      console.error('Error al actualizar la reseña:', error);
      return rejectWithValue('Error al actualizar la reseña');
    }
  }
);

const deleteReview = createAsyncThunk(
  'reviews/deleteReview',
  async ({ reviewId, token }: { reviewId: string; token: string }, { rejectWithValue }) => {
    try {
      await reviewRequest({ method: 'DELETE', reviewId, token });
      return reviewId;
    } catch (error) {
      console.error('Error al eliminar la reseña:', error);
      return rejectWithValue('Error al eliminar la reseña');
    }
  }
);

// Creación del slice
const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action: PayloadAction<Review[]>) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchReview.fulfilled, (state, action: PayloadAction<Review>) => {
        state.loading = false;
        state.singleReview = action.payload;
      })      
      .addCase(fetchReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.singleReview = null;
      })
      .addCase(createReview.fulfilled, (state, action: PayloadAction<Review>) => {
        state.loading = false;
        state.reviews.push(action.payload);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReview.fulfilled, (state, action: PayloadAction<Review>) => {
        state.loading = false;
        const index = state.reviews.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReview.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.reviews = state.reviews.filter(review => review.id !== action.payload);
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});


export { fetchReviews, createReview, updateReview, deleteReview, fetchReview };
export default reviewsSlice.reducer;
