document.addEventListener("DOMContentLoaded", async () => {
  const profileDetails = document.getElementById("profile-details");
  const loginButton = document.getElementById("loginButton");
  const registerButton = document.getElementById("registerButton");
  const logoutButton = document.getElementById("logoutButton");

  const loadProfileDetails = async () => {
    try {
      const profileResponse = await fetch("/api/sessions/profile");

      if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        console.log("Profile Response:", profileData);

        if (profileData.success) {
          renderProfile(profileData.data);
        } else {
          console.error(
            "Error al obtener los detalles del perfil:",
            profileData
          );
        }
      } else {
        console.error(
          "Error al obtener los detalles del perfil:",
          profileResponse
        );
      }
    } catch (error) {
      console.error("Error al obtener los detalles del perfil:", error);
    }
  };

  const renderProfile = (userData) => {
    const { email, role, last_connection, _id } = userData;

    let profileHTML = `
      <div class="bg-white p-8 rounded-lg shadow-md mx-auto max-w-md mb-8">
        <div class="mb-6">
          <p class="text-lg font-semibold text-gray-800">Email:</p>
          <p class="text-lg text-gray-600">${email}</p>
        </div>
        <div class="mb-6">
        <p class="text-lg font-semibold text-gray-800">ID USER:</p>
        <p class="text-lg text-gray-600">${_id}</p>
      </div>
        <div class="mb-6">
          <p class="text-lg font-semibold text-gray-800">Role:</p>
          <p class="text-lg text-gray-600">${role}</p>
        </div>
        <div>
          <p class="text-lg font-semibold text-gray-800">Last Connection:</p>
          <p class="text-lg text-gray-600">${last_connection}</p>
        </div>
      </div>`;

    profileDetails.innerHTML = profileHTML;

    loginButton.style.display = "none";
    registerButton.style.display = "none";
    logoutButton.style.display = "block";
  };

  const handleLogin = () => {
    window.location.href = "http://localhost:8080/";
  };

  const handleRegister = () => {
    window.location.href = "http://localhost:8080/register";
  };

  const handleLogout = async () => {
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
  };

  loginButton.addEventListener("click", handleLogin);
  registerButton.addEventListener("click", handleRegister);
  logoutButton.addEventListener("click", handleLogout);

  loadProfileDetails();
});
