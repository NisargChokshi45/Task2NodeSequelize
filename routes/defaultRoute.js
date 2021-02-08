const express = require("express");
const defaultController = require("./../controllers/defaultController");

const router = express.Router();

router.get("/", defaultController);

module.exports = router;
