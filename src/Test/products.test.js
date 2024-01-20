import supertest from "supertest";
import { expect } from "chai";
import mongoose from "mongoose";
import app from "../app.js";

let requester;
let createdProductId;
let token;

before(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    requester = supertest(app);

    
    const userCredentials = {
      email: "adminCoder@coder.com",
      password: "adminCod3r123$",
    };
    const loginResponse = await requester.post("/api/sessions/login").send(userCredentials);
    token = loginResponse.body.message.token;
  } catch (error) {
    console.error('Error during setup:', error);
    process.exit(1);
  }
});

after(async () => {
  await mongoose.connection.close();
});

describe("Product Routes", () => {
  it("should get the list of products", async () => {
    const response = await requester.get("/products");
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("products");
    expect(response.body.products).to.be.an("array");
  });

  it("should get a product by ID", async () => {
    const response = await requester.get("/products/1");
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("product");
  });

  it("should create a new product successfully", async () => {
    const newProductData = {
      title: "Test Product",
      price: 19.99,
      thumbnail: "https://example.com/thumbnail.jpg",
      descripcion: "Test Description",
      stock: 15,
    };

    const response = await requester.post("/products").send(newProductData).set("Authorization", `Bearer ${token}`);

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("productName").equal("Test Product");
    createdProductId = response.body.productId;
  });

  it("should update a product by ID", async () => {
    const response = await requester.put(`/products/${createdProductId}`).send({ price: 29.99 }).set("Authorization", `Bearer ${token}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("message").equal("Producto actualizado con éxito");
  });

  it("should delete a product by ID", async () => {
    const response = await requester.delete(`/products/${createdProductId}`).set("Authorization", `Bearer ${token}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("message").equal("Producto eliminado con éxito");
  });
});