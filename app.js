const express = require("express");
const AuthRouter = require("./routes/auth.routes");
const UserRouter = require("./routes/user.routes");
const VideoRouter = require("./routes/videos.routes");
const CommentRouter = require("./routes/comments.routes");
const errorMiddleware = require("./middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/videos", VideoRouter);
app.use("/api/v1/comments", CommentRouter);

app.use(errorMiddleware);

module.exports = app;
