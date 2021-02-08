const chalk = require("chalk");

const defaultController = async (req, res) => {
    console.log(chalk.inverse("Default Route called !"));
    res.status(200);
    res.json({
        is_error: false,
        message: "Welcome to Bacancy Home Page ! ",
    });
};

module.exports = defaultController;
