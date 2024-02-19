document.addEventListener("DOMContentLoaded", async () => {
  const profileDetails = document.getElementById("profile-details");
  const loginButton = document.getElementById("loginButton");
  const registerButton = document.getElementById("registerButton");
  const logoutButton = document.getElementById("logoutButton");
  const premiumButton = document.getElementById("premiumButton");
  const createProductButton = document.createElement("a"); 
  createProductButton.id = "createProductButton";
  createProductButton.className = "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 focus:outline-none focus:shadow-outline mt-4";
  createProductButton.textContent = "Crear Producto";
  createProductButton.style.display = "none";
  createProductButton.href = "/createProduct"; 
  premiumButton.parentNode.insertBefore(createProductButton, premiumButton.nextSibling);

  logoutButton.style.display = "none";

  const loadProfileDetails = async () => {
    try {
      const profileResponse = await fetch("/api/sessions/profile");

      if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        console.log("Profile Response:", profileData);

        if (profileData.success) {
          const { _id: userId, email, role, last_connection } = profileData.data;
          premiumButton.dataset.userId = userId;

          let profileHTML = `
            <div class="bg-white p-8 rounded-lg shadow-md mx-auto max-w-md mb-8">
                <div class="mb-6">
                    <p class="text-lg font-semibold text-gray-800">Email:</p>
                    <p class="text-lg text-gray-600">${email}</p>
                </div>
                <div class="mb-6">
                    <p class="text-lg font-semibold text-gray-800">Role:</p>
                    <p class="text-lg text-gray-600">${role}</p>
                </div>`;

          profileHTML += `
                <div>
                    <p class="text-lg font-semibold text-gray-800">Last Connection:</p>
                    <p class="text-lg text-gray-600">${last_connection}</p>
                </div>
            </div>`;

          profileDetails.innerHTML = profileHTML;

          if (role === "admin") {
            premiumButton.style.display = "none";
            createProductButton.style.display = "block";
          } else {
            premiumButton.style.display = "block";
            createProductButton.style.display = "none";
          }

          loginButton.style.display = "none";
          registerButton.style.display = "none";
          logoutButton.style.display = "block";
        } else {
          console.error("Error al obtener los detalles del perfil:", profileData);
        }
      } else {
        console.error("Error al obtener los detalles del perfil:", profileResponse);
      }
    } catch (error) {
      console.error("Error al obtener los detalles del perfil:", error);
    }
  };

  loadProfileDetails();

  loginButton.addEventListener("click", () => {
    window.location.href = "http://localhost:8080/";
  });

  registerButton.addEventListener("click", () => {
    window.location.href = "http://localhost:8080/register";
  });

  logoutButton.addEventListener("click", async () => {
    try {
      const logoutResponse = await fetch("/api/sessions", {
        method: "DELETE",
      });

      if (logoutResponse.ok) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  });

  premiumButton.addEventListener("click", async () => {
    try {
      const userId = premiumButton.dataset.userId;
      console.log("User ID", userId)
  
      const upgradeResponse = await fetch(`/api/users/${userId}/upgrade`, {
        method: "POST",
      });
  
      if (upgradeResponse.ok) {
        window.location.reload();
      } else {
        console.error("Error al actualizar a premium:", upgradeResponse);
      }
    } catch (error) {
      console.error("Error al actualizar a premium:", error); 
    }
  });
});
