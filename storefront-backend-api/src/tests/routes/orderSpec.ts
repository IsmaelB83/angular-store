// Node imports
import supertest from "supertest";
// Own imports
import app from "../../server";
import { Order } from "../../models/order";
import { UserStore } from "../../models/user";

const request = supertest(app);

// JWT for authenticated endpoints
let jwt = "";

// Order for testing
const order: Order = {
  id: 0,
  userid: 3,
  status: "active",
  lines: [],
};

describe("Test ORDERS ENDPOINTS are all authenticated", () => {
  it("Check INDEX endpoint", async () => {
    const response = await request.get("/users/3/orders");
    expect(response.status).toBe(401);
  });
  it("Check SHOW endpoint", async () => {
    const response = await request.get("/users/3/orders/1");
    expect(response.status).toBe(401);
  });
  it("Check UPDATE endpoint", async () => {
    const response = await request.put("/users/3/orders/1");
    expect(response.status).toBe(401);
  });
  it("Check UPDATE PRODUCT in order endpoint", async () => {
    const response = await request.put("/users/3/orders/1/products/1");
    expect(response.status).toBe(401);
  });
  it("Check CREATE endpoint", async () => {
    const response = await request.post("/users/3/orders");
    expect(response.status).toBe(401);
  });
  it("Check DELETE endpoint", async () => {
    const response = await request.delete("/users/3/orders/1");
    expect(response.status).toBe(401);
  });
});

describe("Test ORDER ENDPOINTS functionality", () => {
  beforeAll(async () => {
    const session = await new UserStore().authenticate(
      "johnr@gmail.com",
      "1234"
    );
    jwt = session.jwt;
  });

  it("Check CREATE endpoint creates a new order", async () => {
    const response = await request
      .post(`/users/3/orders`)
      .auth(jwt, { type: "bearer" });
    expect(response.status).toBe(201);
    order.id = response.body.id;
    expect(response.body).toEqual(order);
  });
  it("Check INDEX endpoint returns an array of orders", async () => {
    const response = await request
      .get(`/users/3/orders?status=active`)
      .auth(jwt, { type: "bearer" });
    expect(response.status).toBe(200);
    expect(response.body[0]).toEqual(order);
  });
  it("Check SHOW endpoint returns an order", async () => {
    const response = await request
      .get(`/users/3/orders/${order.id}`)
      .auth(jwt, { type: "bearer" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(order);
  });
  it("Check UPDATE LINE endpoint: adding new product to order", async () => {
    const response = await request
      .put(`/users/3/orders/${order.id}/products/1`)
      .send({ quantity: 100 })
      .auth(jwt, { type: "bearer" });
    expect(response.status).toBe(200);
  });
  it("Check UPDATE endpoint updates an order", async () => {
    const response = await request
      .put(`/users/3/orders/${order.id}`)
      .send({ status: "complete" })
      .auth(jwt, { type: "bearer" });
    expect(response.status).toBe(200);
    expect(response.body.id).toEqual(order.id);
    expect(response.body.status).toEqual("complete");
  });
  it("Check DELETE endpoint deletes an existing order", async () => {
    const response = await request
      .delete(`/users/3/orders/${order.id}`)
      .auth(jwt, { type: "bearer" });
    expect(response.status).toBe(200);
  });
});
