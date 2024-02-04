import supertest from "supertest";
import { expect } from "chai";

const requester = supertest("http://localhost:8080");

describe("Pruebas de la ruta de sesión", () => {
  let user = {
    email: "test@example.com",
    first_Name: "Test",
    last_Name: "User",
    password: "testPassword",
  };
  let newUser;

  it("debería registrar un usuario y luego iniciar sesión", async () => {
    const registerResponse = await requester
      .post("/api/sessions/register")
      .send(user);

    expect(registerResponse.statusCode).to.equal(201);

    const loginResponse = await requester
      .post("/api/sessions/login")
      .send(user);

    expect(loginResponse.statusCode).to.equal(200);

    newUser = user;
  });

  it("debería obtener el perfil del usuario", async () => {
    const profileResponse = await requester
      .get("/api/sessions/profile")
      .set("Authorization", `Bearer ${newUser.token}`); // Utiliza el token de sesión en lugar de simular la sesión con una cookie

    expect(profileResponse.statusCode).to.equal(200);
    expect(profileResponse.body).to.deep.equal(newUser); // Comprueba que el perfil devuelto sea igual al usuario registrado
  });

  it("debería cerrar la sesión del usuario", async () => {
    const logoutResponse = await requester.delete("/api/sessions");

    expect(logoutResponse.statusCode).to.equal(200);
  });
});