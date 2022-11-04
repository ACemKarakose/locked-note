/** @format */

const express = require("express");
const User = require("../models/User");
const router = express.Router();
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginSchema = Joi.object({
  USER_MAIL: Joi.string().required(),
  USER_PASSWORD: Joi.string().required(),
});

router.post("/login", (req, res) => {
  const { USER_MAIL, USER_PASSWORD } = req.body;
  const { error } = loginSchema.validate({ USER_MAIL, USER_PASSWORD });
  if (error) {
    res.json({
      CODE: 19,
      MSG: `Missing Parameters`,
    });
    return;
  }
  User.findOne({ USER_MAIL: USER_MAIL })
    .then((user) => {
      if (!user) {
        res.json({
          CODE: 19,
          MSG: "Invalid email ",
        });
        return;
      }
      const isValid = bcrypt.compareSync(USER_PASSWORD, user.USER_PASSWORD);
      if (!isValid) {
        res.json({
          CODE: 19,
          MSG: "Invalid Password",
        });
        return;
      }
      const token = jwt.sign(
        { _id: user._id, USER_MAIL: user.USER_MAIL },
        process.env.JWT_PASSWORD
      );
      res.header("Authforization", token).json({
        MSG: "Succesfully Logged in",
        CODE: 10,
        ACCESS_TOKEN: token,
      });
    })
    .catch((err) => {
      res.json({ err });
      /*
      res.json({
        c: err,
        CODE: 19,
        MSG: "Invalid email or Password",
      }); */
    });
});
module.exports = router;
