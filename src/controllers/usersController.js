const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express();

const { SECRET } = process.env;

const generateToken = (params = {}) => {
  return jwt.sign(params, SECRET, { expiresIn: 82400 });
};

router.post("/create", async (req, res) => {
  try {
    const { name, email, password, state } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).send({ error: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      state
    });

    user.password = undefined;

    return res.send({
      user,
      token: generateToken({ id: user.id })
    });
  } catch (err) {
    return res.status(400).send({ error: "User can not be created" });
  }
});

router.get("/retriveAll", async (req, res) => {
  const users = await User.find();

  try {
    return res.json(users);
  } catch (error) {
    return res.status(404).send({ error: "No users found." });
  }
});

router.delete("/delete", async (req, res) => {
  const user = await User.findById(req.params.id);

  try {
    await user.remove();

    return res.json("User deleted successfully.");
  } catch (error) {
    return res.status(404).send({ error: "User can not be removed." });
  }
});

router.post("/authenticate", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(400).send({ error: "User does not exist" });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(400).send({ error: "Invalid password" });
  }

  user.password = undefined;

  res.send({
    user,
    token: generateToken({ id: user.id })
  });
});

module.exports = app => {
  app.use("/", router);
};
