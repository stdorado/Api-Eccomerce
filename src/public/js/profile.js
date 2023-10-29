document.addEventListener("DOMContentLoaded", async () => {
    const logoutButton = document.getElementById("logoutButton");
    const logoutForm = document.getElementById("logoutForm");

    logoutButton.addEventListener("click", async () => {
        try {
            // Realiza una solicitud DELETE al servidor para cerrar la sesión del usuario
            const logoutResponse = await fetch("/api/sessions", {
                method: "DELETE",
            });

            if (logoutResponse.ok) {
                // Redirecciona al usuario a la página de inicio de sesión después de cerrar sesión
                window.location.href = "/login";
            } else {
                console.error("Error al cerrar sesión:", logoutResponse);
            }
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    });
});