function showLoading() {
    // Muestra el elemento de carga
    document.getElementById("loadingScreen").classList.remove("hidden");
    // Oculta el elemento de bienvenida
    document.getElementById("welcomeScreen").classList.add("hidden");
    // Oculta el menú de navegación si está visible
    document.getElementById("mobile-menu").classList.add("hidden");
  }