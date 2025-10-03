// router.ts

import { welcomeScene } from "./component/scene/welcomeScene";
 import "./component/post-it";
import "./component/scene/postScene";

// --- Tipos y Rutas (a nivel de módulo) ---
type Route = {
  path: RegExp;
  action: () => Element;
};

const routes: Route[] = [
  {
    path: /^\/$/,
    action: () => welcomeScene(),
  },
  {
    path: /^\/postScene$/,
    action: () => {
      const postSecen = document.createElement("post-scene")
      return postSecen
    }
  },
  {
    path: /^\/editScene$/,
    action: () => document.createElement("edit-scene"),
  }
];

// --- Variables Compartidas (a nivel de módulo) ---
// 1. Creamos una variable 'container' que será accesible por todas las funciones en este archivo.
let container: Element | null = null;


// --- Funciones (a nivel de módulo) ---

// 2. Movemos handleRoute aquí fuera. Ahora es visible para goTo y initRouter.
function handleRoute(path: string) {


  // Comprobamos si el contenedor ya ha sido inicializado.
  if (!container) {
    console.error("Container not initialized!");
    return;
  }

  for (const route of routes) {
     if (route.path.test(path)) {
       container.innerHTML = '';
      const newElement = route.action();
      container.appendChild(newElement);
      return;
    }
  }
  console.log("No route matched, showing 404");
  container.innerHTML = '<h2>404 - Página no encontrada</h2>';
}

/**
 * Navega a una nueva ruta y actualiza el historial del navegador.
 * Esta función se exporta para ser usada en cualquier componente.
 * @param path La ruta a la que se quiere navegar (ej. "/postScene").
 */
export function goTo(path: string) {
   history.pushState({}, '', path);
  // Ahora sí puede llamar a handleRoute porque están en el mismo "nivel".
  handleRoute(path);
}

/**
 * Inicializa el router. Se debe llamar una sola vez al arrancar la app.
 * @param mainContainer El elemento del DOM donde se renderizarán las vistas.
 */
export function initRouter(mainContainer: Element) {
  // 3. El trabajo de initRouter ahora es simple: configurar el 'container' y los listeners.
  container = mainContainer;

  window.addEventListener('popstate', () => {
    handleRoute(location.pathname);
  });

  // Realiza el renderizado de la ruta inicial.
  handleRoute(location.pathname);
}