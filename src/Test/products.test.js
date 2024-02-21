import supertest from "supertest";
import { expect } from "chai";

const requester = supertest("http://localhost:8080");

describe("Pruebas de productos", () => {
  let productId;

  it("debería crear un nuevo producto", async () => {
    const newProductData = {
      title: "Nuevo Producto",
      thumbnail: "https://example.com/product-thumbnail.jpg",
      descripcion: "Descripción del nuevo producto",
      code: "NP001",
      stock: 100,
      price: 29.99,
      status: true,
      category: "Electrónica",
    };

    const response = await requester.post("/api/products").send(newProductData);

    expect(response.statusCode).to.equal(201);
    expect(response.body).to.have.property("_id");
    productId = response.body._id;
  });

  it("debería obtener un producto por su id", async () => {
    const response = await requester.get(`/api/products/${productId}`);

    expect(response.statusCode).to.equal(200);
    expect(response.body).to.have.property("product");
    expect(response.body.product).to.have.property("title");
    expect(response.body.product.title).to.equal("Nuevo Producto");
  });

  it("debería actualizar un producto por su id", async () => {
    const updatedProductData = {
      title: "Producto Actualizado",
      price: 39.99,
    };

    const response = await requester
      .put(`/api/products/${productId}`)
      .send(updatedProductData);

    expect(response.statusCode).to.equal(200);
    expect(response.body).to.have.property("title");
    expect(response.body.title).to.equal("Producto Actualizado");
  });

  it("debería eliminar un producto por su id", async () => {
    const response = await requester.delete(`/api/products/${productId}`);

    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.an("object");
  });
});
