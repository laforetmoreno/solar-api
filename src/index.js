const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");
const mongoose = require("mongoose");

const app = express();
const PORT = 8080;

// Database config
mongoose.connect("mongodb://localhost:27017/solar", {
  useCreateIndex: true,
  useNewUrlParser: true
});

mongoose.Promise = global.Promise;

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.listen(PORT, () => console.log(`Server running in port: ${PORT}`));
