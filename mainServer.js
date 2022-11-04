/** @format */

const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("HELLO FROM BACKEND CEM TEST");
});
const server = app.listen(process.env.PORT || 3000, function () {
  console.log("SERVER WORKING");
});

// https://lock-note-server.herokuapp.com/
