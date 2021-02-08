const sequelize = require("./dbConnect");
const chalk = require("chalk");
const User = require("./../models/user");
const Admin = require("./../models/admin");

const syncAllModels = async () => {
    try {
        await sequelize.sync({ force: true }); // Drops the table if already exists & Creates a new table
        await sequelize.sync({ alter: true }); // Updates the existing model to match the current specified model
        console.log(
            chalk.black.bgGreen("All models are Synchronized Successfully !")
        );
    } catch (e) {
        console.log(chalk.bgRed("Error Syncing the Models ! "));
        console.log(chalk.bgRed("Error : ", e));
    }
};

const syncUserModel = async () => {
    try {
        await User.sync();
        console.log(
            chalk.black.bgGreen("USER Model Synchronized Successfully !")
        );
    } catch (e) {
        console.log(chalk.bgRed("Error Syncing the USER Model !"));
        console.log(chalk.bgRed("Error : ", e));
    }
};

const syncAdminModel = async () => {
    try {
        await Admin.sync();
        console.log(
            chalk.black.bgGreen("ADMIN Model Synchronized Successfully !")
        );
    } catch (e) {
        console.log(chalk.bgRed("Error Syncing the ADMIN Model ! "));
        console.log(chalk.bgRed("Error : ", e));
    }
};

// const dropModel = async (modelName) => {
//     try {
//         await modelName.drop();
//         console.log(
//             chalk.black.bgGreen(`${modelName} Model Dropped Successfully !`)
//         );
//     } catch (e) {
//         console.log(chalk.bgRed(`Error Dropping the ${modelName} Model ! `));
//         console.log(chalk.bgRed("Error : ", e));
//     }
// };

module.exports = { syncAllModels, syncUserModel, syncAdminModel };
