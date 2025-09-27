export class botonAddNote extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" })
  constructor() {
    super()
  }

  navigateToEdit() {
    console.log("navigateToEdit called!");
    try {
      console.log("Navegando a /editScene");
      history.pushState({}, '', '/editScene');
      window.dispatchEvent(new PopStateEvent('popstate'));
      console.log("Navegación ejecutada correctamente");
    } catch (error) {
      console.error("Error en la navegación:", error);
    }
  }
  connectedCallback() {
    this.render()
    console.log("Componente conectado");
  }

  render() {
    this.shadow.innerHTML = `
    <style>
        :host {
          display: block;
        }
        button {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 16px;
          border-radius: 99px;  
          border: none;
          background-color: #9b9b9b;  
          color: white;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          user-select: none;
          transition: background-color 0.3s ease;
        }
        button:hover {
          background-color: #b4b3b3ff;
        }
        .circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: white;
          color: black;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.5rem;
          line-height: 1;
          user-select: none;
        }
      </style>
      <button class="boton" onclick="this.navigateToEdit()">
        <span class="circle">+</span>
        New Note
      </button>

    `}
}
customElements.define("boton-add-notes", botonAddNote)









