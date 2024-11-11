# Redux en el Proyecto

Este proyecto utiliza Redux Toolkit para gestionar el estado global de la aplicación. Aquí explicamos brevemente cómo está estructurado el store y cómo funcionan las slices y reducers en este contexto.

## Estructura del Store

La configuración del store se encuentra en `src/redux/store.ts`. Aquí es donde combinamos los diferentes slices (trozos de estado) para construir el estado global de la aplicación.

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

- **configureStore**: `configureStore` es una función proporcionada por Redux Toolkit que simplifica la creación del store. Combina automáticamente los reducers y configura middleware por defecto.
- **Reducers**: Cada slice (por ejemplo, `auth`, `reviews`, `restaurants`) tiene su propio reducer que maneja el estado específico de esa parte de la aplicación. Los reducers son importados y combinados en el store en la propiedad `reducer`.
- **RootState**: Este es el tipo que representa el estado global. `RootState` es útil para obtener el tipo de cada parte del estado cuando accedemos a ellas en los componentes.
- **AppDispatch**: Es el tipo para el `dispatch` del store. Esto facilita el uso de `dispatch` en TypeScript sin tener que definir el tipo en cada llamada.

## Slices

Cada slice es un "trozo" de estado de la aplicación que se encarga de una funcionalidad específica. En este caso, tenemos las siguientes slices:

1. **authSlice**: Maneja el estado de autenticación (registro, login, logout).
2. **reviewsSlice**: Almacena y gestiona las reseñas en la aplicación.
3. **restaurantsSlice**: Gestiona la información relacionada con los restaurantes.

Cada slice tiene sus propias acciones y reducers, y en el caso de `authSlice`, se incluyen acciones asíncronas (`registerUser`, `loginUser`) para realizar llamadas a la API y actualizar el estado según el resultado.

### Ejemplo: authSlice

En `authSlice`, definimos el estado de autenticación, incluyendo `user`, `token`, `loading`, y `error`. También definimos acciones asíncronas (thunks) para realizar el registro y el login.

- **Thunks**: Son funciones asíncronas que se usan para hacer llamadas a la API. En este caso, `registerUser` y `loginUser` son thunks que, al completarse, actualizan el estado dependiendo del éxito o el fallo de la operación.
- **Reducers**: Los reducers en `authSlice` manejan las diferentes acciones (`pending`, `fulfilled`, `rejected`) para actualizar el estado, por ejemplo, mostrando el error en caso de un fallo de autenticación.

## ¿Cómo utilizar el store en la aplicación?

- Para acceder al estado global en los componentes, usamos `useSelector` y obtenemos partes específicas del estado usando `RootState`.
- Para despachar acciones (como `loginUser` o `registerUser`), usamos `useDispatch` junto con el tipo `AppDispatch`.

¡Entendido! Aquí tienes una sección sencilla para añadir a la documentación que ilustra cómo acceder al estado y despachar acciones de Redux desde cualquier parte de la aplicación:

---

## Ejemplo de Uso en Componentes

Para acceder al estado global y despachar acciones en un componente, usa los hooks `useSelector` y `useDispatch`.

### Accediendo al Estado

Para obtener partes específicas del estado, utiliza el hook `useSelector` junto con el tipo `RootState`:

```typescript
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const user = useSelector((state: RootState) => state.auth.user);
const reviews = useSelector((state: RootState) => state.reviews.reviews);
```

### Despachando Acciones

Para despachar acciones o thunks, usa el hook `useDispatch` con el tipo `AppDispatch`:

```typescript
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { loginUser } from '../redux/slices/authSlice';

const dispatch = useDispatch<AppDispatch>();

dispatch(loginUser({ username: 'user', password: 'pass' }));
```

Esto es todo lo que necesitas para comenzar a usar el estado y las acciones de Redux en tus componentes.

## Resumen

Redux en este proyecto está organizado en módulos separados (slices) para manejar diferentes partes de la aplicación. Cada slice tiene su propio reducer y acciones, y se combina en el store global en `store.ts`. Esto facilita el acceso y la actualización del estado de la aplicación en cualquier componente.

Conforme se agreguen más funcionalidades, se pueden añadir más slices al store para gestionar otros aspectos de la aplicación.

