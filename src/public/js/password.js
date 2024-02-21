document.addEventListener("DOMContentLoaded", () => {
  const userPassword = document.getElementById("user-password");
  if (userPassword) {
    console.log("Contraseña del usuario:", userPassword.textContent);
  }
});
