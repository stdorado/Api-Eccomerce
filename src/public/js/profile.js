
document.addEventListener("DOMContentLoaded", async () => {
    const logoutButton = document.getElementById("logoutButton");
    const logoutForm = document.getElementById("logoutForm");
    const profileDetails = document.getElementById("profile-details");

    // Función para cargar y mostrar los detalles del perfil
    const loadProfileDetails = async () => {
        try {
            // Realiza una solicitud GET al servidor para obtener los detalles del perfil del usuario
            const profileResponse = await fetch("/api/sessions/profile");

            if (profileResponse.ok) {
                const profileData = await profileResponse.json();
                // Actualiza la vista con los datos del perfil
                profileDetails.innerHTML = `
                <p class="text-lg"><span class="font-semibold text-2xl">Email:</span "> ${profileData.email}</p>
                <p class="text-lg"><span class="font-semibold text-2xl">Rol:</span> ${profileData.role}</p>
                
            `;
            } else {
                console.error("Error al obtener los detalles del perfil:", profileResponse);
            }
        } catch (error) {
            console.error("Error al obtener los detalles del perfil:", error);
        }
    };

    // Cargar y mostrar los detalles del perfil al cargar la página
    loadProfileDetails();

    // Agregar un evento click al botón de cierre de sesión
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