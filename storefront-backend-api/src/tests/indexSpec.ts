// Node imports
import supertest from "supertest";
// Own imports
import app from "../server";
import { initData } from "./data/dummy";
import { OrderStore } from "../models/order";
import { UserStore } from "../models/user";
import { ProductStore } from "../models/product";

const request = supertest(app);

describe("Test DB Scheme. Init data.", () => {
  it("Create entities in database", async () => {
    await initData();
    const users = await new UserStore().index();
    expect(users.length).toEqual(3);
    const products = await new ProductStore().index();
    expect(products.length).toEqual(13);
    const orders = await new OrderStore().index(users[0].id, "active");
    expect(orders.length).toEqual(1);
    const orders2 = await new OrderStore().index(users[1].id, "active");
    expect(orders2.length).toEqual(1);
  });
});

describe("Test API endpoint responses", () => {
  it("Gets the api endpoint", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });
});
