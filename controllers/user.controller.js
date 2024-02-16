const User = require("../models/user.model.js");
const Video = require("../models/video.model.js");
const errorHandler = require("../utils/errorHandler.js");

const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      {
        new: true,
      }
    );

    res.status(200).json(updatedUser);
  } else {
    return next(errorHandler(403, "You can update only your account!"));
  }
};

const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);

      res.status(200).json("User has been deleted.");
    } catch (error) {
      next(err);
    }
  } else {
    return next(errorHandler(403, "You can update only your account!"));
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return next(errorHandler(404, "User not found!"));

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const subscribe = async (req, res, next) => {
  try {
    const user = await User.findOne({ subscribedUsers: req.params.id });

    if (!user) {
      await User.findByIdAndUpdate(req.user.id, {
        $push: {
          subscribedChannels: req.params.id,
        },
      });

      await User.findByIdAndUpdate(req.params.id, {
        $push: {
          subscribedUsers: req.user.id,
        },
        $inc: {
          subscribers: 1,
        },
      });

      const updatedUserSubscriptions = await User.findById(req.params.id);

      res.status(200).json(updatedUserSubscriptions);
    } else {
      return next(errorHandler(403, "You are already subscribed!"));
    }
  } catch (error) {
    next(error);
  }
};

const unsubscribe = async (req, res, next) => {
  try {
    const user = await User.findOne({ subscribedUsers: req.params.id });

    if (!user) {
      await User.findByIdAndUpdate(req.user.id, {
        $pull: {
          subscribedChannels: req.params.id,
        },
      });

      await User.findByIdAndUpdate(req.params.id, {
        $pull: {
          subscribedUsers: req.user.id,
        },
        $inc: {
          subscribers: -1,
        },
      });

      const updatedUserSubscriptions = await User.findById(req.params.id);

      res.status(200).json(updatedUserSubscriptions);
    } else {
      return next(errorHandler(403, "You are already unsubscribed!"));
    }
  } catch (error) {
    next(error);
  }
};

const like = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    const liked = await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { disLikes: id },
    });

    // console.log(liked);

    res.status(200).json("The video has been liked.");
  } catch (error) {
    next(error);
  }
};

const dislike = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { disLikes: id },
      $pull: { likes: id },
    });

    res.status(200).json("The video has been disliked.");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
};
