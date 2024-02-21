const express = require("express");
const {
  signUp,
  signIn,
  signOut,
  googleAuth,
} = require("../controllers/auth.controller");

const router = express.Router();

// create a user
router.post("/signUp", signUp);

// sign in
router.post("/signIn", signIn);

// sign out
router.post("/signOut", signOut);

// google auth
router.post("/google", googleAuth);

module.exports = router;
