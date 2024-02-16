const express = require("express");
const { signUp, signIn } = require("../controllers/auth.controller");

const router = express.Router();

// create a user
router.post("/signUp", signUp);

// sign in
router.post("/signIn", signIn);

// google auth
router.post("/googleAuth");

module.exports = router;
