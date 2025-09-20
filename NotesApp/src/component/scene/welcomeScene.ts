import "../post-it"
import { state } from "../../state"
class welcomeScene extends HTMLElement{
    constructor(){
        super()
        this.render()

    }
    
    render(){
        const shadow = this.attachShadow({mode:'open'}) //encapsulo el component
        shadow.innerHTML= `
        <style>

         :host {
            display: flex;
            flex-direction: column;
            background: #000;
            color: #fff;
            font-family: Arial, sans-serif;
            height: 100vh;
            padding: 1rem;
            box-sizing: border-box;
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
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            overflow-y: auto;
            padding-right: 0.5rem;
          }

          /* Scrollbar para mobile */
          .postits-container::-webkit-scrollbar {
            width: 6px;
          }

          .postits-container::-webkit-scrollbar-thumb {
            background-color: #555;
            border-radius: 3px;
          }
        </style>

        <header>Stiky notes</header>
        <nav>
          <a href="#" id="all">All</a>
          <a href="#" id="starred">Starred</a>
        </nav>
        <div class="postits-container">
          <!-- Aquí irán los post-it -->
        </div>` 

    }

    callBack(){
        const div = this.shadowRoot.querySelector(".postits-container")
        const instanciaCustomPostIt = document.createElement("post-it-card")

         
    }
     
    
}

customElements.define("scene-welcome", welcomeScene)

