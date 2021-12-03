// Node imports
import { Request, Response } from "express";
// Own imports
import Client from "../database";

export default {
  products: async (req: Request, res: Response): Promise<Response> => {
    try {
      const conn = await Client.connect();
      const sql = ` SELECT * 
                    FROM products 
                    WHERE category=($1)
                `;
      const result = await conn.query(sql, [req.query["category"]]);
      conn.release();
      return res.status(200).json(result.rows);
    } catch (error) {
      return res.status(501).send(error);
    }
  },

  topProducts: async (req: Request, res: Response): Promise<Response> => {
    try {
      const conn = await Client.connect();
      const sql = ` SELECT productid as product, p.name, SUM(quantity) as sales
                    FROM orderproducts
                    INNER JOIN products as p ON p.id = orderproducts.productid
                    GROUP BY productid, p.name
                    ORDER BY SUM(quantity) DESC
                    LIMIT ($1)
                `;
      const result = await conn.query(sql, [req.query["top"]]);
      conn.release();
      return res.status(200).json(result.rows);
    } catch (error) {
      return res.status(501).send(error);
    }
  },
};
