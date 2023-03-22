const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./models/models");
const swaggerUi = require("swagger-ui-express");
const specs = require("./swagger");
const {
  contractsRouter,
  jobsRouter,
  balanceRouter,
  adminRouter,
} = require("./routes/routes");
const app = express();

app.use(bodyParser.json());
app.set("sequelize", sequelize);
app.set("models", sequelize.models);

//use swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

// use routers
app.use("/contracts", contractsRouter);
app.use("/jobs", jobsRouter);
app.use("/balances", balanceRouter);
app.use("/admin", adminRouter);

//fall back all urls
app.get("*", function (req, res) {
  res.send("Maybe you are missing something? ", 404);
});
module.exports = app;
