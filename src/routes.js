const routes = require("express").Router();
const usersControllers = require("./controllers/usersControllers");

routes.post("/users", usersControllers.create);
routes.get("/users", usersControllers.retrieveAll);
routes.delete("/users/:id", usersControllers.deleteUser);

module.exports = routes;
