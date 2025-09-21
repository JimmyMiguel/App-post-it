import "../post-it"
import { state } from "../../state"
import "../new-note"
 export class welcomeScene extends HTMLElement{
    shadow = this.attachShadow({mode:'open'}) //encapsulo el component
    constructor(){
        super()
        
      }
      //Cuando creo el customelement de  welcomeScene primero tengo que esperar que se
      //suba al dom antes de renderizar el post It y para eso es esta funcion
      //conectCallback
      

      
      connectedCallback (){
        this.render() //esperamos que se ejecute render y suba al dom
        state.subscribe(()=>{
          this.renderPostIt()//traemos los postit
        })
      }

     render(){
        this.shadow.innerHTML= `
  <style>
    :host {
      display: flex;
      flex-direction: column;
      align-items:center;
      background: #000;
      color: #fff;
      font-family: Arial, sans-serif;
      box-sizing: border-box;
      position: relative;
      
      /* Ocupa toda la altura y está centrado con un ancho máximo */
      height: 100vh;
      width:360px;
      max-width: 700px; 
      margin: 0 auto; 
      padding: 1rem;
    }

    header {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }

    nav {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
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
      flex: 1; /* Ocupa todo el espacio vertical disponible */
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      overflow-y: auto; /* Permite el scroll vertical */
      padding-right: 0.5rem;
      /* Espacio extra al final para que la última nota no quede oculta por el botón */
      padding-bottom: 5rem; 
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
      position: absolute;
      bottom: 2rem;
      right: 2rem;
      z-index: 100;
    }
  </style>

  <header>Stiky notes</header>
  <nav>
    <a href="#" id="all">All</a>
    <a href="#" id="starred">Starred</a>
  </nav>
  <div class="postits-container">
    </div>
  <boton-add-notes class="botonNuevaNota"></boton-add-notes>
        ` 
        

    }
    
    renderPostIt(){
        const lastState = state.getState()
        const div = this.shadow.querySelector(".postits-container")
        div!.innerHTML= ""
        if (!Array.isArray(lastState)) {
        console.error("El estado no es un array:", lastState);
        return;
    }
        for (const element of lastState) {
          const instanciaCustomPostIt = document.createElement("post-it-card")
          instanciaCustomPostIt.setAttribute("title",element.title) //despues lo consumo
          instanciaCustomPostIt.setAttribute("text",element.text)
          instanciaCustomPostIt.setAttribute('fecha', element.Date.toISOString() ) 
          //con getAtribute en mi post-Its
          div?.appendChild(instanciaCustomPostIt)
        }

    }
    
     
    
}

customElements.define("scene-welcome", welcomeScene)
  
