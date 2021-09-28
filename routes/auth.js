var express = require('express')
// const passport = require('passport')
var router = express.Router()
const {signout,googleSignin} = require("../controllers/auth")

router.post('/googlesignin',googleSignin)
router.get("/signout",signout)

module.exports = router;