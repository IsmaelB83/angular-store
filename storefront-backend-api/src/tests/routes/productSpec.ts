// Node imports
import supertest from "supertest";
// Own imports
import app from "../../server";
import { Product } from "../../models/product";
import { UserStore } from "../../models/user";

const request = supertest(app);

// JWT for authenticated endpoints
let jwt = "";

// Product for testing
const product: Product = {
  id: 0,
  name: "LAPTOP",
  price: 350,
  category: "hardware",
  photo:
    "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4LqQX?ver=1f00",
};

describe("Test PRODUCTS ENDPOINTS are authenticated", () => {
  it("Check CREATE endpoint is authenticated", async () => {
    const response = await request.post("/products");
    expect(response.status).toBe(401);
  });
  it("Check UPDATE endpoint is authenticated", async () => {
    const response = await request.put("/products/1");
    expect(response.status).toBe(401);
  });
  it("Check DELETE endpoint is authenticated", async () => {
    const response = await request.delete("/products/1");
    expect(response.status).toBe(401);
  });
});

describe("Test PRODUCTS ENDPOINTS functionality", () => {
  beforeAll(async () => {
    const session = await new UserStore().authenticate(
      "john@gmail.com",
      "1234"
    );
    jwt = session.jwt;
  });

  it("Check INDEX endpoint returns an array of products", async () => {
    const response = await request.get("/products");
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(13);
  });
  it("Check SHOW endpoint returns a product", async () => {
    const response = await request.get(`/products/1`);
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual("Corsair Vengeance LPX DDR4 3200");
  });
  it("Check CREATE endpoint creates a new product", async () => {
    const response = await request
      .post(`/products`)
      .send(product)
      .auth(jwt, { type: "bearer" });
    expect(response.status).toBe(201);
    product.id = response.body.id;
    expect(response.body).toEqual(product);
  });
  it("Check UPDATE endpoint updates an existing product", async () => {
    product.name = "UPDATED PRODUCT";
    const response = await request
      .put(`/products/${product.id}`)
      .send(product)
      .auth(jwt, { type: "bearer" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(product);
  });
  it("Check DELETE endpoint deletes an existing product", async () => {
    const response = await request
      .delete(`/products/${product.id}`)
      .auth(jwt, { type: "bearer" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(product);
    const response2 = await request.get(`/products/${product.id}`);
    expect(response2.status).toBe(404);
  });
});
