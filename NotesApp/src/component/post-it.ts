
export class postIt extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {

    const shadow = this.attachShadow({ mode: "open" });
    
    shadow.innerHTML = `
  <style>
    /* Estilos generales y de la tarjeta */
    .card {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      width: 170px;
      height: 170px;
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
    }

    /* Descripción con truncado de texto */
    .card-description {
      font-size: 0.875rem;
      color: #333;
      line-height: 1.4;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3; /* Número de líneas a mostrar */
      -webkit-box-orient: vertical;
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
    .edit-button {
      width: 32px;
      height: 32px;
      border: none;
      border-radius: 50%;
      background-color: #101010;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23FFFFFF' class='bi bi-pencil-fill' viewBox='0 0 16 16'%3E%3Cpath d='M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: center;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .edit-button:hover {
      transform: scale(1.1);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }
  </style>
  <div class="card" > 
  <h2 class="card-title">
  </h2>
  
  <p class="card-description">
  
  </p>
  
  <div class="card-footer">
  <p class="card-date">
  <slot name="date">Fecha por defecto</slot>
  </p>
  <button class="edit-button" aria-label="Editar nota"></button>
  </div>
  </div>
`;

  }

}
customElements.define("post-it-card", postIt);


