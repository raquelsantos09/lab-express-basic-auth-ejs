const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require('bcryptjs')
const { isLoggedIn } = require('../middleware/route-guard')

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});



module.exports = router;
