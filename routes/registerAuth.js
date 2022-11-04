/** @format */

const express = require("express");
const User = require("../models/User");
const router = express.Router();
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerSchema = Joi.object({
  USER_MAIL: Joi.string().required().email().min(3).max(255),
  USER_PASSWORD: Joi.string().required().min(6).max(255),
  USER_NAME: Joi.string().required(),
  USER_SURNAME: Joi.string().required(),
});

router.post("/register", (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    res.json({
      CODE: 19,
      MSG: `Missing Parameters`,
    });
    return;
  }

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(req.body.USER_PASSWORD, salt);
  const user = new User({ ...req.body, USER_PASSWORD: hashPassword });
  user
    .save()
    .then((user) => {
      res.json({ user, CODE: 10 });
    })
    .catch((err) => {
      res.json({
        err,
        CODE: 19,
        MSG: `The mail you entered is Taken`,
      });
    });
});
module.exports = router;
