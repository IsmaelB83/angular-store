// Node imports
import { Router } from "express";
// Own imports
import handlers from "../handlers/services";

const routes = Router();

routes.get("/products", handlers.products);
routes.get("/top-products", handlers.topProducts);

export default routes;
