 export type User = {
  id: number,
  email: string,
  firstname: string,
  lastname: string,
  jwt: string
};

export const EMPTY_USER = {
  id: 0,
  email: "",
  firstname: "",
  lastname: "",
  jwt: ""
}
