const express = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
} = require("../controllers/user.controller");
const verifyToken = require("../utils/verifyToken");

const router = express.Router();

// update user
router.patch("/:id", verifyToken, updateUser);

// delete user
router.delete("/:id", verifyToken, deleteUser);

// get a user
router.get("/:id", getUser);

// subscribe a user
router.patch("/subscribe/:id", verifyToken, subscribe);

// unsubscribe a user
router.patch("/unsubscribe/:id", verifyToken, unsubscribe);

// like a video
router.patch("/like/:videoId", verifyToken, like);

// dislike a video
router.patch("/dislike/:videoId", verifyToken, dislike);

module.exports = router;
