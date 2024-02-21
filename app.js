const express = require("express");
const AuthRouter = require("./routes/auth.routes");
const UserRouter = require("./routes/user.routes");
const VideoRouter = require("./routes/videos.routes");
const CommentRouter = require("./routes/comments.routes");
const errorMiddleware = require("./middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://video-sharing-ui.vercel.app/"],
    credentials: true,
  })
);

// Routes
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/videos", VideoRouter);
app.use("/api/v1/comments", CommentRouter);

app.use(errorMiddleware);

module.exports = app;
