// Node imports
import { Router } from "express";
// Own imports
import { authOrder } from "../middlewares";
import handlers from "../handlers/order";

const routes = Router({ mergeParams: true });

routes.get("/", authOrder, handlers.index);
routes.get("/active", authOrder, handlers.showActive);
routes.get("/:orderId", authOrder, handlers.show);
routes.put("/:orderId", authOrder, handlers.update);
routes.put("/:orderId/products/:productId", authOrder, handlers.updateProduct);
routes.post("/", handlers.create);
routes.delete("/:orderId", authOrder, handlers.delete);

export default routes;
