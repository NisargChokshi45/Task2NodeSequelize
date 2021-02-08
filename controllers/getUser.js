const chalk = require("chalk");
const User = require("../models/user");

const getUser = async (req, res) => {
    const user_id = req.params.id;
    console.log(chalk.inverse("/api/users called !"));
    try {
        const fetchedUser = await User.findOne({
            where: { id: user_id, is_active: true },
        });
        // console.log(chalk.inverse(JSON.stringify(fetchedUser, null, 4)));
        res.status(200);
        res.json({
            is_error: false,
            message: "Fetched User Successfully ! ",
            data: fetchedUser,
        });
    } catch (e) {
        console.log(chalk.bgRed("Error Getting the user ! "));
        console.log(chalk.bgRed("Error : ", e));
        res.status(500);
        res.json({ is_error: true, message: "Error getting the user ! " });
    }
};

module.exports = getUser;
