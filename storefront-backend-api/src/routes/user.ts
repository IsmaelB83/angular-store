// Node imports
import { Router } from "express";
// Own imports
import handlers from "../handlers/user";
import { authMiddleware } from "../middlewares";

const routes = Router();

routes.get("/", authMiddleware, handlers.index);
routes.get("/:userId", authMiddleware, handlers.show);
routes.post("/", handlers.create);
routes.post("/auth", handlers.authenticate);
routes.delete("/:userId", authMiddleware, handlers.delete);

export default routes;
