/** @format */

const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const bodyParser = require("body-parser");
const registerAuthRouter = require("./routes/registerAuth");
const loginAuthRouter = require("./routes/loginAuth");

const app = express();
app.use(bodyParser.json());
mongoose.connect(process.env.MONGO_SERVER, (e) => {
  if (e) {
    console.log(`MongoDB Connection error => ${e}`);
  } else {
    console.log("-----Connected MongoDB DataBase--------");
  }
});

app.use("/auth", registerAuthRouter);
app.use("/auth", loginAuthRouter);
app.get("/", (req, res) => {
  res.send(`${process.env.DATABASE_USERNAME} selamlar son deneme 3`);
});
const server = app.listen(process.env.PORT || 3000, function () {
  console.log("--------SERVER WORKING--------");
});

// ANA SAYFA
// https://lock-note-server.herokuapp.com/
// http://localhost:3000/
