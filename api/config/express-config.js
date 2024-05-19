const express = require("express");
const app = express();

const cors = require("cors");
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

const usersRouter = require("../src/domains/users/controllers/index.js");
app.use("/api/users", usersRouter);

const stickersRouter = require("../src/domains/stickers/controllers/index.js");
app.use("/api/stickers", stickersRouter);

const usersStickersRouter = require("../src/domains/userStickers/controllers/index.js");
app.use("/api/userStickers", usersStickersRouter);

const notificationsRouter = require("../src/domains/notifications/controllers/index.js");
app.use("/api/notifications", notificationsRouter);

const errorHandler = require("../src/middlewares/error-handler.js");
app.use(errorHandler);

module.exports = app;
