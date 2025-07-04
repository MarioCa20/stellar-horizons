# Stellar Horizon
Tras la derrota de la orden y el hallazgo de mapas estelares en los restos de la Estrella de la Muerte, surge la oportunidad de consolidar el turismo intergaláctico. Este proyecto propone el desarrollo de un portal web que articule agencias, viajeros y destinos, permitiendo organizar rutas a la velocidad de la luz, reservar experiencias guiadas y gestionar reseñas en mundos como Tatooine.
Con la paz restaurada en la galaxia y los avances tecnológicos disponibles, se busca impulsar la economía y la cooperación interplanetaria mediante una plataforma centralizada que:

##  Tecnologías Utilizadas

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Bootstrap 5](https://getbootstrap.com/)

## Instalación y ejecución local

### Requisitos previos

- [Node.js y npm](https://nodejs.org/) instalados
- [Git](https://git-scm.com/) instalado
- [VS Code](https://code.visualstudio.com/) recomendado

### Pasos para correr el proyecto localmente

```
1. Clonar el repositorio

bash
git clone https://github.com/MarioCa20/stellar-horizons.git
cd stellar-horizons


2. Instala las dependencias

npm install

3. Ejecuta el servidor de desarrollo

npm run dev

4.Abre el navegador

El servidor estará corriendo en:
http://localhost:5173

```


## UI del home 
![Texto alternativo](demo/home1.png)

## UI del home versión mobile
![alt text](demo/home_mobile.png)

## UI de reserva
![Texto alternativo](demo/Reserva.png)

## UI de alojamientos
![Texto alternativo](demo/Alojamiento.png)

## UI del login
![Texto alternativo](demo/Login.png)

## UI detalle del tour
![Texto alternativo](demo/Detalle.png)

## UI filtros de búsqueda
![Texto alternativo](demo/Filtro.png)


## SetUp

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Configuraciones ESLint

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

## Estructura del Proyecto

```
/
│
├── public/                     # Archivos estáticos públicos
│   └── favicon.ico
│
├── index.html                  # HTML entry point
│
├── src/
│   ├── assets/                 # Imágenes, íconos, fuentes, etc.
│   │   ├── images/
│   │   └── styles/             # Archivos CSS/SCSS globales
│   │       └── main.css
│   │
│   ├── components/             # Componentes reutilizables
│   │   ├── Button.tsx
│   │   └── Form.tsx
│   │
│   ├── features/               # Módulos principales del proyecto
│   │   ├── Home/
│   │   │   ├── Home.tsx
│   │   │   └── Home.module.css
│   │   └── OtherFeature/
│   │       ├── OtherFeature.tsx
│   │       └── OtherFeature.module.css
│   │
│   ├── data/                   # Datos mockeados
│   │   ├── users.ts
│   │   └── products.ts
│   │
│   ├── hooks/                  # Custom hooks
│   │   └── useForm.ts
│   │
│   ├── utils/                  # Funciones utilitarias
│   │   └── formatDate.ts
│   │
│   ├── App.tsx                 # Componente raíz
│   ├── main.tsx               # Punto de entrada
│   └── routes.tsx             # Definición de rutas (React Router)
│
├── .gitignore
├── package.json
├── README.md
└── vite.config.js / webpack.config.js  # Dependiendo del bundler usado
```

### Estructura explicada

- **public/**: Archivos estáticos públicos como imágenes y favicon
- **index.html**: Punto de entrada HTML de la aplicación
- **src/**: Código fuente de la aplicación
  - **assets/**: Recursos estáticos (imágenes, estilos, etc.)
  - **components/**: Componentes reutilizables TypeScript (.tsx)
  - **features/**: Módulos principales, cada uno con sus componentes y estilos
  - **data/**: Tipos y datos mockeados en TypeScript (.ts)
  - **hooks/**: Custom hooks en TypeScript (.ts)
  - **utils/**: Funciones utilitarias en TypeScript (.ts)
  - **App.tsx**: Componente raíz con Router Setup
  - **main.tsx**: Punto de entrada de la aplicación React
  - **routes.tsx**: Configuración de React Router

## Data mockeada

The mock data (`src/data/mock_data.json`) represents a space tourism system with the following entities:

### Entidades base
- **users**: Usuarios del sistema con datos personales
- **planets**: Planetas disponibles para turismo
- **activities**: Tipos de actividades turísticas
- **destinations**: Lugares específicos dentro de los planetas
- **accommodations**: Alojamientos (hospedajes) disponibles en los destinos
- **tours**: Paquetes turísticos organizados
- **tour_destinations**: Relación entre tours y destinos
- **bookings**: Reservas de tours o alojamientos
- **reviews**: Reseñas de experiencias

### Relaciones Principales
- Destinos → Planetas y Actividades
- Alojamientos → Destinos
- Tours → Destinos (mediante tour_destinations)
- Reservas → Usuario, Tour/Alojamiento
- Reseñas → Reservas

### Ejemplo de Uso
```typescript
interface Booking {
  id: number;
  userId: number;
  tourId: number | null;
  accommodationId: number | null;
  date: string;
  people: number;
  paymentMethod: string;
  status: string;
}
```
