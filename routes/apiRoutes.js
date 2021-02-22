const chalk = require("chalk");
const express = require("express");
const {
    addUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
} = require("../controllers/users/users.controller");

try {
    const router = express.Router();

    router.get("/users", getAllUsers);
    
    router.post("/adduser", addUser);
    
    router.get("/users/:id", getUser);
    
    router.post("/updateuser/:id", updateUser);
    
    router.post("/deleteuser/:id", deleteUser);

    module.exports = router;
    
} catch (e) {
    console.log(chalk.bgRed("Error : ", e));
}


