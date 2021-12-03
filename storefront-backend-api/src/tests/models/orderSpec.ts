import { Order, OrderStore } from "../../models/order";

const store = new OrderStore();
const order: Order = {
  id: 0,
  userid: 3,
  status: "active",
  lines: [],
};

describe("Order Model methods work as required", () => {
  it("create should add an Order", async () => {
    const result = await store.create(order.userid, order.status);
    expect(result).not.toBeNull();
    order.id = result.id;
    expect(result).toEqual(order);
  });
  it("index should return a list of Orders", async () => {
    const result = await store.index(order.userid, "active");
    expect(result).toEqual([order]);
  });
  it("show should return the correct Order", async () => {
    const result = await store.show(order.id);
    order.lines = [];
    expect(result).toEqual(order);
  });
  it("update line should add a new object+quantity when product is new to order", async () => {
    const result = await store.updateProduct(order.id, 1, 10);
    expect(result.lines).toBeTruthy();
    expect(result.lines?.length).toEqual(1);
    if (result.lines) expect(result.lines[0].quantity).toEqual(10);
  });
  it("update line should add a new object+quantity when product is new to order", async () => {
    const result = await store.updateProduct(order.id, 2, 5);
    expect(result.lines).toBeTruthy();
    expect(result.lines?.length).toEqual(2);
    if (result.lines) expect(result.lines[0].quantity).toEqual(10);
  });
  it("update line should update object quantity when product is already in order", async () => {
    const result = await store.updateProduct(order.id, 1, 20);
    expect(result.lines).toBeTruthy();
    expect(result.lines?.length).toEqual(2);
    if (result.lines) expect(result.lines[0].quantity).toEqual(20);
  });

  it("update status in order", async () => {
    order.status = "complete";
    const result = await store.update(order.id, order.status);
    expect(result.id).toEqual(order.id);
    expect(result.status).toEqual("complete");
  });

  afterAll(async () => {
    await store.delete(order.id);
  });
});
