const express = require("express");
const router = express.Router();

const { getHome } = require("../controllers/HomeControllers");

export const initWebRoutes = (app) => {
  router.get("/", getHome);

  return app.use("/", router);
};
