# 🃏 MyLittleJoke — App de Bromas con JokeAPI

## Descripción

**MyLittleJoke** es una aplicación web interactiva desarrollada en **React + TypeScript + TailwindCSS**, que muestra bromas dinámicas obtenidas desde la **[JokeAPI](https://v2.jokeapi.dev/)**.  

El objetivo es ofrecer una experiencia divertida donde los usuarios puedan:

- Cargar y leer bromas por categoría.  
- Guardar sus favoritas.  
- Bloquear las que no quieren volver a ver.    
- Mantener toda la información **persistente en el navegador** usando *LocalStorage*.  



## Stack Tecnológico

| Tecnología | Uso |
|------------|-----|
|  **React + TypeScript** | Construcción de la interfaz y manejo de estados tipados. |
| **TailwindCSS** | Framework CSS para estilos rápidos, responsivos y consistentes. |
| **JokeAPI** | API utilizada para obtener las bromas dinámicamente. |
| **LocalStorage API** | Persistencia de favoritos, bloqueados y filtros. |
| **Vite** | Entorno de desarrollo rápido para proyectos con React. |
| **React Router DOM** | Navegación entre vistas: Home, Favoritos y 404. |

---

## Funcionalidades principales

✅ Obtener bromas aleatorias o filtradas desde **JokeAPI**.  
✅ Guardar bromas en **favoritos**.  
✅ **Eliminar o bloquear** bromas (para que no vuelvan a mostrarse).  
✅ Filtrar bromas por **categoría**.  
✅ Mantener datos **persistentes** en *LocalStorage*.  
✅ Página **404 personalizada** con estilo teatral y humorístico.  
✅ Diseño **responsivo y accesible** con TailwindCSS.  

---

## Estructura del proyecto
``` 
src/
│
├── api/
│ └── jokeApi.ts # Tipos y funciones de interacción con JokeAPI
│
├── components/
│ ├── FavoritesList.tsx # Lista de bromas favoritas
│ ├── JokeCard.tsx # Tarjeta individual de broma
│ ├── FilterBar.tsx # Barra de filtros por categoría
│ ├── BottomNav.tsx # Barra de navegación inferior
│ ├── NavItem.tsx # Componente individual de botón de navegación
│ └── Layout.tsx # Estructura de página (Header, Footer/BottomNav y Outlet)
│
├── pages/
│ ├── Home.tsx # Página principal con las bromas
│ ├── Favorites.tsx # Página de favoritos (usa LocalStorage)
│ └── NotFound.tsx # Página 404 personalizada
│
├── utils/
│ └── storage.ts # Gestión de favoritos, bloqueados y filtros
│
├── App.tsx # Definición de rutas
└── main.tsx # Punto de entrada con ReactDOM
```


## Rutas principales

| Ruta        | Componente | Descripción                        |
|------------|------------|-----------------------------------|
| `/`        | Home       | Página principal con las bromas.  |
| `/favorites` | Favorites | Lista de bromas favoritas.        |
| `*`        | NotFound   | Página 404 con estilo teatral.    |


## Instalación y ejecución

1. **Clonar el repositorio**

```bash
git clone 
cd mylittlejoke
```
2. **Instalar dependencias**

```bash
npm install
```
3. **Ejecutar el proyecto**

```bash
npm run dev
```
## Paleta de colores

Definida en `:root`:

```css
:root {
  --c-violet: #6A1B9A;
  --c-yellow: #fbf6e9;
  --c-green: #2cb383;
  --c-green-dark: #239a73;
}
```
Aplicada mediante Tailwind:

```tsx
bg-[var(--c-violet)] text-[var(--c-yellow)] border-[var(--c-green)]
```

## Persistencia

Toda la información se guarda en **LocalStorage**:

- Bromas favoritas (`favorites`)  
- Bromas bloqueadas (`blocked`)  
- Categoría seleccionada (`selectedCategory`)  

Esto garantiza que los datos se mantengan al recargar o cerrar el navegador.

## Autor

Proyecto desarrollado por Karen Mari.  
Como práctica de consumo de API, manejo de estado y diseño con **React + TypeScript + TailwindCSS**.  