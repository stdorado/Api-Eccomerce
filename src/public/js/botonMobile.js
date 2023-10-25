//archivo para manejar la logica del boton (sin relevancia en el trabajo)
document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("mobile-menu-button");
    const menu = document.getElementById("mobile-menu");

    
    menu.classList.add("hidden");

    button.addEventListener("click", function() {
     
      if (menu.classList.contains("hidden")) {
        menu.classList.remove("hidden");
      } else {
        menu.classList.add("hidden");
      }
    });
  });