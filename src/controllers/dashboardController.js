const express = require("express");
const authController = require("../middlewares/auth");

const router = express();

router.use(authController);

router.get("/dashboard", (req, res) => {
  return res.send({ ok: true, user: req.userId });
});

module.exports = app => app.use("/", router);
