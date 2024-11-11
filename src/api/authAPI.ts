// src/api/authAPI.ts
import fetcher from '../utils/fetcher';
import { User } from '../types/Auth';

// Función para registrar un nuevo usuario
export const register = async (username: string, password: string): Promise<{ user: User; token: string }> => {
  try {
    const response = await fetcher({
      method: 'POST',
      endpoint: '/auth/register',
      body: { username, password },
    });
    return response as { user: User; token: string };
  } catch (error: unknown) {
    console.error('Error en el registro:', error);

    // Comprobamos si el error tiene el formato de un error de respuesta de la API
    if (typeof error === 'object' && error !== null && 'status' in error && 'message' in error) {
      // Si el error tiene un 'status' y 'message', lanzamos el error con el mensaje de la API
      const apiError = error as { status: number; message: string };
      throw new Error(apiError.message);  // Propagamos el mensaje de error proporcionado por el backend
    }

    // Si el error no es lo esperado, lanzamos un error genérico
    throw new Error('Error en el registro');  // Fallback para errores no esperados
  }
};

// Función para iniciar sesión
export const login = async (username: string, password: string): Promise<{ user: User; token: string }> => {
  try {
    const response = await fetcher({
      method: 'POST',
      endpoint: '/auth/login',
      body: { username, password },
    });
    return response as { user: User; token: string };
  } catch (error: unknown) {
    console.error('Error en el login:', error);

    // Comprobamos si el error tiene el formato de un error de respuesta de la API
    if (typeof error === 'object' && error !== null && 'status' in error && 'message' in error) {
      // Si el error tiene un 'status' y 'message', lanzamos el error con el mensaje de la API
      const apiError = error as { status: number; message: string };
      throw new Error(apiError.message);  // Propagamos el mensaje de error proporcionado por el backend
    }

    // Si el error no es lo esperado, lanzamos un error genérico
    throw new Error('Error en el inicio de sesión');  // Fallback para errores no esperados
  }
};

/**
 * La razón de este manejo de errores es asegurar que cualquier error proveniente de la API 
 * (como "Credenciales inválidas" o "Usuario ya existe") sea capturado correctamente y
 * propagado con su mensaje específico. En lugar de lanzar errores genéricos, queremos 
 * proporcionar información más detallada al usuario, según la respuesta que nos da el servidor.
 * Si el error no tiene la estructura esperada (por ejemplo, no contiene 'status' ni 'message'),
 * se lanza un error genérico para evitar que la aplicación falle inesperadamente. 
 * Esto asegura un flujo de error controlado, robusto y coherente entre las funciones de login y registro.
 */
