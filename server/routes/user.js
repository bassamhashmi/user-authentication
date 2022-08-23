const express = require("express");
const AuthenticationController = require("../controllers/auth");

const router = express.Router();

router.post("/signup", AuthenticationController.signUp);

router.post("/signin", AuthenticationController.signIn);

module.exports = router;
