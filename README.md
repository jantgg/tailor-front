# Instalación
## Para lanzar el frontend en local
```
npm install
npm run dev
```
## Configuraciones necesarias
### Crear .env en la raíz
```
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="AIzaSyCE9lkuUsULKhPHII55eICk6WSEzaCKqXM"
```
# Estrutura de carpetas

```plaintext
frontend/
│
├── node_modules/
├── public/
│   ├── images/
│   └── svgs/
│
├── src/
│   ├── api/
│   │   ├── authAPI.ts
│   │   ├── restaurantsAPI.ts
│   │   └── reviewsAPI.ts
│   │
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── AuthCard.tsx
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterCard.tsx
│   │   │   └── RegisterForm.tsx
│   │   │
│   │   ├── Home/
│   │   │   ├── Landing/
│   │   │   │   ├── HeroImage.tsx
│   │   │   │   ├── WelcomeCard.tsx
│   │   │   └── Loader.tsx
│   │   │
│   │   ├── Main/
│   │   │   ├── RestaurantList.tsx
│   │   │   └── RestaurantListItem.tsx
│   │   │
│   │   ├── Map/
│   │   │   └── RestaurantMap.tsx
│   │   │
│   │   ├── RestaurantForm/
│   │   │   ├── ImageUploader.tsx
│   │   │   ├── RestaurantError.tsx
│   │   │   └── RestaurantSuccess.tsx
│   │   │
│   │   ├── Reviews/
│   │   │   ├── PostReview.tsx
│   │   │   ├── ReviewItem.tsx
│   │   │   └── ReviewList.tsx
│   │   │
│   │   └── UI/
│   │       ├── Arrow.tsx
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── InputPassword.tsx
│   │       ├── Logo.tsx
│   │       ├── LogoName.tsx
│   │       ├── Navbar.tsx
│   │       ├── Spinner.tsx
│   │       ├── StarRating.tsx
│   │       ├── TextArea.tsx
│   │       └── TextField.tsx
│   │
│   ├── layouts/
│   │   ├── CreateRestaurant.tsx
│   │   ├── Double.tsx
│   │   ├── GeneralPadding.tsx
│   │   ├── MainLayout.tsx
│   │   └── MainPadding.tsx
│   │
│   ├── pages/
│   │   ├── restaurants/
│   │   │   ├── [id].tsx
│   │   │   ├── create.tsx
│   │   │   └── index.tsx
│   │   │
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   ├── login.tsx
│   │   ├── main.tsx
│   │   └── register.tsx
│   │
│   ├── redux/
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   ├── restaurantsSlice.ts
│   │   │   └── reviewsSlice.ts
│   │   │
│   │   ├── store.ts
│   │   └── redux-docs.md
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   └── mapStyle.ts
│   │
│   ├── types/
│   │   ├── Auth.ts
│   │   ├── Favorite.ts
│   │   ├── Restaurant.ts
│   │   └── Review.ts
│   │
│   └── utils/
│       ├── fetcher.ts
│       └── storageManager.ts
│
├── .env
├── .eslintrc.json
├── .gitignore
├── next-env.d.ts
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.js
├── README.md
├── redux-docs.md 
├── tailwind.config.ts
└── tsconfig.json
```

---

## Descripción de Archivos

- **node_modules**: Contiene todas las dependencias y librerías instaladas para el proyecto, gestionadas por Node.js.
- **public**: Carpeta de archivos estáticos accesibles públicamente.
  - **images**: Carpeta para almacenar imágenes estáticas.
  - **svgs**: Carpeta para íconos o gráficos vectoriales SVG.

#### Carpeta `src`

- **api**: Aquí se definen las llamadas a la API.
  - **authAPI.ts**: Maneja las solicitudes relacionadas con la autenticación.
  - **restaurantsAPI.ts**: Realiza peticiones relacionadas con los datos de restaurantes.
  - **reviewsAPI.ts**: Encargado de las interacciones con las reseñas de los restaurantes.

