require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

// Database config
mongoose.connect("mongodb://localhost:27017/solar", {
  useCreateIndex: true,
  useNewUrlParser: true
});

mongoose.Promise = global.Promise;

// Routes
require("./controllers/dashboardController")(app);
require("./controllers/usersController")(app);

app.listen(PORT, () => console.log(`Server running in port: ${PORT}`));
