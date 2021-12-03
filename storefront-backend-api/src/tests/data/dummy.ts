// Own imports
import { Order, OrderStore } from "../../models/order";
import { User, UserStore } from "../../models/user";
import { Product, ProductStore } from "../../models/product";

const orderStore = new OrderStore();
const orders: Order[] = [
  {
    id: 0,
    userid: 0,
    status: "active",
    lines: [
      { id: 0, orderid: 0, productid: 0, quantity: 1 },
      { id: 1, orderid: 0, productid: 1, quantity: 1 },
      { id: 2, orderid: 0, productid: 2, quantity: 3 },
      { id: 3, orderid: 0, productid: 4, quantity: 4 },
    ],
  },
  {
    id: 1,
    userid: 1,
    status: "active",
    lines: [
      { id: 0, orderid: 1, productid: 1, quantity: 5 },
      { id: 1, orderid: 1, productid: 7, quantity: 2 },
      { id: 2, orderid: 1, productid: 8, quantity: 3 },
      { id: 3, orderid: 1, productid: 9, quantity: 3 },
      { id: 4, orderid: 1, productid: 3, quantity: 1 },
    ],
  },
];

const userStore = new UserStore();
const users: User[] = [
  {
    id: 0,
    email: "john@gmail.com",
    firstname: "John",
    lastname: "Doe",
    password: "1234",
  },
  {
    id: 1,
    email: "johns@gmail.com",
    firstname: "John",
    lastname: "Smith",
    password: "1234",
  },
  {
    id: 3,
    email: "johnr@gmail.com",
    firstname: "John",
    lastname: "Ramirez",
    password: "1234",
  },
];

const productStore = new ProductStore();
const products: Product[] = [
  {
    id: 0,
    name: "Corsair Vengeance LPX DDR4 3200",
    price: 75,
    category: "ram",
    photo:
      "https://thumb.pccomponentes.com/w-530-530/articles/26/262822/corsair-vengeance-lpx-ddr4-3200-pc4-25600-16gb-2x8gb-cl16-negro.jpg",
  },
  {
    id: 1,
    name: "Delta White RGB DDR4 3200",
    price: 98,
    category: "ram",
    photo: "https://thumb.pccomponentes.com/w-530-530/articles/21/217575/1.jpg",
  },
  {
    id: 2,
    name: "Delta RGB DDR4 3600MHz",
    price: 97,
    category: "ram",
    photo:
      "https://thumb.pccomponentes.com/w-530-530/articles/31/312071/1670-team-group-t-force-delta-rgb-ddr4-3600mhz-pc4-28800-16gb-2x8gb-cl18-negro.jpg",
  },
  {
    id: 3,
    name: "Asus Prime B460M-A R2.0",
    price: 80,
    category: "motherboard",
    photo:
      "https://thumb.pccomponentes.com/w-530-530/articles/42/425592/1225-asus-prime-b460m-a-r20.jpg",
  },
  {
    id: 4,
    name: "MSI X470 Gaming Plus",
    price: 102,
    category: "motherboard",
    photo:
      "https://thumb.pccomponentes.com/w-530-530/articles/23/238976/sf-nvr6432-4k16p.jpg",
  },
  {
    id: 5,
    name: "MSI B460M-A PRO",
    price: 81,
    category: "motherboard",
    photo:
      "https://thumb.pccomponentes.com/w-530-530/articles/30/300462/1582-msi-b460m-a-pro-opiniones.jpg",
  },
  {
    id: 6,
    name: "AMD Ryzen 5 5600X",
    price: 223,
    category: "cpu",
    photo:
      "https://thumb.pccomponentes.com/w-530-530/articles/32/328475/1101-amd-ryzen-5-5600x-37ghz.jpg",
  },
  {
    id: 7,
    name: "Core I5 10400",
    price: 183,
    category: "cpu",
    photo:
      "https://thumb.pccomponentes.com/w-530-530/articles/28/287895/intel-core-i5-10400-290-ghz-comprar.jpg",
  },
  {
    id: 8,
    name: "Core I7 11700K",
    price: 369,
    category: "cpu",
    photo:
      "https://thumb.pccomponentes.com/w-530-530/articles/36/362354/123-intel-core-i7-11700k-35-ghz.jpg",
  },
  {
    id: 9,
    name: "RTX 3070 GAMING Z",
    price: 999,
    category: "gpu",
    photo:
      "https://thumb.pccomponentes.com/w-530-530/articles/42/422944/1186-msi-geforce-rtx-3070-gaming-z-trio-lhr-8gb-gddr6.jpg",
  },
  {
    id: 10,
    name: "RTX 3080 Ti FTW3",
    price: 1699,
    category: "gpu",
    photo:
      "https://thumb.pccomponentes.com/w-530-530/articles/41/411297/1419-evga-geforce-rtx-3080-ti-ftw3-ultra-12gb-gddr6x.jpg",
  },
  {
    id: 11,
    name: "GTX 1050Ti D5 4GB",
    price: 367,
    category: "gpu",
    photo:
      "https://thumb.pccomponentes.com/w-530-530/articles/10/106067/1111.jpg",
  },
  {
    id: 12,
    name: "AMD Radeon RX 6600XT",
    price: 659,
    category: "gpu",
    photo:
      "https://thumb.pccomponentes.com/w-530-530/articles/47/478844/1569-powercolor-red-devil-amd-radeon-rx-6600xt-8gb-gddr6.jpg",
  },
];

export const initData = async (): Promise<void> => {
  // Create set of products
  for (const prd of products) {
    const result = await productStore.create(prd);
    prd.id = result.id;
  }

  // Create set of users
  for (const usr of users) {
    const result = await userStore.create(usr);
    usr.id = result.id;
  }

  // Create two orders
  for (const ord of orders) {
    ord.userid = users[ord.userid].id;
    const result = await orderStore.create(ord.userid, "active");
    ord.id = result.id;
    if (ord.lines) {
      for (const lin of ord.lines) {
        lin.productid = products[lin.productid].id;
        const result = await orderStore.updateProduct(
          ord.id,
          lin.productid,
          lin.quantity
        );
        lin.id = result.id;
      }
    }
  }
};

export const destroyData = async (): Promise<void> => {
  for (const ord of orders) {
    if (ord.lines) {
      for (const lin of ord.lines) {
        await orderStore.delete(lin.id);
      }
    }
    orderStore.delete(ord.id);
  }
  products.forEach((p) => productStore.delete(p.id));
  users.forEach((u) => userStore.delete(u.id));
};
