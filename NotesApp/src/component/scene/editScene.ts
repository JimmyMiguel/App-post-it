import { state } from "../../state"

export class EditScene extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" })

    constructor() {
        super()
    }

    connectedCallback() {
        this.render()
        this.setupEvents()
    }

    render() {
        // Obtener la data del state
        const data = state.getState()

        this.shadow.innerHTML = `
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
        padding: 1rem;
      }

      h1 {
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 2rem;
        text-align: center;
      }

      .data-container {
        width: 100%;
        max-height: 80vh;
        overflow-y: auto;
        padding: 1rem;
        background: #111;
        border-radius: 8px;
        border: 1px solid #333;
      }

      .data-item {
        background: #222;
        border-radius: 8px;
        padding: 1rem;
        margin-bottom: 1rem;
        border-left: 4px solid #007acc;
      }

      .data-item:last-child {
        margin-bottom: 0;
      }

      .data-title {
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
        color: #007acc;
      }

      .data-text {
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
        color: #ccc;
        line-height: 1.4;
      }

      .data-date {
        font-size: 0.8rem;
        color: #888;
      }

      .data-id {
        font-size: 0.7rem;
        color: #666;
        margin-top: 0.5rem;
      }

      .back-button {
        position: fixed;
        top: 1rem;
        left: 1rem;
        background: #007acc;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 600;
        z-index: 100;
      }

      .back-button:hover {
        background: #005a9e;
      }

      .empty-state {
        text-align: center;
        color: #666;
        font-style: italic;
        padding: 2rem;
      }

      /* Estilos de la barra de scroll */
      .data-container::-webkit-scrollbar {
        width: 6px;
      }

      .data-container::-webkit-scrollbar-thumb {
        background-color: #555;
        border-radius: 3px;
      }
    </style>

    <button class="back-button" id="backBtn">← Volver</button>
    <h1>Datos del State</h1>
    <div class="data-container">
      ${data.length === 0 ?
                '<div class="empty-state">No hay datos en el state</div>' :
                data.map(item => `
          <div class="data-item">
            <div class="data-title">${item.title}</div>
            <div class="data-text">${item.text}</div>
            <div class="data-date">Fecha: ${new Date(item.Date).toLocaleString('es-ES')}</div>
            <div class="data-id">ID: ${item.id}</div>
          </div>
        `).join('')
            }
    </div>
  `
    }

    setupEvents() {
        // Configurar evento del botón de volver
        const backButton = this.shadow.querySelector('#back-button')
        backButton?.addEventListener('click', () => {
            // Importar goTo dinámicamente para evitar dependencias circulares
            import('../../router').then(({ goTo }) => {
                goTo('/')
            })
        })
    }
}

customElements.define("edit-scene", EditScene)