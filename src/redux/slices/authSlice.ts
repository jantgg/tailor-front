// src/slices/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { register, login } from '../../api/authAPI';
import { User } from '../../types/Auth';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Thunks asíncronos para el registro y login
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await register(username, password);
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('Error desconocido');
      }
    }
  }
);

export const loginUser = createAsyncThunk<{ user: User; token: string }, { username: string; password: string }>(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await login(username, password);
      return response as { user: User; token: string };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message); 
      } else {
        return rejectWithValue('Error desconocido');
      }
    }
  }
);



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || 'Error en el registro';
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || 'Error en el inicio de sesión';
        console.log('Login failed with error:', action.payload);
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
