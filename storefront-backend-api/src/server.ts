// Node imports
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";
import http from "http";
import https from "https";
// Own imports
import config from "./config";
import routes from "./routes";
import { authMiddleware } from "./middlewares";

// Create express
const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get("/", (_req, res) => res.send("OK"));
app.use("/users", routes.userRoutes);
app.use("/products", routes.productRoutes);
app.use("/users/:userId/orders", authMiddleware, routes.orderRoutes);
app.use("/services", routes.serviceRoutes);

if (config.TYPE === "http") {
  // Servidor HTTP
  try {
    const httpServer = http.createServer(app);
    httpServer.listen(config.PORT, () => {
      console.log(`HTTP OK - Server running on port ${config.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
} else {
  // Servidor HTTPS
  try {
    const privateKey = fs.readFileSync(config.PRIVATEKEY, "utf8");
    const certificate = fs.readFileSync(config.CERTIFICATE, "utf8");
    const ca = fs.readFileSync(config.CA, "utf8");
    const credentials = {
      key: privateKey,
      cert: certificate,
      ca: ca,
    };
    const httpsServer = https.createServer(credentials, app);
    httpsServer.listen(config.PORT, () => {
      console.log(`HTTPS OK - Server running on port ${config.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

export default app;
