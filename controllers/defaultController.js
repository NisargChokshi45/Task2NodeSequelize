const chalk = require("chalk");

const defaultController = (req, res) => {
    try {
        console.log(chalk.inverse("Default Route called !"));
        res.status(200);
        res.json({
            is_error: false,
            message: "Welcome to Bacancy Home Page ! ",
        });
    } catch (e) {
        console.log(chalk.bgRed("Error : ", e));
        res.status(500);
        res.json({
            is_error: true,
            message: "Error showing HomePage ! ",
        });
    }
};

module.exports = defaultController;
