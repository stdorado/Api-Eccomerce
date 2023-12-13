document.addEventListener("DOMContentLoaded", () => {
      const registerForm = document.getElementById("registerForm");
      const errorMessage = document.getElementById("error-message");

      registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        errorMessage.textContent = ""; // Limpia cualquier mensaje de error anterior

        const firstName = registerForm.first_name.value;
        const lastName = registerForm.last_name.value;
        const email = registerForm.email.value;
        const password = registerForm.password.value;

        try {
          // Realiza una solicitud al servidor para registrar un nuevo usuario
          const response = await fetch("/api/sessions/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              first_name: firstName, 
              last_name: lastName,   
              email,
              password,
            }),
          });

          if (response.ok) {
            // Redirecciona al usuario después de registrarse
            window.location.href = "/home";
          } else {
            // Muestra un mensaje de error si el registro falla
            const data = await response.json();
            errorMessage.textContent =
              data.error || "Error al registrar. Inténtalo de nuevo más tarde.";
          }
        } catch (error) {
          console.error("Error al registrar:", error);
          errorMessage.textContent =
            "Error al registrar. Inténtalo de nuevo más tarde.";
        }
      });

      // Botón para registrar con Google
      document.getElementById("google-register").addEventListener("click", () => {
        window.location.href = "/auth/google"; // Redirige a la autenticación de Google
      });
    });