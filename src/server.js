const express = require("express");
const { configViewEngine } = require("./config/viewEngine");
const { initWebRoutes } = require("./routes/web");
const bodyParser = require("body-parser");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

configViewEngine(app);

initWebRoutes(app);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App running on PORT: ${port}`);
});
