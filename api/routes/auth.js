const express = require("express");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Users = require("../models/Users");
const { isAuthenticated } = require("../auth");

const router = express.Router();

const signToken = (_id) => {
  return jwt.sign({ _id }, "mi-secreto", {
    expiresIn: 60 * 60 * 24 * 365,
  });
};

//Method to register in the app with email and password
router.post("/register", (req, res) => {
  const { email, password, name, last_name, username } = req.body;

  crypto.randomBytes(16, (err, salt) => {
    const newSalt = salt.toString("base64");
    crypto.pbkdf2(password, newSalt, 10000, 64, "sha1", (err, key) => {
      const encryptedPassword = key.toString("base64");
      Users.findOne({ email, username })
        .exec()
        .then((user) => {
          if (user) {
            return res.status(409).send("User with this e-mail already exists");
          }
          Users.create({
            username,
            email,
            password: encryptedPassword,
            name: name,
            last_name: last_name,
            salt: newSalt,
          }).then(() => {
            res.status(201).send("User created correctly");
          });
        });
    });
  });
});

//Method to log-in in the app
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  Users.findOne({ email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(401).send("The credentials provided are invalid.");
      }
      crypto.pbkdf2(password, user.salt, 10000, 64, "sha1", (err, key) => {
        const encryptedPassword = key.toString("base64");
        if (user.password == encryptedPassword) {
          const token = signToken(user._id);
          return res.send({ token: token, userId: user._id });
        }
        return res.status(401).send("The credentials provided are invalid.");
      });
    });
});

//Fetch user information
router.get("/me", isAuthenticated, (req, res) => {
  res.send(req.user);
});

module.exports = router;

