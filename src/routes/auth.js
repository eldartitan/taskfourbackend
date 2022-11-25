const { Router } = require("express");
const passport = require("passport");
const User = require("../database/schemas/User");
const { hashPassword } = require("../utils/helpers");

const router = Router();

router.post("/login", passport.authenticate("local"), async (req, res) => {
  console.log("Logged In");
  console.log(req.user.id);
  res.status(200).send(req.user.id);
});

router.get("/logout", function (req, res) {
  req.logOut();
  res.sendStatus(200);
});

router.post("/register", async (request, response) => {
  const { username, email } = request.body;
  const userDB = await User.findOne({ email });
  if (userDB) {
    response.status(400).send({ msg: "User already exists!" });
  } else {
    const password = hashPassword(request.body.password);
    try {
      const newUser = await User.create({ username, password, email });
      response.sendStatus(201);
    } catch (err) {
      console.log(err);
      response.send(400);
    }
  }
});

module.exports = router;
