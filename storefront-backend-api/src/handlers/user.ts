// Node imports
import { Request, Response } from "express";
// Own imports
import { User, UserStore } from "../models/user";

export default {
  index: async (req: Request, res: Response): Promise<Response> => {
    try {
      const store = new UserStore();
      const result = await store.index();
      return res.json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  show: async (req: Request, res: Response): Promise<Response> => {
    try {
      const store = new UserStore();
      const result = await store.show(parseInt(req.params.userId));
      if (result) return res.json(result);
      return res.status(404).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  create: async (req: Request, res: Response): Promise<Response> => {
    try {
      const store = new UserStore();
      const user: User = {
        id: 0,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
      };
      const result = await store.create(user);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  authenticate: async (req: Request, res: Response): Promise<Response> => {
    try {
      const store = new UserStore();
      const result = await store.authenticate(
        req.body.email,
        req.body.password
      );
      return res.json(result);
    } catch (error) {
      return res.status(401).send(error);
    }
  },

  delete: async (req: Request, res: Response): Promise<Response> => {
    try {
      const store = new UserStore();
      const result = await store.delete(parseInt(req.params.userId));
      if (result) return res.json(result);
      return res.status(401).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
