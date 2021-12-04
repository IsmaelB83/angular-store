import { User, UserStore } from "../../models/user";

const store = new UserStore();

const user: User = {
  id: 0,
  email: "ismael@gmail.com",
  firstname: "Ismael",
  lastname: "Bernal",
  password: "ibernal1819",
};
const password = "ibernal1819";

describe("User Model methods work as required", () => {
  it("create method should add a user", async () => {
    const result = await store.create(user);
    user.id = result.id;
    user.password = result.password;
    expect(result).toEqual(user);
  });
  it("show method should select a user", async () => {
    const result = await store.show(user.id);
    expect(result.firstname).toEqual(user.firstname);
  });
  it("authenticate method should return a user + jwt only if password is valid", async () => {
    expect(await store.authenticate(user.email, password)).not.toBeFalsy();
    try {
      await store.authenticate(user.email, password + "aux");
      expect(false).toEqual(true);
    } catch (error) {
      expect(true).toEqual(true);
    }
  });
  it("update method should updates user info", async () => {
    user.email = "gilito@gmail.com";
    user.password = "gilito2921";
    user.lastname = "Bernard";
    const result = await store.update(user);
    expect(result.lastname).toEqual("Bernard");
  });
  it("delete method should delete a user", async () => {
    await store.delete(user.id);
    const result = await store.show(user.id);
    expect(result).toBeFalsy();
  });
});
