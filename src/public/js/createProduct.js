document.addEventListener("DOMContentLoaded", () => {
  const createProductForm = document.getElementById("createProductForm");

  createProductForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const thumbnail = document.getElementById("thumbnail").value;
    const descripcion = document.getElementById("descripcion").value;
    const code = document.getElementById("code").value;
    const stock = parseInt(document.getElementById("stock").value);
    const price = parseFloat(document.getElementById("price").value);
    const status = document.getElementById("status").value === "true";
    const category = document.getElementById("category").value;

    const productData = {
      title,
      thumbnail,
      descripcion,
      code,
      stock,
      price,
      status,
      category,
    };

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        const newProduct = await response.json();
        await Swal.fire({
          icon: "success",
          title: "¡Product Create To success!",
          showConfirmButton: false,
          timer: 2000,
        });
        window.location.href = "/home";
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "¡Error to create Product!",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  });
});
