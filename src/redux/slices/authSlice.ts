// src/slices/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { register, login } from '../../api/authAPI';
import { User, AuthState } from '../../types/Auth';
import { saveToken, getToken, removeToken, saveUser, getUser, removeUser } from '../../utils/storageManager';

const initialState: AuthState = {
  user: getUser(), // Cargar el usuario desde localStorage si existe
  token: getToken(), // Cargar el token desde localStorage si existe
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
      return {
        user: response.user,
        token: response.token,
      };
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
    setTokenFromStorage: (state) => {
      const token = getToken();
      const user = getUser();
      if (token) {
        state.token = token;
      }
      if (user) {
        state.user = user;
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      removeToken(); // Eliminar el token de localStorage
      removeUser(); // Eliminar el usuario de localStorage
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
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        saveToken(action.payload.token); // Guardar el token en localStorage
        saveUser(action.payload.user); // Guardar el user en localStorage
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
        saveToken(action.payload.token); // Guardar el token en localStorage
        saveUser(action.payload.user); // Guardar el user en localStorage
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        const errorPayload = action.payload as { message: string; status: number };
        state.error = errorPayload || { message: 'Error en el inicio de sesión', status: 500 };
      });
  },
});

export const { logout, setTokenFromStorage } = authSlice.actions;

export default authSlice.reducer;
