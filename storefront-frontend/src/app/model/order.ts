export type OrderProduct = {
  id: number,
  productid: number,
  name: string,
  description: string,
  price: number,
  quantity: number,
  photo: string
};

export type Order = {
  id: number,
  status: string,
  totalPrice: number,
  lines: OrderProduct[]
};

export const EMPTY_ORDER = {
  id: 0,
  status: "",
  totalPrice: 0,
  lines: []
}

export const EMPTY_ORDERPRODUCT = {
  id: 0,
  productid: 0,
  name: "",
  description: "",
  price: 0,
  quantity: 0,
  photo: ""
}
