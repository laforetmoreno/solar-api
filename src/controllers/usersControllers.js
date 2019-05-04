const User = require("../models/user");

const create = async (req, res) => {
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

    return res.send({ user });
  } catch (err) {
    return res.status(400).send({ error: "Failure" });
  }
};

const retrieveAll = async (req, res) => {
  const users = await User.find();

  try {
    return res.json(users);
  } catch (error) {
    return res.status(404).send({ error: "No users found." });
  }
};

const deleteUser = async (req, res) => {
  console.log("opaaaaaa");
  const user = await User.findById(req.params.id);

  try {
    await user.remove();

    return res.json("User deleted successfully.");
  } catch (error) {
    return res.status(404).send({ error: "The user can not be removed." });
  }
};

module.exports = {
  create,
  retrieveAll,
  deleteUser
};
