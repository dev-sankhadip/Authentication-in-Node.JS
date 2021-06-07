const express = require("express");
const cors = require("cors");
const { authController } = require("./controller/auth.routes");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authController);

app.listen(process.env.PORT, () => {
  console.log(`running in ${process.env.PORT}`);
});
