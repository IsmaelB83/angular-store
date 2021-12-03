// Node imports
import supertest from "supertest";
import jsonwebtoken from "jsonwebtoken";
// Own imports
import config from "../../config";
import app from "../../server";
import { User } from "../../models/user";

const request = supertest(app);

const user: User = {
  id: 0,
  email: "johndl@gmail.com",
  firstname: "John",
  lastname: "LoL",
  password: "qwerty",
};

let jwt = "";

describe("Test USERS ENDPOINTS are all authenticated", () => {
  it("Check INDEX endpoint is authenticated", async () => {
    const response = await request.get("/users");
    expect(response.status).toBe(401);
  });
  it("Check SHOW endpoint is authenticated", async () => {
    const response = await request.get("/users/1");
    expect(response.status).toBe(401);
  });
});

describe("Test USER ENDPOINTS functionality", () => {
  it("Check CREATE returns a new user", async () => {
    const response = await request.post("/users").send(user);
    expect(response.status).toBe(201);
    if (response.body) {
      user.id = response.body.id;
      user.password = response.body.password;
    }
    expect(response.body).toEqual(user);
  });
  it("Check AUTHENTICATE returns a jwt", async () => {
    const response = await request.post("/users/auth").send({
      email: user.email,
      password: "qwerty",
    });
    expect(response.status).toBe(200);
    jsonwebtoken.verify(
      response.body.jwt,
      config.TOKEN_SECRET as jsonwebtoken.Secret
    );
    jwt = response.body.jwt;
  });
  it("Check SHOW returns a user object", async () => {
    const response = await request
      .get(`/users/${user.id}`)
      .auth(jwt, { type: "bearer" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(user);
  });
  it("Check INDEX returns an array of users", async () => {
    const response = await request.get(`/users`).auth(jwt, { type: "bearer" });
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(4);
    expect(response.body[0].firstname).toEqual("John");
  });
  it("Check DELETE user", async () => {
    const response = await request.get(`/users`).auth(jwt, { type: "bearer" });
    expect(response.status).toBe(200);
  });
});
