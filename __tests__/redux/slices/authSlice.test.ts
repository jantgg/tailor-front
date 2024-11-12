// __tests__/redux/slices/authSlice.test.ts
import authReducer, { logout, registerUser, loginUser } from '../../../src/redux/slices/authSlice';
import { AuthState } from '../../../src/types/Auth';
import { AnyAction } from '@reduxjs/toolkit';
import { jest } from '@jest/globals';

// Mock completo de `storageManager`
// Mockeamos el módulo `storageManager` para evitar interactuar con el almacenamiento real durante las pruebas.
// Esto asegura que el comportamiento de almacenamiento local no interfiera con las pruebas del slice.
jest.mock('../../../src/utils/storageManager', () => ({
  __esModule: true,
  saveToken: jest.fn(), // Creamos un mock para cada función de `storageManager`
  getToken: jest.fn(),
  removeToken: jest.fn(),
  saveUser: jest.fn(),
  getUser: jest.fn(),
  removeUser: jest.fn(),
}));

// Estado inicial simulado para el test
// Este es el estado inicial del slice `auth` utilizado como referencia en todas las pruebas.
const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Reiniciar todos los mocks antes de cada test
// Antes de ejecutar cada prueba, limpiamos el estado de los mocks para asegurarnos de que no haya efectos secundarios
beforeEach(() => {
  jest.clearAllMocks();
});

describe('authSlice', () => {
  // Prueba para el estado inicial
  it('debería devolver el estado inicial', () => {
    // Verifica que el reducer devuelve el estado inicial cuando no se le proporciona ninguna acción
    expect(authReducer(undefined, {} as AnyAction)).toEqual(initialState);
  });

  // Prueba para el `logout`
  it('debería manejar el logout correctamente', () => {
    // Simulamos un estado previo donde hay un usuario autenticado y un token
    const previousState: AuthState = {
      ...initialState,
      user: { id: '123', username: 'John Doe', createdAt: new Date(), updatedAt: new Date(), favorites: [], reviews: [] },
      token: 'abc123',
    };

    // Reducimos el estado utilizando la acción `logout()`
    const state = authReducer(previousState, logout());

    // Verificamos que, después de hacer logout, los valores `user`, `token` y `error` sean `null`
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.error).toBeNull();
  });

  // Pruebas para los `extraReducers` que manejan acciones asíncronas (registerUser, loginUser)
  describe('extraReducers', () => {
    // Prueba para el estado `pending` de `registerUser`
    it('debería manejar registerUser.pending', () => {
      // Cuando se activa la acción `registerUser.pending`, `loading` debe ser `true`
      const action = { type: registerUser.pending.type };
      const state = authReducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    // Prueba para el estado `fulfilled` de `registerUser`
    it('debería manejar registerUser.fulfilled', () => {
      // Simulamos la respuesta exitosa de `registerUser`
      const mockUser = { id: '123', name: 'John Doe', email: 'john@example.com' };
      const mockToken = 'mockToken';
      const action = { type: registerUser.fulfilled.type, payload: { user: mockUser, token: mockToken } };
      const state = authReducer(initialState, action);

      // Verificamos que el estado final tiene `user` y `token` asignados correctamente y que `loading` se establezca a `false`
      expect(state.loading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.token).toEqual(mockToken);
      expect(state.error).toBeNull();
    });

    // Prueba para el estado `rejected` de `registerUser`
    it('debería manejar registerUser.rejected', () => {
      // Simulamos un error en la acción `registerUser`
      const errorPayload = { message: 'Error en el registro', status: 500 };
      const action = { type: registerUser.rejected.type, payload: errorPayload };
      const state = authReducer(initialState, action);

      // Verificamos que `loading` se establece a `false` y el `error` contiene el mensaje adecuado
      expect(state.loading).toBe(false);
      expect(state.error).toEqual(errorPayload);
    });

    // Prueba para el estado `pending` de `loginUser`
    it('debería manejar loginUser.pending', () => {
      // Cuando se activa la acción `loginUser.pending`, `loading` debe ser `true`
      const action = { type: loginUser.pending.type };
      const state = authReducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    // Prueba para el estado `fulfilled` de `loginUser`
    it('debería manejar loginUser.fulfilled', () => {
      // Simulamos una respuesta exitosa de `loginUser`
      const mockUser = { id: '123', name: 'John Doe', email: 'john@example.com' };
      const mockToken = 'mockToken';
      const action = { type: loginUser.fulfilled.type, payload: { user: mockUser, token: mockToken } };
      const state = authReducer(initialState, action);

      // Verificamos que el estado final tiene `user` y `token` asignados correctamente y que `loading` se establezca a `false`
      expect(state.loading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.token).toEqual(mockToken);
      expect(state.error).toBeNull();
    });

    // Prueba para el estado `rejected` de `loginUser`
    it('debería manejar loginUser.rejected', () => {
      // Simulamos un error en la acción `loginUser`
      const errorPayload = { message: 'Error en el inicio de sesión', status: 500 };
      const action = { type: loginUser.rejected.type, payload: errorPayload };
      const state = authReducer(initialState, action);

      // Verificamos que `loading` se establece a `false` y `error` contiene el mensaje adecuado
      expect(state.loading).toBe(false);
      expect(state.error).toEqual(errorPayload);
    });
  });
});
