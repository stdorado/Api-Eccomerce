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

    // Si el usuario es Premium, mostramos el botón para crear productos
    if (role === "Premium") {
      const createProductButton = document.createElement("a");
      createProductButton.id = "createProductButton";
      createProductButton.className =
        "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 focus:outline-none focus:shadow-outline mt-4";
      createProductButton.textContent = "Crear Producto";
      createProductButton.style.display = "block";
      createProductButton.href = "/createProduct";
      profileDetails.appendChild(createProductButton);
    }

    // Si el usuario no es Premium, mostramos el botón para actualizar a Premium
    else {
      const premiumButton = document.createElement("button");
      premiumButton.id = "premiumButton";
      premiumButton.className =
        "bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 focus:outline-none focus:shadow-outline mt-4";
      premiumButton.textContent = "Actualizar a Premium";
      premiumButton.addEventListener("click", handlePremiumUpgrade);
      profileDetails.appendChild(premiumButton);
    }
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

  const handlePremiumUpgrade = async () => {
    try {
      const profileResponse = await fetch("/api/sessions/profile");
      const profileData = await profileResponse.json();

      if (!profileResponse.ok || !profileData.success) {
        console.error("Error al obtener el perfil del usuario");
        return;
      }

      const userId = profileData.data._id;

      const upgradeResponse = await fetch(`/api/users/${userId}/upgrade`, {
        method: "POST",
      });

      if (upgradeResponse.ok) {
        await Swal.fire({
          icon: "success",
          title: "¡Usuario actualizado con éxito!",
          text: "Por favor, vuelva a iniciar sesión para aplicar los cambios.",
          showConfirmButton: false,
          timer: 3000,
        });

        setTimeout(() => {
          handleLogout();
          window.location.href = "http://localhost:8080/";
        }, 3000);
      } else {
        console.error("Error al actualizar a premium:", upgradeResponse);
      }
    } catch (error) {
      console.error("Error al actualizar a premium:", error);
    }
  };

  loginButton.addEventListener("click", handleLogin);
  registerButton.addEventListener("click", handleRegister);
  logoutButton.addEventListener("click", handleLogout);

  loadProfileDetails();
});
