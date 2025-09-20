import { state } from "../state"
export function crearNuevaNota():Element{
    const boton = document.createElement("button")
    boton.style.width ="100px"
    boton.style.height="50px"
    boton.textContent="Crear Nueva nota"
    boton.addEventListener("click", ()=>{
        state.setState([
        {
          id: 32,
          title: "Mensaje para Marce",
          text: "Enviar un mensaje para Marce de felicitacion",
          completed: true,
          Date: new Date(),
          option: "amarillo",
        }])

        
        const lastState = state.getState()
    
      


        
    
    })
    return boton
}


