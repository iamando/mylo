const express = require("express");
const router = express.Router();

const { getHome } = require("../controllers/HomeControllers");
const { getWebhook, postWebhook } = require("../controllers/BotControllers");

export const initWebRoutes = (app) => {
  router.get("/", getHome);
  router.get("/webhook", getWebhook);
  router.post("/webhook", postWebhook);

  return app.use("/", router);
};
