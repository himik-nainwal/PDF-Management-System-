const rootRouter = require("express").Router();

const authRouter = require("./auth/auth.router");
const dataRouter = require("./data/data.router");
const filesRouter = require("./files/files.router");
rootRouter.use("/files",filesRouter);
rootRouter.use("/auth", authRouter);
rootRouter.use("/data",dataRouter);

module.exports = rootRouter;