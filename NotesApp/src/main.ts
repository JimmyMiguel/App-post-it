 import { initRouter } from "./router"
   (function(){
const app = document.getElementById ("app")
 

 

if (app != null) {
    initRouter(app)
}
else{
    console.log("Error null main");
    
}
 
})()