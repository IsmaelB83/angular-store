// Node imports
import { Router } from "express";
// Own imports
import { authMiddleware } from "../middlewares";
import handlers from "../handlers/product";

const routes = Router();

routes.get("/", handlers.index);
routes.get("/:productId", handlers.show);
routes.post("/", authMiddleware, handlers.create);
routes.put("/:productId", authMiddleware, handlers.update);
routes.delete("/:productId", authMiddleware, handlers.delete);

export default routes;
