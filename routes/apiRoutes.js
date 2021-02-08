const express = require("express");
const addUser = require("./../controllers/addUser");
const getAllUsers = require("../controllers/getAllUsers");
const getUser = require("../controllers/getUser");
const updateUser = require("../controllers/updateUser");
const deleteUser = require("../controllers/deleteUser");

const router = express.Router();

router.get("/users", getAllUsers);

router.post("/adduser", addUser);

router.get("/users/:id", getUser);

router.post("/updateuser/:id", updateUser);

router.post("/deleteuser/:id", deleteUser);

module.exports = router;
