import { Product, ProductStore } from "../../models/product";

const store = new ProductStore();

const product: Product = {
  id: 0,
  name: "CYBERPUNK",
  price: 59,
  category: "videogames",
  photo:
    "https://areajugones.sport.es/wp-content/uploads/2019/06/Cyberpunk2077AJ.jpg",
};

describe("Product Model methods work as required", () => {
  it("create method should add a Product", async () => {
    const result = await store.create(product);
    expect(result).not.toBeNull();
    if (product) product.id = result.id;
    expect(result).toEqual(product);
  });
  it("update method should edit product details", async () => {
    product.name = "THE WITCHER 3";
    product.price = 25;
    const result = await store.update(product);
    expect(result).toEqual(product);
  });
  it("show method should return a Product", async () => {
    const result = await store.show(product.id);
    expect(result).toEqual(product);
  });
  it("index method should return a Product", async () => {
    const result = await store.index();
    expect(result.length).toEqual(14);
  });
  it("delete method should delete a product", async () => {
    await store.delete(product.id);
    const result = await store.show(product.id);
    expect(result).toBeFalsy();
  });
});
