const express = require("express");
const authRouter = require("./authRouter");
const tripRouter = require("./tripRouter");
const imageRouter = require("./imageRouter");
const userRouter = require("./userRouter");
const searchRouter = require("../router/searchRouter");
const commentRouter = require("../router/commentRouter");
const followRouter = require("./followRouter");
const scheduleRouter = require("../router/scheduleRouter");
const tripviewsRouter = require("../router/tripviewsRouter");

const v1Router = express.Router();

v1Router.use("/auths", authRouter);
v1Router.use("/trip", tripRouter);
v1Router.use("/images", imageRouter);
v1Router.use("/users", userRouter);
v1Router.use("/search", searchRouter);
v1Router.use("/comments", commentRouter); // trip 본문과 합치기 전, test 용
v1Router.use("/follows", followRouter);
v1Router.use("/schedule", scheduleRouter);
v1Router.use("/tripviews", tripviewsRouter);

module.exports = {
  v1: v1Router,
};
