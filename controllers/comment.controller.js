const Comment = require("../models/comment.model");
const Video = require("../models/video.model");
const errorHandler = require("../utils/errorHandler");

const addComment = async (req, res, next) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      userId: req.user.id,
    });

    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const video = await Video.findById(req.params.id);
    if (req.user.id === comment.userId || req.user.id === video.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("The comment has been deleted");
    } else {
      return next(errorHandler(403, "You can only delete your comment"));
    }
  } catch (error) {
    next(error);
  }
};

const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });

    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addComment,
  deleteComment,
  getComments,
};
