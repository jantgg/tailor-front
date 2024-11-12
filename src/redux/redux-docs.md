# Redux en el Proyecto

Este proyecto utiliza Redux Toolkit para gestionar el estado global de la aplicación. A continuación, explicamos cómo está estructurado el store y el propósito de cada slice y reducer en el contexto de la aplicación.

## Estructura del Store

La configuración del store se encuentra en `src/redux/store.ts`, donde se combinan las diferentes slices para construir el estado global.

```typescript
// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import reviewsReducer from './slices/reviewsSlice';
import restaurantsReducer from './slices/restaurantsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    reviews: reviewsReducer,
    restaurants: restaurantsReducer,
  },
});

// Tipos del store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Explicación del Código

- **configureStore**: Función de Redux Toolkit que simplifica la creación del store y configuración de middleware.
- **Reducers**: Cada slice (`auth`, `reviews`, `restaurants`) tiene su propio reducer que maneja una parte específica del estado.
- **RootState**: Tipo que representa el estado global, útil en componentes que acceden al estado.
- **AppDispatch**: Tipo de `dispatch` para facilitar su uso con TypeScript.

## Slices

Cada slice maneja una parte del estado global y se encarga de una funcionalidad específica:

1. **authSlice**: Maneja el estado de autenticación, como el inicio de sesión, registro y cierre de sesión.
2. **reviewsSlice**: Almacena y gestiona las reseñas de los usuarios.
3. **restaurantsSlice**: Gestiona la información de restaurantes, incluyendo operaciones CRUD.

Cada slice tiene sus propios **reducers** y **acciones asíncronas** para realizar operaciones API y actualizar el estado.

### authSlice

`authSlice` contiene el estado de autenticación y las acciones para el registro, inicio de sesión y cierre de sesión. Utiliza `localStorage` para guardar el token y la información del usuario, proporcionando persistencia.

```typescript
// Acciones en authSlice
dispatch(registerUser({ username, password }));
dispatch(loginUser({ username, password }));
dispatch(logout());
```

### reviewsSlice

`reviewsSlice` permite gestionar reseñas, incluyendo la creación, actualización, eliminación, y obtención de reseñas individuales o todas las reseñas.

```typescript
// Acciones en reviewsSlice
dispatch(fetchReviews({ token }));
dispatch(createReview({ reviewData, token }));
dispatch(updateReview({ reviewId, updatedData, token }));
dispatch(deleteReview({ reviewId, token }));
```

### restaurantsSlice

`restaurantsSlice` permite gestionar la información de restaurantes con operaciones CRUD. Además, maneja la selección de restaurantes cuando el usuario interactúa en la interfaz.

```typescript
// Acciones en restaurantsSlice
dispatch(fetchRestaurants(token));
dispatch(fetchRestaurant({ id, token }));
dispatch(createRestaurant({ restaurantData, token }));
dispatch(updateRestaurant({ id, updatedData, token }));
dispatch(deleteRestaurant({ id, token }));
```

## Ejemplo de Uso en Componentes

Para acceder al estado y despachar acciones en un componente, utiliza los hooks `useSelector` y `useDispatch`.

### Accediendo al Estado

```typescript
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const user = useSelector((state: RootState) => state.auth.user);
const reviews = useSelector((state: RootState) => state.reviews.reviews);
const restaurants = useSelector((state: RootState) => state.restaurants.restaurants);
```

### Despachando Acciones

```typescript
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { loginUser } from '../redux/slices/authSlice';

const dispatch = useDispatch<AppDispatch>();

dispatch(loginUser({ username: 'user', password: 'pass' }));
```

## Resumen

Redux en este proyecto está organizado en módulos (slices) para manejar diferentes partes de la aplicación. Cada slice tiene sus propios reducers y acciones que se combinan en el `store.ts`, facilitando el acceso y actualización del estado en los componentes.