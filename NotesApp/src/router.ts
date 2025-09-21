import "./component/scene/welcomeScene";


// Definimos tipos para la ruta
type Route = {
  path: RegExp;              // Expresión regular para comparar ruta
  action: () => Element;     // Función que renderiza y retorna un nodo DOM
};

// Función initRouter que inicializa el router en un contenedor HTML
export function initRouter(container: Element) {

  // Array con las rutas y sus acciones
  const routes: Route[] = [
      {
          path: /^\/$/, // ruta exacta "/"
          action: () => {
              const welcomeScene = document.createElement('scene-welcome');
               return welcomeScene;
          }
      },
      {
          path: /^\/login$/, // ruta exacta "/login"
          action: () => {
              const div = document.createElement('div');
              const h1 = document.createElement('h1');
              h1.textContent = "Hola, soy la página de Login";
              div.appendChild(h1);
              return div;
          }
      }
  ];

  // Función para manejar el cambio de ruta
  function handleRoute(path: string) {
      // Busca la primera ruta que coincida con path
      for (const route of routes) {
          if (route.path.test(path)) {
              // Limpia el contenedor
              container.innerHTML = '';
              // Ejecuta acción y agrega el resultado al contenedor
              container.appendChild(route.action());
              return;
          }
      }
      // Si no coincide ninguna ruta, mostrar 404
      container.innerHTML = '<h2>404 - Página no encontrada</h2>';
  }

  // Función para cambiar ruta y actualizar historial
  function goTo(path: string) {
      history.pushState({}, '', path);
      handleRoute(path);
  }

  // Escuchar evento popstate para manejar navegación con botones navegador
  window.addEventListener('popstate', () => {
      handleRoute(location.pathname);
  });

  // Inicializar mostrando la ruta actual
  handleRoute(location.pathname);

  // Retornar la función goTo para usarla externamente
  return { goTo };
}