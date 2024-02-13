document.addEventListener("DOMContentLoaded", async () => {
  const profileDetails = document.getElementById("profile-details");
  const loginButton = document.getElementById("loginButton");
  const registerButton = document.getElementById("registerButton");
  const logoutButton = document.getElementById("logoutButton");

  
  logoutButton.style.display = "none";

  const loadProfileDetails = async () => {
    try {
      const profileResponse = await fetch("/api/sessions/profile");

      if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        console.log("Profile Response:", profileData);

        if (profileData.data.email) {
          const { email, role, first_Name, last_Name, last_connection } =
            profileData.data;

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
        
        if (first_Name) {
            profileHTML += `
                <div class="mb-6">
                    <p class="text-lg font-semibold text-gray-800">First Name:</p>
                    <p class="text-lg text-gray-600">${first_Name}</p>
                </div>`;
        }
        
        if (last_Name) {
            profileHTML += `
                <div class="mb-6">
                    <p class="text-lg font-semibold text-gray-800">Last Name:</p>
                    <p class="text-lg text-gray-600">${last_Name}</p>
                </div>`;
        }
        
        profileHTML += `
                <div>
                    <p class="text-lg font-semibold text-gray-800">Last Connection:</p>
                    <p class="text-lg text-gray-600">${last_connection}</p>
                </div>
            </div>`;

          profileDetails.innerHTML = profileHTML;
        } else {
          profileDetails.innerHTML = "";
        }

        
        if (profileData.data.email) {
          loginButton.style.display = "none";
          registerButton.style.display = "none";
          logoutButton.style.display = "block";
        } else {
          loginButton.style.display = "inline-block";
          registerButton.style.display = "inline-block";
          logoutButton.style.display = "none";
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
    }
  });
});
