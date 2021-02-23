const chalk = require("chalk");
const express = require("express");
const {
    addUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
} = require("../controllers/users/users.controller");

const userValidation = require("./../controllers/users/users.validator");

try {
    const router = express.Router();

    router.get("/users", getAllUsers);

    router.get("/users/:id", getUser);

    router.post("/adduser", userValidation, addUser);

    router.post("/updateuser/:id", userValidation, updateUser);

    router.post("/deleteuser/:id", deleteUser);

    module.exports = router;
} catch (e) {
    console.log(chalk.bgRed("Error : ", e));
}


