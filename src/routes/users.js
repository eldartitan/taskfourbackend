const { Router } = require("express");
const passport = require("passport");
const User = require("../database/schemas/User");
const { hashPassword, comparePassword } = require("../utils/helpers");

const router = Router();

router.use((req, res, next) => {
  console.log("Inside Groceries Auth Check Middleware");
  console.log(req.user);
  if (req.user) {
    if (req.user.blocked) {
      console.log("user blocked in check block");
      req.logOut();
      res.send(401)
    } else next();
    // next();
  } else res.send(401);
});

router.get("/", async (request, response) => {
  console.log("Get Users");
  const usersArray = await User.find();
  response.send(usersArray);
});

router.post("/block", async (request, response) => {
  console.log("Blocking proccess");
  const { users_id, block } = request.body;
  console.log(users_id, block);
  try {
    // let followers_arr = User.find( { _id : { $in : users_id } } );
    let bulk_ops_arr = [];

    for (let id of users_id) {
      let update_op = {
        updateOne: {
          filter: { _id: id },
          update: { $set: { blocked: block } },
        },
      };
      bulk_ops_arr.push(update_op);
    }

    User.bulkWrite(bulk_ops_arr);
  } catch (err) {
    console.log(err);
    response.send(400);
  }
  console.log("Blocking proccess end");
  if (users_id.includes(request.user.id)) response.send(401)
  else response.send(200);
});

router.post("/remove", async (request, response) => {
  console.log("Remove");
  const { users_id } = request.body;
  try {
    // let followers_arr = User.find( { _id : { $in : users_id } } );
    let bulk_ops_arr = [];

    for (let id of users_id) {
      let delete_op = {
        deleteOne: { filter: { _id: id } },
      };
      bulk_ops_arr.push(delete_op);
    }

    User.bulkWrite(bulk_ops_arr);
  } catch (err) {
    console.log(err);
    response.send(400);
  }
  console.log("Remove END");
  
  if (users_id.includes(request.user.id)) response.send(400)
  response.send(200);
});

module.exports = router;