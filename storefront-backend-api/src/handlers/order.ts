// Node imports
import { Request, Response } from "express";
// Own imports
import { OrderStore } from "../models/order";

export default {
  index: async (req: Request, res: Response): Promise<Response> => {
    try {
      const store = new OrderStore();
      const result = await store.index(
        parseInt(req.params.userId),
        req.query["status"] as string
      );
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  showActive: async (req: Request, res: Response): Promise<Response> => {
    try {
      const store = new OrderStore();
      const result = await store.showActive(parseInt(req.params.userId));
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  show: async (req: Request, res: Response): Promise<Response> => {
    try {
      const store = new OrderStore();
      const result = await store.show(parseInt(req.params.orderId));
      return res.json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  update: async (req: Request, res: Response): Promise<Response> => {
    try {
      const store = new OrderStore();
      const result = await store.update(
        parseInt(req.params.orderId),
        req.body.status
      );
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  updateProduct: async (req: Request, res: Response): Promise<Response> => {
    try {
      const store = new OrderStore();
      const result = await store.updateProduct(
        parseInt(req.params.orderId),
        parseInt(req.params.productId),
        parseInt(req.body.quantity)
      );
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  create: async (req: Request, res: Response): Promise<Response> => {
    try {
      const store = new OrderStore();
      const result = await store.create(parseInt(req.params.userId), "active");
      if (result) return res.status(201).json(result);
      return res.status(500).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  delete: async (req: Request, res: Response): Promise<Response> => {
    try {
      const store = new OrderStore();
      const result = await store.delete(parseInt(req.params.orderId));
      return res.json(result);
      return res.status(200).json({});
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
