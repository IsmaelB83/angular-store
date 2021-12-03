// Node imports
import { Request, Response, NextFunction } from "express";
import jsonwebtoken from "jsonwebtoken";
// Own imports
import config from "../config";
import { OrderStore } from "../models/order";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    // Valid token
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jsonwebtoken.verify(token, config.TOKEN_SECRET as jsonwebtoken.Secret);
      return next();
    }
    return res.status(401).send("Acces Denied! Wrong token");
  } catch (err) {
    return res.status(401).send("Acces Denied! Wrong token");
  }
};

export const authOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    // Check userId in params is the same than the one in JWT
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      const aux = jsonwebtoken.verify(
        token,
        config.TOKEN_SECRET as jsonwebtoken.Secret
      ) as jsonwebtoken.JwtPayload;
      if (aux["id"] !== parseInt(req.params.userId))
        return res
          .status(401)
          .send(`Access denied! Not authorized to user ${req.params.userId}`);
    }
    // Every user is only authorized to work only with its own orders
    if (req.params.orderId) {
      const result = await new OrderStore().show(parseInt(req.params.orderId));
      if (!result || result.userid !== parseInt(req.params.userId))
        return res.status(401).send("Acces Denied! Not authorized to order");
    }
    return next();
  } catch (err) {
    console.log(err);
    return res.status(401).send("Acces Denied! Not authorized to order");
  }
};
