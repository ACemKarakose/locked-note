/** @format */

const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const bodyParser = require("body-parser");
const registerAuthRouter = require("./routes/registerAuth");
const loginAuthRouter = require("./routes/loginAuth");

const app = express();
app.use(bodyParser.json());
mongoose.connect(
  `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.qcgsfuz.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
  (e) => {
    if (e) {
      console.log(`MongoDB Connection error => ${e}`);
    } else {
      console.log("-----Connected MongoDB DataBase--------");
    }
  }
);

app.use("/auth", registerAuthRouter);
app.use("/auth", loginAuthRouter);
app.get("/", (req, res) => {
  res.send("Hello");
});
const server = app.listen(process.env.PORT || 3000, function () {
  console.log("--------SERVER WORKING--------");
});

// ANA SAYFA
// https://lock-note-server.herokuapp.com/
