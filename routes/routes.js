const express = require("express");
const defaultRouter = require("./defaultRoute");
const apiRouter = require("./apiRoutes");

const router = express.Router();

router.use("/", defaultRouter);

router.use("/api", apiRouter);

module.exports = router;
