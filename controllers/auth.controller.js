const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/errorHandler.js");

const signUp = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = await User.create({ ...req.body, password: hash });

    res.status(201).json({
      status: "success",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });

    if (!user) return next(errorHandler(404, "User not found"));

    const isCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isCorrectPassword)
      return next(errorHandler(400, "Wrong Credentials!"));

    const token = jwt.sign({ id: user._id }, process.env.JWT);

    const { password, ...others } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: false,
      })
      .status(200)
      .json({
        status: "success",
        data: others,
      });
  } catch (error) {
    return next(error);
  }
};

const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT);

      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
    } else {
      const newUser = await User.create({
        ...req.body,
        fromGoogle: true,
      });

      const token = jwt.sign({ id: newUser._id }, process.env.JWT);

      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(newUser._doc);
    }
  } catch (err) {
    next(err);
  }
};

const signOut = async (req, res, next) => {
  res.clearCookie("access_token");
  return res.status(200).send({ message: "logged out successfully!" });
};

module.exports = {
  signUp,
  signIn,
  googleAuth,
  signOut,
};