- **components**: Componentes reutilizables, divididos en subcarpetas por función.
  - **Auth**: Componentes para la autenticación.
    - **AuthCard.tsx**: Tarjeta de inicio de sesión.
    - **LoginForm.tsx** y **RegisterForm.tsx**: Formularios de inicio de sesión y registro.
    - **RegisterCard.tsx**: Tarjeta de registro.
  - **Home**: Componentes de la página de inicio.
    - **HeroImage.tsx**: Imagen principal de bienvenida.
    - **WelcomeCard.tsx**: Tarjeta de bienvenida.
    - **Loader.tsx**: Indicador de carga para la página.
  - **Main**: Lista de restaurantes.
    - **RestaurantList.tsx**: Lista completa de restaurantes.
    - **RestaurantListItem.tsx**: Item individual de la lista de restaurantes.
  - **Map**: Componentes para mostrar mapas.
    - **RestaurantMap.tsx**: Muestra un mapa con ubicaciones de restaurantes.
  - **RestaurantForm**: Componentes para el formulario de restaurantes.
    - **ImageUploader.tsx**: Permite subir imágenes.
    - **RestaurantError.tsx** y **RestaurantSuccess.tsx**: Mensajes de éxito y error.
  - **Reviews**: Gestión de reseñas de restaurantes.
    - **PostReview.tsx**: Formulario para publicar una reseña.
    - **ReviewItem.tsx** y **ReviewList.tsx**: Visualización de reseñas.
  - **UI**: Componentes genéricos y de interfaz de usuario.
    - Incluye elementos como **Button.tsx**, **Input.tsx**, **Logo.tsx**, **Spinner.tsx**, etc., para interfaces comunes.

- **layouts**: Componentes para estructurar la disposición visual.
  - Ejemplos: **MainLayout.tsx** para la estructura general de la página y **CreateRestaurant.tsx** para la vista de creación de restaurantes.

- **pages**: Define rutas y vistas de la aplicación con Next.js.
  - **restaurants**: Subcarpeta para rutas de restaurantes, incluyendo rutas dinámicas (`[id].tsx`).
  - **login.tsx** y **register.tsx**: Vistas para inicio de sesión y registro.

- **redux**: Configuración de Redux para el manejo de estado global.
  - **slices**: Divide el estado en secciones (`authSlice.ts`, `restaurantsSlice.ts`, `reviewsSlice.ts`).
  - **store.ts**: Configuración del almacenamiento global de Redux.

- **styles**: Contiene estilos globales y personalizados.
  - **globals.css**: Estilos CSS globales de la aplicación.
  - **mapStyle.ts**: Estilos específicos para el mapa.

- **types**: Tipos TypeScript para asegurar el tipo de datos de cada entidad principal.
  - Ejemplos: **Auth.ts**, **Favorite.ts**, **Restaurant.ts**, **Review.ts**.

- **utils**: Funciones utilitarias y helpers.
  - **fetcher.ts**: Función de ayuda para realizar peticiones a la API.
  - **storageManager.ts**: Gestión de almacenamiento local.

#### Archivos de configuración y documentación

- **.env**: Variables de entorno para configuración sensible.
- **.eslintrc.json** y **tsconfig.json**: Configuración de ESLint y TypeScript para mantener el código consistente y tipado.
- **next.config.ts**: Configuración de Next.js.
- **tailwind.config.ts**: Configuración de Tailwind CSS.
- **README.md**: Documentación general del proyecto.
- **redux-docs.md**: Guía para configurar y utilizar Redux.

---

### Resumen General

Este proyecto es una aplicación web desarrollada en Next.js con una arquitectura modular. Se organiza en componentes reutilizables, con un sistema de autenticación y funcionalidad de reseñas para restaurantes. Usa Redux para el manejo de estado global y está tipado con TypeScript para mayor fiabilidad. La estructura se enfoca en separar lógica y diseño visual, con carpetas específicas para la API, componentes, estilos y utilidades.

---

### A mejorar

- **Manejo de errores**: Implementar un manejo de errores más robusto y consistente entre el backend y el frontend, asegurando que los mensajes de error se muestren de forma clara para mejorar la experiencia del usuario.
  
- **Fragmentación en componentes de formularios**: Modularizar más los formularios, separando las validaciones en esquemas JSON usando Zod para mejorar la mantenibilidad y consistencia en la validación de datos.

- **Paginación en comentarios**: Implementar una paginación en la API para gestionar eficientemente los comentarios de restaurantes y optimizar la carga de datos en vistas con muchos comentarios.

- **Subida de imágenes**: Configurar la subida de imágenes a través de API utilizando Cloudinary para optimizar la gestión de archivos e integrar el almacenamiento de imágenes de manera más eficiente en la plataforma.

---

