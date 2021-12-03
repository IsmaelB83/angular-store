export type Product = {
  id: number,
  photo: string,
  name: string,
  price: number,
  category: string
};

export const EMPTY_PRODUCT = {
  id: 0,
  name: "",
  price: 0,
  category: "",
  photo: ""
}
