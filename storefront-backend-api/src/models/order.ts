// Node imports
// Own imports
import Client from "../database";

/**
 * Each order/object + quantity is an order line
 */
export type OrderProduct = {
  id: number;
  orderid: number;
  productid: number;
  quantity: number;
};

/**
 * Order model type
 */
export type Order = {
  id: number;
  userid: number;
  status: string;
  lines?: OrderProduct[];
};

const SQL_SELECT_ORDERS = "SELECT * FROM orders WHERE userid=($1)";
const SQL_SELECT_ORDER = "SELECT * FROM orders WHERE id=($1)";
const SQL_SELECT_ORDERS_BY_STATUS =
  "SELECT * FROM orders WHERE userid=($1) AND status=($2)";
const SQL_SELECT_ORDER_DETAIL =
  "SELECT ps.id, orderid, productid, quantity, name, price, category, photo FROM orderproducts as ps JOIN products as p ON ps.productid = p.id WHERE orderId=($1)";
const SQL_UPDATE_ORDER =
  "UPDATE orders SET status=($2) WHERE id=($1) RETURNING *";
const SQL_INSERT_ORDER =
  "INSERT INTO orders(userid, status) VALUES ($1, $2) RETURNING *";
const SQL_DELETE_ORDER = "DELETE FROM orders WHERE id=($1) RETURNING *";

const SQL_SELECT_ORDERPRODUCT =
  "SELECT * FROM orderproducts WHERE orderid=($1) AND productid=($2)";
const SQL_INSERT_ORDERPRODUCT =
  "INSERT INTO orderproducts(orderid, productid, quantity) VALUES ($1, $2, $3)";
const SQL_UPDATE_ORDERPRODUCT =
  "UPDATE orderproducts SET quantity=($2) WHERE id=($1)";
const SQL_DELETE_ORDERPRODUCT = "DELETE FROM orderproducts WHERE id=($1)";
const SQL_DELETE_ORDERPRODUCTS = "DELETE FROM orderproducts WHERE orderid=($1)";

/**
 * Class to work with Order model
 */
export class OrderStore {
  async index(userid: number, status?: string): Promise<Order[]> {
    const conn = await Client.connect();
    const sqlParams: (number | string)[] = [userid];
    let sql = SQL_SELECT_ORDERS;
    if (status) {
      sql = SQL_SELECT_ORDERS_BY_STATUS;
      sqlParams.push(status);
    }
    const results = await conn.query(sql, sqlParams);
    conn.release();
    for (const order of results.rows) {
      order.lines = [];
      const result2 = await conn.query(SQL_SELECT_ORDER_DETAIL, [order.id]);
      result2.rows.forEach((line) => order.lines.push(line));
    }
    return results.rows;
  }

  async showActive(userid: number): Promise<Order> {
    const conn = await Client.connect();
    const result = await conn.query(SQL_SELECT_ORDERS_BY_STATUS, [
      userid,
      "active",
    ]);
    const order = result.rows[0];
    if (order) {
      order.lines = [];
      const result2 = await conn.query(SQL_SELECT_ORDER_DETAIL, [order.id]);
      result2.rows.forEach((row) => order.lines.push(row));
    }
    conn.release();
    return order;
  }

  async show(id: number): Promise<Order> {
    const conn = await Client.connect();
    const result = await conn.query(SQL_SELECT_ORDER, [id]);
    if (result.rows.length) {
      const result2 = await conn.query(SQL_SELECT_ORDER_DETAIL, [id]);
      result.rows[0].lines = [];
      result2.rows.forEach((line) => result.rows[0].lines.push(line));
    }
    conn.release();
    return result.rows[0];
  }

  async update(id: number, status: string): Promise<Order> {
    const conn = await Client.connect();
    await conn.query(SQL_UPDATE_ORDER, [id, status]);
    conn.release();
    return await this.show(id);
  }

  async updateProduct(
    orderId: number,
    productId: number,
    quantity: number
  ): Promise<Order> {
    const conn = await Client.connect();
    // Check product already exists in order
    const result = await conn.query(SQL_SELECT_ORDERPRODUCT, [
      orderId,
      productId,
    ]);
    if (result.rows.length) {
      if (quantity < 1)
        await conn.query(SQL_DELETE_ORDERPRODUCT, [result.rows[0].id]);
      else
        await conn.query(SQL_UPDATE_ORDERPRODUCT, [
          result.rows[0].id,
          quantity,
        ]);
    } else {
      await conn.query(SQL_INSERT_ORDERPRODUCT, [orderId, productId, quantity]);
    }
    conn.release();
    return await this.show(orderId);
  }

  async create(userid: number, status: string): Promise<Order> {
    const conn = await Client.connect();
    const result = await conn.query(SQL_INSERT_ORDER, [userid, status]);
    conn.release();
    return await this.show(result.rows[0].id);
  }

  async delete(id: number): Promise<Order> {
    const conn = await Client.connect();
    await conn.query(SQL_DELETE_ORDERPRODUCTS, [id]);
    const result = await conn.query(SQL_DELETE_ORDER, [id]);
    conn.release();
    return result.rows[0];
  }
}
