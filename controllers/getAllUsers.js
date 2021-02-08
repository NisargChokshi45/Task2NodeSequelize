const chalk = require("chalk");
const User = require("../models/user");

const getAllUsers = async (req, res) => {
    console.log(chalk.inverse("/api/users called !"));
    try {
        const fetchedUsers = await User.findAll({ where: { is_active: true } });
        // console.log(chalk.inverse(JSON.stringify(fetchedUsers, null, 4)));
        res.status(200);
        res.json({
            is_error: false,
            message: "Fetched Users Successfully ! ",
            data: fetchedUsers,
        });
    } catch (e) {
        console.log(chalk.bgRed("Error Getting users ! "));
        console.log(chalk.bgRed("Error : ", e));
        res.status(500);
        res.json({ is_error: true, message: "Error getting Users ! " });
    }
};

module.exports = getAllUsers;
