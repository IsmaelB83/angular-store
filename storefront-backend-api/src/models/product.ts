// Node imports
// Own imports
import Client from "../database";

/**
 * Product model type
 */
export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  photo: string;
};

const SQL_SELECT_PRODUCTS = "SELECT * FROM products";
const SQL_SELECT_PRODUCT = "SELECT * FROM products WHERE id=($1)";
const SQL_UPDATE_PRODUCT =
  "UPDATE products SET name=($2), price=($3), category=($4), photo=($5) WHERE id=($1) RETURNING *";
const SQL_INSERT_PRODUCT =
  "INSERT INTO products(name, price, category, photo) VALUES ($1, $2, $3, $4) RETURNING *";
const SQL_DELETE_PRODUCT = "DELETE FROM products WHERE id=($1) RETURNING *";

/**
 * Class to work with product model
 */
export class ProductStore {
  async index(): Promise<Product[]> {
    const conn = await Client.connect();
    const results = await conn.query(SQL_SELECT_PRODUCTS);
    conn.release();
    return results.rows;
  }

  async show(id: number): Promise<Product> {
    const conn = await Client.connect();
    const result = await conn.query(SQL_SELECT_PRODUCT, [id]);
    conn.release();
    return result.rows[0];
  }

  async update(product: Product): Promise<Product> {
    const conn = await Client.connect();
    const result = await conn.query(SQL_UPDATE_PRODUCT, [
      product.id,
      product.name,
      product.price,
      product.category,
      product.photo,
    ]);
    conn.release();
    return result.rows[0];
  }

  async create(product: Product): Promise<Product> {
    const conn = await Client.connect();
    const result = await conn.query(SQL_INSERT_PRODUCT, [
      product.name,
      product.price,
      product.category,
      product.photo,
    ]);
    conn.release();
    return result.rows[0];
  }

  async delete(id: number): Promise<Product> {
    const conn = await Client.connect();
    const result = await conn.query(SQL_DELETE_PRODUCT, [id]);
    conn.release();
    return result.rows[0];
  }
}
