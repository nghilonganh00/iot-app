import express from "express";
import UserActionController from "./controllers/useraction.controller";
import DatasensorController from "./controllers/datasensor.controller";

let router = express.Router();

let initWebRoutes = (app) => {
  app.post("/user-action/toggle", UserActionController.toggle);
  app.get("/user-action/device-status", UserActionController.getStatus);
  app.get("/user-action/history-action", UserActionController.handleGetAll);

  app.get("/datasensor", DatasensorController.handleGetAll);
  return app.use("/", router);
};

module.exports = initWebRoutes;
