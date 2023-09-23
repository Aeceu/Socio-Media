const express = require("express");
const cors = require("cors");
const connectDB = require("./src/utils/connectDB");
const UserRouter = require("./src/router/UserRouter");
const PostRouter = require("./src/router/PostRouter");
const CommentRouter = require("./src/router/CommentRouter");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { requireAuth } = require("./src/middleware/AuthMiddleware");
const bodyParser = require("body-parser");
const { getCookie } = require("./src/controller/UserController");
dotenv.config();

const app = express();

//! middleware
// app.use(express.json());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "100mb",
    extended: true,
  })
);
app.use(
  cors({
    origin: "http://localhost:5173" || "https://socio-media-smoky.vercel.app/",
    credentials: true, // This allows cookies to be sent along with the request
  })
);
app.use(cookieParser());

// ! DATABASE
connectDB();

//* router
app.use("/", UserRouter);
app.use("/post", PostRouter);
app.use("/comment", CommentRouter);
app.get("/get-cookie", getCookie);

//* listing to PORT 3001
app.listen(3001, () => {
  console.log("You are listening to port: 3001!");
});
