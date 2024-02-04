import supertest from "supertest";
import { expect } from "chai";

const requester = supertest("http://localhost:8080");

const cartId = "6526aabefb59b510c4693a06";
const productId = "652eb022f23aa84665ed7a29"; 
const userCredentials = {
  email: "adminCoder@coder.com",
  password: "adminCod3r123$"
};

describe("Pruebas de carrito", () => {
  let userSessionCookie;

  before(async () => {
    
    const loginResponse = await requester
      .post("/api/sessions/login") 
      .send(userCredentials);
    
   
    userSessionCookie = loginResponse.headers['set-cookie'];
  });

  it("debería agregar un producto al carrito y luego eliminarlo", async function() {
    this.timeout(5000); 

    // Agregar el producto al carrito
    const addToCartResponse = await requester
      .post(`/api/carts/${cartId}/products/${productId}`)
      .set('Cookie', userSessionCookie); 

    expect(addToCartResponse.statusCode).to.equal(200);
    expect(addToCartResponse.body).to.have.property("success").to.be.true;

    // Eliminar el producto del carrito
    const removeFromCartResponse = await requester
      .delete(`/api/carts/${cartId}/products/${productId}`)
      .set('Cookie', userSessionCookie);
    expect(removeFromCartResponse.statusCode).to.equal(200);
    expect(removeFromCartResponse.body).to.have.property("success").to.be.true;
  });
});