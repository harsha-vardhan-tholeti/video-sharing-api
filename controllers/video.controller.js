const User = require("../models/user.model");
const Video = require("../models/video.model");
const errorHandler = require("../utils/errorHandler");

const addVideo = async (req, res, next) => {
  try {
    const video = await Video.create({ userId: req.user.id, ...req.body });

    res.status(201).json(video);
  } catch (error) {
    next(error);
  }
};

const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findOne({ userId: req.user.id });
    if (video) {
      const updateVideo = await Video.findByIdAndUpdate(
        req.params.id,
        { $set: { ...req.body } },
        {
          new: true,
        }
      );

      res.status(200).json(updateVideo);
    } else {
      return next(errorHandler(403, "You can only update your own video"));
    }
  } catch (error) {
    next(error);
  }
};

const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findOne({ userId: req.user.id });
    if (video) {
      await Video.findByIdAndDelete(req.params.id);

      res.status(200).json("Video deleted successfully");
    } else {
      return next(errorHandler(403, "You can only delete your own video"));
    }
  } catch (error) {
    next(error);
  }
};

const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);

    res.status(200).json(video);
  } catch (error) {
    next(error);
  }
};

const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });

    res.status(200).json("The view has been added");
  } catch (error) {
    next(error);
  }
};

const trendingVideos = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });

    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

const randomVideos = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 20 } }]);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

const subscribedVideos = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    const subscribedChannels = user.subscribedChannels;

    const subVideos = await Promise.all(
      subscribedChannels.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );

    res.status(200).json(subVideos.flat());
  } catch (error) {
    next(error);
  }
};

const getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(",");

  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

const search = async (req, res, next) => {
  const query = req.query.query;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);

    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

module.exports = {
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
};
