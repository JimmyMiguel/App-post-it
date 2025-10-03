import   "./scene/welcomeScene";
 import { state } from "../state";
export class postIt extends HTMLElement {
   shadow = this.attachShadow({ mode: "open" });
  constructor() {
    super();
   }

  connectedCallback(){
    this.render()
   }


render() {
    const title = this.getAttribute("title");
    const text = this.getAttribute("text");
    const textArray = text?.split(",");
    const idString = this.getAttribute("idUnico")
    const idNumber = Number(idString)
     
    
    
    // 1. Generar los elementos de la lista (<li>) con checkboxes
    const listItems = textArray?.map(item => `
        <li>
            <input type="checkbox">
            <span>${item.trim()}</span>
        </li>
    `).join('') || ''; // .join('') convierte el array en un solo string

    const fechaString = this.getAttribute("fecha");
    
    const fecha = new Date(fechaString!);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
    const fechaFormateada = `${dia}/${mes}/${anio}`;

    this.shadow.innerHTML = `
  <style>
    /* Estilos generales y de la tarjeta */
        .card {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      width: 170px;
      min-height: 170px; /* Altura base */
      max-height: 350px; /* Altura máxima antes de hacer scroll */
      padding: 16px;
      background-color: #F7F056;
      border-radius: 24px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      font-family: 'Open Sans', sans-serif;
    }


    /* Título */
    .card-title {
        font-size: 1rem;
        font-weight: 700;
        color: #101010;
        margin: 0 0 8px 0;
        line-height: 1.3;
        display: -webkit-box;
        -webkit-line-clamp: 2;  
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    /* Estilos para la lista de tareas */
      .card-description {
        font-size: 0.875rem;
        color: #333;
        margin: 0;
        padding-left: 0; 
        list-style-type: none; 
        overflow-y: auto; /* CAMBIO AQUÍ: de 'hidden' a 'auto' */
        flex-grow: 1; 
      }
    
    .card-description li {
      display: flex;
      align-items: center;
      white-space: nowrap; /* Evitar que el texto de un ítem salte de línea */
     }
    
    .card-description input[type="checkbox"] {
      margin-right: 6px; /* Espacio entre el checkbox y el texto */
    }

    /* Pie de página de la tarjeta */
    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: auto; /* Empuja el footer hacia abajo */
    }

    /* Fecha */
    .card-date {
      font-size: 0.75rem;
      font-weight: 600;
      color: #333;
      margin: 0;
    }

    /* Botón de edición */
.borrarComp {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background-color: #101010;
  background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20x%3D%220px%22%20y%3D%220px%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%2C0%2C256%2C256%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-rule%3D%22nonzero%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20stroke-linecap%3D%22butt%22%20stroke-linejoin%3D%22miter%22%20stroke-miterlimit%3D%2210%22%20stroke-dasharray%3D%22%22%20stroke-dashoffset%3D%220%22%20font-family%3D%22none%22%20font-weight%3D%22none%22%20font-size%3D%22none%22%20text-anchor%3D%22none%22%20style%3D%22mix-blend-mode%3A%20normal%22%3E%3Cg%20transform%3D%22scale(10.66667%2C10.66667)%22%3E%3Cpath%20d%3D%22M10%2C2l-1%2C1h-4c-0.6%2C0%20-1%2C0.4%20-1%2C1c0%2C0.6%200.4%2C1%201%2C1h2h10h2c0.6%2C0%201%2C-0.4%201%2C-1c0%2C-0.6%20-0.4%2C-1%20-1%2C-1h-4l-1%2C-1zM5%2C7v13c0%2C1.1%200.9%2C2%202%2C2h10c1.1%2C0%202%2C-0.9%202%2C-2v-13zM9%2C9c0.6%2C0%201%2C0.4%201%2C1v9c0%2C0.6%20-0.4%2C1%20-1%2C1c-0.6%2C0%20-1%2C-0.4%20-1%2C-1v-9c0%2C-0.6%200.4%2C-1%201%2C-1zM15%2C9c0.6%2C0%201%2C0.4%201%2C1v9c0%2C0.6%20-0.4%2C1%20-1%2C1c-0.6%2C0%20-1%2C-0.4%20-1%2C-1v-9c0%2C-0.6%200.4%2C-1%201%2C-1z%22%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E');
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}


    .borrarComp:hover {
      transform: scale(1.1);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }
  </style>
  <div class="card" > 
    <h2 class="card-title">${title}</h2>
    
    <ol class="card-description">${listItems}</ol>
    
    <div class="card-footer">
      <p class="card-date">
        <slot name="date">${fechaFormateada}</slot>
      </p>
      <button class="borrarComp" aria-label="Editar nota"></button>
    </div>
  </div>
`;

    const boton = this.shadow.querySelector(".borrarComp")
    boton?.addEventListener("click",()=>{
      const lastState = state.getState()
      const nuevaLista = lastState.filter(item => item.id !== idNumber )
      state.setState(nuevaLista)
    })
      
}
}
customElements.define("post-it-card", postIt);
