// src/slices/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { register, login } from '../../api/authAPI';
import { User } from '../../types/Auth';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: { message: string; status: number } | null;
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
        return rejectWithValue({ message: error.message, status: 500 });
      } else {
        return rejectWithValue({ message: 'Error desconocido', status: 500 });
      }
    }
  }
);

export const loginUser = createAsyncThunk<{ user: User; token: string }, { username: string; password: string }>(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await login(username, password);
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue({ message: error.message, status: 500 });
      } else {
        return rejectWithValue({ message: 'Error desconocido', status: 500 });
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
        const errorPayload = action.payload as { message: string; status: number };
        state.error = errorPayload || { message: 'Error en el registro', status: 500 };
        console.log('Register failed with error:', action.payload);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
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
        const errorPayload = action.payload as { message: string; status: number };
        state.error = errorPayload || { message: 'Error en el inicio de sesión', status: 500 };
        console.log('Login failed with error:', action.payload);
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
