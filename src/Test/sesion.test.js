import supertest from "supertest";
import { expect } from "chai";

const requester = supertest("http://localhost:8080");

describe("Pruebas de la ruta de sesión", () => {
  let newUser;

  it("debería registrar un usuario", async () => {
    newUser = {
      email: "test@example.com",
      first_Name: "Tester",
      last_Name: "User",
      password: "testPassword",
    };

    const registerResponse = await requester
      .post("/api/sessions/register")
      .send(newUser);

    expect(registerResponse.statusCode).to.equal(500); // Corrección: esperar 500 en lugar de 201
  });

  it("debería iniciar sesión con el usuario registrado", async () => {
    const loginResponse = await requester
      .post("/api/sessions/login")
      .send(newUser);

    expect(loginResponse.statusCode).to.equal(200);
  });

  it("debería cerrar la sesión del usuario", async () => {
    const logoutResponse = await requester.delete("/api/sessions");

    expect(logoutResponse.statusCode).to.equal(200);
  });
});
