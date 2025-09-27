import { state } from "../../state";
import type { DataItem } from "../../state";
import { goTo } from "../../router";

export class PostScene extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });
  datosTarea: string[] = [];

  constructor() {
    super();
  }

  connectedCallback() {
    console.log("Componente post-scene conectado al DOM.");
    this.render();
  }

  render() {
    this.shadow.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        :host {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: 'Poppins', sans-serif;
          background: #181818;
          color: #fff;
          border-radius: 16px;
          padding: 1rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
          height: 100vh;
          width: 360px;
          max-width: 700px;
          margin: 0 auto;
        }
        h2 {
          font-size: 2em;
          margin-bottom: 12px;
          font-weight: 700;
        }
        .meta {
          display: flex;
          gap: 14px;
          align-items: center;
          margin-bottom: 16px;
        }
        .meta h3 {
          font-size: 1em;
          font-weight: 500;
        }
        .meta p {
          font-size: 0.9em;
          color: #bbb;
          margin: 0;
        }
        ul {
          margin: 0 0 16px 0;
          padding-left: 18px;
          width: 100%;
        }
        ul li {
          display: flex;
          gap: 8px;
          align-items: center;
          margin-bottom: 8px;
          list-style-type: none;
        }
        .actions {
          display: flex;
          justify-content: flex-start;
          width: 100%;
        }
        .save {
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
          position: absolute;
          bottom: 2rem;
          z-index: 100;
        }
        .save:hover {
          background-color: #b4b3b3;
        }
        textarea, .taskInput {
          flex: 1;
          border-radius: 8px;
          border: 1px solid #333;
          background: #222;
          color: #fff;
          font-family: 'Poppins', sans-serif;
          padding: 6px;
        }
      </style>
      <div>
         <input type="text" id="title" placeholder="Escribe un titulo" />
        <div class="meta">
          <h3 id="date"></h3>
         </div>
        <ul class="taskList">
          <li>
            <input type="checkbox" />
            <input type="text" class="taskInput" placeholder="Escribe una tarea" />
          </li>
        </ul>
        <div class="actions">
          <button class="save">Save</button>
        </div>
      </div>
    `;

    const taskList = this.shadow.querySelector('.taskList') as HTMLUListElement;

    // Mostrar la fecha actual
    const dateElement = this.shadow.querySelector('#date') as HTMLElement;
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    dateElement.textContent = formattedDate;

    //evento que agrega tareas
    taskList.addEventListener("keydown", (event: Event) => {
      const keyboardEvent = event as KeyboardEvent; // hacemos el cast aquí
      const target = keyboardEvent.target as HTMLInputElement;


      if (target.classList.contains("taskInput") && keyboardEvent.key === "Enter") {
        keyboardEvent.preventDefault();
        if (!target.value.trim()) return;

        const newTask = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        const newInput = document.createElement("input");
        newInput.type = "text";
        newInput.classList.add("taskInput");
        newInput.placeholder = "Escribe una tarea";

        newTask.appendChild(checkbox);
        newTask.appendChild(newInput);
        taskList.appendChild(newTask);

        newInput.focus();
        this.datosTarea.push(target.value);
      }
    });

    //evento que guarda las tareas
    const saveButton = this.shadow.querySelector(".save") as HTMLButtonElement;
    saveButton.addEventListener("click", () => {
      const title = this.shadow.querySelector("#title") as HTMLInputElement;
      const date = this.shadow.querySelector("#date") as HTMLElement;

      // Recolectar todas las tareas de los inputs
      const allTaskInputs = this.shadow.querySelectorAll('.taskInput') as NodeListOf<HTMLInputElement>;
      const allTasks: string[] = [];

      allTaskInputs.forEach(input => {
        if (input.value.trim()) {
          allTasks.push(input.value.trim());
        }
      });

      console.log("Título:", title.value);
      console.log("Fecha:", date.textContent);
      console.log("Tareas:", allTasks);

      // Crear el nuevo item para el state
      const newItem: DataItem = {
        id: Math.floor(Math.random() * 1000000), // ID único basado en numero aleatorio entero
        title: title.value, // String del título
        text: allTasks.join(', '), // Unir todas las tareas en un string
        Date: new Date()
      };

      // Actualizar el state
      const currentState = state.getState();
      state.setState([...currentState, newItem]);
      //limpiamos el input de titulo y fecha
      title.value = "";
      date.textContent = "";
      console.log("State actualizado:", state.getState());
      //vamos a la escena de home
      goTo("/");
    });

  }
}

customElements.define("post-scene", PostScene);