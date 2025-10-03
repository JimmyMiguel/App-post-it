import "../post-it"
import { state } from "../../state"
import "../new-note"
 import { goTo } from "../../router"

export function welcomeScene() {
  const container = document.createElement('div')
  container.innerHTML = `
    <style>
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #000;
        color: #fff;
        font-family: Arial, sans-serif;
        box-sizing: border-box;
        position: relative;
        
        /* Ocupa toda la altura y está centrado con un ancho máximo */
        height: 100vh;
        width: 360px;
        max-width: 700px; 
        margin: 0 auto; 
        padding: 0;
      }

      header {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 1rem;
        padding: 1rem 1rem 0 1rem;
      }

      nav {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
        padding: 0 1rem;
      }

      a {
        color: #fff;
        text-decoration: none;
        font-weight: 600;
        cursor: pointer;
        user-select: none;
      }
      
      a:hover, a:focus {
        text-decoration: underline;
      }

      .postits-container {
        display: grid;
        grid-template-columns: 1fr 1fr; /* 2 columnas iguales */
        gap: 1rem;
        height: 80vh; /* 80% de la altura de la pantalla */
        overflow-y: auto; /* Scroll vertical cuando sea necesario */
        padding: 1rem;
        padding-bottom: 5rem; /* Espacio extra para el botón flotante */
        box-sizing: border-box;
      }

      /* Estilos de la barra de scroll */
      .postits-container::-webkit-scrollbar {
        width: 6px;
      }

      .postits-container::-webkit-scrollbar-thumb {
        background-color: #555;
        border-radius: 3px;
      }

      /* Estilos para posicionar el botón flotante */
      .botonNuevaNota {
        position: fixed;
        bottom: 2rem;
        right: 50%;
        transform: translateX(50%);
        z-index: 100;
      }
    </style>

    <header>Tarea </header>

    <div class="postits-container"></div>
    <boton-add-notes class="botonNuevaNota"></boton-add-notes>
  `

  // Función para renderizar los post-its
  function renderPostIt() {
    const lastState = state.getState() //ultimo estado de la data
    console.log(lastState);

    const div = container.querySelector(".postits-container") //aqui coloco los postit
    div!.innerHTML = "" // vacio la caja 


    if (!Array.isArray(lastState)) {
      console.error("El estado no es un array:", lastState);
      return;
    }


    for (const element of lastState) {
      const instanciaCustomPostIt = document.createElement("post-it-card")
      instanciaCustomPostIt.setAttribute("title", element.title)
      instanciaCustomPostIt.setAttribute("text", element.text.join(","))
      const fecha = new Date(element.date)
     instanciaCustomPostIt.setAttribute('fecha', fecha.toDateString());
      instanciaCustomPostIt.setAttribute("idUnico",element.id.toString())
      div?.appendChild(instanciaCustomPostIt)
    }
  }

  // Boton para agregar tareas
  const boton = container.querySelector(".botonNuevaNota")
  boton?.addEventListener("click", () => {
    goTo("/postScene")
  })

  // Suscribirse al state para actualizar cuando cambie
  state.subscribe(() => {
    renderPostIt()
  })

  // Renderizar los post-its existentes inmediatamente
  setTimeout(() => {
    renderPostIt()
  }, 0)

  return container
}