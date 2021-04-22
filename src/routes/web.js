const express = require("express");
const router = express.Router();

const {
  getHome,
  getFacebookUserProfile,
  setUpFacebookUserProfile,
} = require("../controllers/HomeControllers");
const { getWebhook, postWebhook } = require("../controllers/BotControllers");

export const initWebRoutes = (app) => {
  router.get("/", getHome);
  router.get("/profile", getFacebookUserProfile);
  router.post("/set-up-user-fb-profile", setUpFacebookUserProfile);
  router.get("/webhook", getWebhook);
  router.post("/webhook", postWebhook);

  return app.use("/", router);
};
