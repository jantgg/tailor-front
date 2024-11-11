// src/api/reviewsAPI.ts
import fetcher from '../utils/fetcher';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ReviewRequestOptions {
  method: RequestMethod;
  reviewId?: string;
  data?: Record<string, unknown>; // Datos para POST o PUT
  token?: string;
}

// Función genérica para manejar todas las operaciones CRUD de reseñas
export const reviewRequest = async ({ method, reviewId, data, token }: ReviewRequestOptions) => {
  // Determinamos la URL base para las reseñas de un restaurante específico
  let endpoint = `/reviews`;

  // Ajustamos la URL según el método y la presencia de `reviewId`
  if (reviewId) {
    endpoint += `/${reviewId}`;
  }

  try {
    const response = await fetcher({
      method,
      endpoint,
      body: data,
      token,
    });
    return response;
  } catch (error) {
    console.error(`Error en la operación ${method} en ${endpoint}:`, error);
    throw error;
  }
};
