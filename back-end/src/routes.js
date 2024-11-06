import express from "express";
import UserActionController from "./controllers/useraction.controller";
import DatasensorController from "./controllers/datasensor.controller";

let router = express.Router();

let initWebRoutes = (app) => {
  app.get("/api/devices/states", UserActionController.getStatus);
  app.post("/api/devices/:device/power", UserActionController.toggle);
  app.get("/api/devices", UserActionController.handleGetAll);

  app.get("/api/datasensor", DatasensorController.handleGetAll);

  return app.use("/", router);
};

module.exports = initWebRoutes;
