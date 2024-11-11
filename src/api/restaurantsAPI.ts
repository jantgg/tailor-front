// src/api/restaurantsAPI.ts
import fetcher from '../utils/fetcher';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RestaurantRequestOptions {
  method: RequestMethod;
  id?: string;
  data?: Record<string, unknown>; // Datos para POST o PUT
  token?: string;
}

// Función genérica para manejar todas las operaciones CRUD de restaurantes
export const restaurantRequest = async ({ method, id, data, token }: RestaurantRequestOptions) => {
  // Determinamos la URL base
  let endpoint = '/restaurants';

  // Ajustamos la URL según el método y la presencia de `id`
  if (method === 'GET' && id) {
    // Obtener un restaurante específico
    endpoint += `/${id}`;
  } else if (method === 'PUT' || method === 'DELETE') {
    // Actualizar o eliminar un restaurante específico
    if (!id) {
      throw new Error(`El método ${method} requiere un 'id' para especificar el recurso.`);
    }
    endpoint += `/${id}`;
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
