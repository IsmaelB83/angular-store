// Node imports
import { Request, Response } from "express";
// Own imports
import { Product, ProductStore } from "../models/product";

export default {
  index: async (req: Request, res: Response): Promise<Response> => {
    try {
      const store = new ProductStore();
      const result = await store.index();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  show: async (req: Request, res: Response): Promise<Response> => {
    try {
      const store = new ProductStore();
      const result = await store.show(parseInt(req.params.productId));
      if (result) return res.json(result);
      return res.status(404).send({});
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  update: async (req: Request, res: Response): Promise<Response> => {
    try {
      const store = new ProductStore();
      const old = await store.show(parseInt(req.params.productId));
      if (old) {
        const updated: Product = {
          id: old.id,
          name: req.body.name || old.name,
          price: req.body.price || old.price,
          category: req.body.category || old.category,
          photo: req.body.photo || old.photo,
        };
        const result = await store.update(updated);
        if (result) return res.status(200).json(result);
      }
      return res.status(404).json({});
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  create: async (req: Request, res: Response): Promise<Response> => {
    try {
      const store = new ProductStore();
      const product: Product = {
        id: 0,
        name: req.body.name,
        price: req.body.price || 0,
        category: req.body.category || "",
        photo: req.body.photo || "",
      };

      if (!product.name) return res.status(401).send("Name is mandatory");

      const result = await store.create(product);
      if (result) return res.status(201).json(result);
      return res.status(404).json({});
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  delete: async (req: Request, res: Response): Promise<Response> => {
    try {
      const store = new ProductStore();
      const result = await store.delete(parseInt(req.params.productId));
      if (result) return res.json(result);
      return res.status(404).json({});
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
