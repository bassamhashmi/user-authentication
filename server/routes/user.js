const express = require("express");
const AuthenticationController = require("../controllers/auth");
const { verifyJWT } = require("../middlewares/users");

const router = express.Router();

router.get("/me", verifyJWT, AuthenticationController.getUserData);

router.get("/all", AuthenticationController.getAllUsers);

router.post("/signup", AuthenticationController.signUp);

router.post("/signin", AuthenticationController.signIn);

module.exports = router;
