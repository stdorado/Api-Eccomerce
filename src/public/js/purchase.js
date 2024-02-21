document.addEventListener("DOMContentLoaded", () => {
  const confirmarCompraButton = document.getElementById(
    "confirmarCompraButton"
  );
  const ticketElement = document.getElementById("ticketDetails");
  const cartId = "6526aabcfb59b510c4693a02";

  confirmarCompraButton.addEventListener("click", async () => {
    try {
      const response = await fetch(`/api/carts/${cartId}/purchase`, {
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Verifica si ya existe un ticket antes de crear uno nuevo
          if (!document.getElementById("ticketDetails")) {
            console.log("Ya existe un ticket. Evitando la creación duplicada.");
          } else {
            ticketElement.style.display = "block"; // Ajusta según tu estilo
          }

          // Muestra un mensaje al usuario
          alert("Compra realizada con éxito");
        } else {
          alert(`Error al finalizar la compra: ${data.error}`);
        }
      } else {
        const data = await response.json();
        alert(`Error al finalizar la compra: ${data.error}`);
      }
    } catch (error) {
      console.error("Error al finalizar la compra:", error);
      alert("Hubo un error al finalizar la compra");
    }
  });
});
