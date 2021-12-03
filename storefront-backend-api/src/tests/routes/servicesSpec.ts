// Node imports
import supertest from "supertest";
// Own imports
import app from "../../server";

const request = supertest(app);

describe("Check API services endpoint", () => {
  it("Check products by category endpoint", async () => {
    const response = await request.get(`/services/products?category=cpu`);
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(3);
    const response2 = await request.get(`/services/products?category=gpu`);
    expect(response2.status).toBe(200);
    expect(response2.body.length).toEqual(4);
  });

  it("Check TOP-5 products endpoint", async () => {
    const response = await request.get(`/services/top-products?top=5`);
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(5);
    expect(response.body[0].name).toEqual("Delta White RGB DDR4 3200");
    expect(response.body[0].sales).toEqual("6");
    expect(response.body[1].name).toEqual("MSI X470 Gaming Plus");
    expect(response.body[1].sales).toEqual("4");
  });
});
