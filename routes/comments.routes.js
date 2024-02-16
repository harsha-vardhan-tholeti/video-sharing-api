const express = require("express");
const verifyToken = require("../utils/verifyToken");
const {
  addComment,
  deleteComment,
  getComments,
} = require("../controllers/comment.controller");

const router = express.Router();

router.post("/", verifyToken, addComment);
router.delete("/:id", verifyToken, deleteComment);
router.get("/:videoId", getComments);

module.exports = router;
