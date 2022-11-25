const { Router } = require("express");
const passport = require("passport");
const User = require("../database/schemas/User");
const { hashPassword } = require("../utils/helpers");

const router = Router();

router.post("/login", (req, res) => {
  passport.authenticate("local", (err, user, options) => {
    if (user) {
      // If the user exists log him in:
      req.login(user, (error) => {
        if (error) {
          console.log(error);
          res.send(error);
        } else {
          console.log("Successfully authenticated");
          res.status(200).send(req.user.id);
        }
      });
    } else {
      console.log("ELSE WTF");
      console.log(options, err?.message); // Prints the reason of the failure
      const message = options?.message || err?.message;
      if (message) res.status(400).send({ message });
      else res.send(400);
    }
  })(req, res);
});

router.get("/logout", function (req, res) {
  req.logOut();
  res.sendStatus(200);
});

router.post("/register", async (request, response) => {
  const { username, email, password } = request.body;
  const userDB = await User.findOne({ email });
  if (userDB) {
    response.status(400).send({ message: "User already exists!" });
  } else {
    // const password = hashPassword(request.body.password);
    try {
      if (email.length && username.length && password.length) {
        const newUser = await User.create({
          username,
          password: hashPassword(password),
          email,
        });
        response.sendStatus(201);
      } else
        response.status(400).send({ message: "Fill in all input fields!" });
    } catch (err) {
      console.log(err);
      response.send(400);
    }
  }
});

module.exports = router;