const sequelize = require("./dbConnect");
const chalk = require("chalk");

const connectDB = async () => {
    try {
        // To check if the Connection is OK or not
        await sequelize.authenticate();
        console.log(chalk.black.bgGreen("Connected to DB successfully ! "));
    } catch (e) {
        console.log(chalk.bgRed("Error Connecting to DB ! "));
        console.log(chalk.bgRed("Error : ", e));
    }
};

const closeDB = async () => {
    try {
        // To close the Connection
        await sequelize.close();
        console.log(chalk.black.bgGreen("Disconnected to DB successfully ! "));
    } catch (e) {
        console.log(chalk.bgRed("Error Disconnecting to DB !"));
        console.log(chalk.bgRed("Error : ", e));
    }
};

module.exports = { connectDB, closeDB };
