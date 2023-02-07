const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require('bcryptjs')

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/signup", (req, res, next) => {
  res.render("signup");
});


router.post('/signup', async (req, res, next) => {
console.log(req.body)
const body  = {...req.body}
const salt = bcrypt.genSaltSync(13)
const passswordHash = bcrypt.hashSync(body.password, salt)
console.log(passswordHash)
delete body.password
body.passswordHash = passswordHash
await User.create(body)
res.send(body)
})


module.exports = router;
