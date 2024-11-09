```
my-next-app/
├── public/
│   ├── images/                            # Carpeta que contiene las imágenes utilizadas en la aplicación.
│   │   ├── logo.png                       # Logo de la aplicación.
│   │   ├── sample-restaurant.jpg          # Imagen de ejemplo para los restaurantes.
│   │   ├── home-background.jpg            # Imagen de fondo para la página de inicio.
│   │   ├── signin-background.jpg          # Imagen de fondo para la página de registro.
│   │   ├── login-background.jpg           # Imagen de fondo para la página de inicio de sesión.
│   │   └── map-placeholder.jpg            # Imagen placeholder mientras el mapa se está cargando.
├── src/
│   ├── api/                               # Carpeta que contiene las interacciones con la API.
│   │   ├── restaurantAPI.ts               # Funciones para realizar operaciones CRUD sobre restaurantes.
│   │   ├── commentAPI.ts                  # Funciones para realizar operaciones CRUD sobre comentarios.
│   │   └── authAPI.ts                     # Funciones para el registro, inicio de sesión y autenticación de usuarios.
│   ├── components/                        # Componentes reutilizables de la aplicación.
│   │   ├── Comments/                      # Componentes relacionados con la funcionalidad de comentarios.
│   │   │   ├── CommentForm.tsx            # Formulario para añadir un comentario a un restaurante.
│   │   │   ├── CommentList.tsx            # Lista de todos los comentarios de un restaurante.
│   │   │   └── CommentItem.tsx            # Representación individual de un comentario (nombre, calificación, texto).
│   │   ├── Map/                           # Componentes relacionados con el mapa de restaurantes.
│   │   │   ├── RestaurantMap.tsx          # Componente que renderiza el mapa con ubicaciones de restaurantes usando Google Maps API.
│   │   │   └── Marker.tsx                 # Componente marcador (opcional) para representar un restaurante en el mapa.
│   │   ├── RestaurantForm/                # Componentes para el formulario de creación de restaurante.
│   │   │   ├── StepOne.tsx                # Primer paso del formulario de creación de restaurante.
│   │   │   ├── StepTwo.tsx                # Segundo paso del formulario, que permite subir una imagen.
│   │   │   ├── StepThree.tsx              # Confirmación del restaurante creado exitosamente.
│   │   │   ├── StepError.tsx              # Vista de error en caso de que falle la creación del restaurante.
│   │   │   ├── ImageUploader.tsx          # Componente que permite subir una imagen a Cloudinary.
│   │   │   └── MultiStepForm.tsx          # Componente que controla el flujo de pasos del formulario de creación.
│   │   ├── RestaurantDetail/              # Componentes que componen la vista de detalles del restaurante.
│   │   │   ├── RestaurantHeader.tsx       # Componente que muestra el nombre, imagen y dirección del restaurante.
│   │   │   ├── RestaurantDescription.tsx  # Componente para mostrar la descripción detallada del restaurante.
│   │   │   └── RestaurantComments.tsx     # Sección para mostrar los comentarios y el formulario para añadir comentarios.
│   │   ├── RestaurantList/                # Componentes para mostrar la lista de restaurantes.
│   │   │   ├── RestaurantListItem.tsx     # Componente que representa un restaurante dentro de la lista.
│   │   │   ├── RestaurantList.tsx         # Lista que contiene varios `RestaurantListItem` y organiza la vista.
│   │   ├── User/                          # Componentes relacionados con el perfil del usuario.
│   │   │   ├── UserMenu.tsx               # Menú desplegable para acceder a las opciones del usuario (cerrar sesión, etc.).
│   │   │   └── UserAvatar.tsx             # Avatar del usuario, que al hacer clic despliega el menú (`UserMenu`).
│   │   ├── UI/                            # Componentes reutilizables de la interfaz de usuario.
│   │   │   ├── Button.tsx                 # Componente de botón reutilizable para diferentes acciones.
│   │   │   ├── InputField.tsx             # Componente de campo de entrada reutilizable.
│   │   │   ├── DropdownMenu.tsx           # Componente reutilizable para crear menús desplegables.
│   │   │   ├── StarRating.tsx             # Componente para mostrar y capturar la calificación en forma de estrellas.
│   │   │   └── ProgressIndicator.tsx      # Indicador de progreso para mostrar el avance en formularios de varios pasos.
│   ├── hooks/                             # Hooks personalizados utilizados en la aplicación.
│   │   ├── useRestaurants.ts              # Hook para manejar las llamadas a la API relacionadas con restaurantes.
│   │   ├── useComments.ts                 # Hook para manejar las llamadas a la API relacionadas con comentarios.
│   │   ├── useAuth.ts                     # Hook para manejar la autenticación y el estado del usuario.
│   │   ├── useCloudinary.ts               # Hook para integrar la subida de imágenes con Cloudinary.
│   │   └── useMultiStepForm.ts            # Hook para manejar el estado de los pasos en formularios multi-pasos.
│   ├── pages/                             # Páginas del proyecto, según la estructura de Next.js.
│   │   ├── index.tsx                      # Página principal, representa la vista de bienvenida.
│   │   ├── register.tsx                   # Página de registro para nuevos usuarios.
│   │   ├── login.tsx                      # Página de inicio de sesión para usuarios existentes.
│   │   ├── main.tsx                       # Página principal después del login, que muestra el mapa y la lista de restaurantes.
│   │   ├── restaurants/
│   │   │   ├── [id].tsx                   # Página de detalles de un restaurante específico, que renderiza `RestaurantDetail`.

│   │   │   ├── create.tsx                 # Página para crear un nuevo restaurante (formulario multi-pasos).
│   │   │   └── edit/[id].tsx              # Página para editar un restaurante específico.
│   ├── redux/                             # Carpeta para el manejo del estado global con Redux.
│   │   ├── store.ts                       # Configuración del Redux store y combinación de todos los reducers.
│   │   ├── slices/                        # Slices de Redux para manejar el estado global.
│   │   │   ├── restaurantSlice.ts         # Slice para manejar el estado de los restaurantes (lista, detalle, etc.).
│   │   │   ├── commentSlice.ts            # Slice para manejar el estado de los comentarios (lista, estado de carga, etc.).
│   │   │   └── authSlice.ts               # Slice para manejar el estado de autenticación (usuario, token, etc.).
│   ├── styles/                            # Archivos CSS para definir los estilos de la aplicación.
│   │   ├── globals.css                    # Estilos globales aplicables a toda la aplicación.
│   │   ├── home.css                       # Estilos específicos para la página de inicio (home).
│   │   ├── auth.css                       # Estilos específicos para las páginas de registro y login.
│   │   ├── login.css                      # Estilos específicos para la página de login.
│   │   ├── main.css                       # Estilos para la página principal con el mapa y lista de restaurantes.
│   │   └── restaurantDetail.css           # Estilos para la vista de detalles del restaurante.
│   ├── types/                             # Definiciones de tipos de TypeScript.
│   │   ├── Restaurant.ts                  # Definiciones de tipo para los restaurantes (nombre, descripción, etc.).
│   │   ├── Comment.ts                     # Definiciones de tipo para los comentarios (autor, contenido, calificación).
│   │   └── Auth.ts                        # Definiciones de tipo para la autenticación (usuario, tokens, credenciales).
│   ├── utils/                             # Utilidades y funciones auxiliares.
│   │   ├── fetcher.ts                     # Función reutilizable para realizar peticiones a la API.
│   │   ├── formatDate.ts                  # Función para formatear fechas (e.g., en los comentarios).
│   │   └── validators.ts                  # Funciones de validación (validar email, contraseñas, etc.).
│   ├── App.tsx                            # Componente principal de la aplicación (envuelve el provider de Redux).
├── tailwind.config.js                     # Configuración para Tailwind CSS.
├── tsconfig.json                          # Configuración de TypeScript.
├── .env.local                             # Variables de entorno para la API Key de Google Maps y Cloudinary.
└── README.md                              # Instrucciones sobre cómo instalar, configurar y ejecutar la aplicación.
```