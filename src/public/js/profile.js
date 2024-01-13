document.addEventListener("DOMContentLoaded", async () => {
    const profileDetails = document.getElementById("profile-details");
    const loginButton = document.getElementById("loginButton");
    const registerButton = document.getElementById("registerButton");
    const logoutButton = document.getElementById("logoutButton");

    // Función para cargar y mostrar los detalles del perfil
    const loadProfileDetails = async () => {
        try {
            
            const profileResponse = await fetch("/api/sessions/profile");

            if (profileResponse.ok) {
                const profileData = await profileResponse.json();
                console.log("Profile Response:", profileData);
                
                if (profileData.email) {
                    profileDetails.innerHTML = `
                        <p class="text-lg"><span class="font-semibold text-2xl">Email:</span> ${profileData.email}</p>
                        <p class="text-lg"><span class="font-semibold text-2xl">First Name:</span> ${profileData.first_Name}</p>
                        <p class="text-lg"><span class="font-semibold text-2xl">Last Name:</span> ${profileData.last_Name}</p>
                        <p class="text-lg"><span class="font-semibold text-2xl">Role:</span> ${profileData.role}</p>
                    `;
                } else {
                    profileDetails.innerHTML = "";
                }

                // Oculta o muestra el botón de cerrar sesión según la autenticación
                if (profileData.email) {
                    loginButton.style.display = "none";
                    registerButton.style.display = "none";
                    logoutButton.style.display = "block"; // Muestra el botón de cerrar sesión
                } else {
                    loginButton.style.display = "inline-block";
                    registerButton.style.display = "inline-block";
                    logoutButton.style.display = "none"; // Oculta el botón de cerrar sesión
                }
            } else {
                console.error("Error al obtener los detalles del perfil:", profileResponse);
            }
        } catch (error) {
            console.error("Error al obtener los detalles del perfil:", error);
        }
    };

    // Cargar y mostrar los detalles del perfil al cargar la página
    loadProfileDetails();

    // Agregar eventos de clic a los botones de "Log In" y "Register"
    loginButton.addEventListener("click", () => {
        window.location.href = "http://localhost:8080/login";
    });

    registerButton.addEventListener("click", () => {
        window.location.href = "http://localhost:8080/register";
    });

    // Agregar un evento click al botón de cierre de sesión
    logoutButton.addEventListener("click", async () => {
        try {
            // Realiza una solicitud DELETE al servidor para cerrar la sesión del usuario
            const logoutResponse = await fetch("/api/sessions", {
                method: "DELETE",
            });

            if (logoutResponse.ok) {
                // Redirecciona al usuario a la página de inicio de sesión después de cerrar sesión
                window.location.href = "/";
            } else {
                console.error("Error al cerrar sesión:", logoutResponse);
            }
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    });
});