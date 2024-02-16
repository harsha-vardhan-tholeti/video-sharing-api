const express = require("express");

const verifyToken = require("../utils/verifyToken");
const {
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  addView,
  trendingVideos,
  randomVideos,
  subscribedVideos,
  getByTag,
  search,
} = require("../controllers/video.controller");

const router = express.Router();

router.post("/", verifyToken, addVideo);
router.patch("/:id", verifyToken, updateVideo);
router.delete("/:id", verifyToken, deleteVideo);
router.get("/:id", getVideo);
router.patch("/view/:id", addView);
router.get("/trending", trendingVideos);
router.get("/random", randomVideos);
router.get("/subscribed", verifyToken, subscribedVideos);
router.get("/tags", getByTag);
router.get("/search", search);

module.exports = router;
