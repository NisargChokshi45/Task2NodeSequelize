const express = require("express");
const {
    addUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
} = require("../controllers/users/users.controller");

const router = express.Router();

router.get("/users", getAllUsers);

router.post("/adduser", addUser);

router.get("/users/:id", getUser);

router.post("/updateuser/:id", updateUser);

router.post("/deleteuser/:id", deleteUser);

module.exports = router;
