const chalk = require("chalk");
const { DataTypes } = require("sequelize");
const sequelize = require("./../util/dbConnect");

const Admin = sequelize.define(
    "Admin",
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        secondName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        // Other Essential Options
    }
);

// console.log(chalk.black.bgGreen(Admin === sequelize.models.Admin));
module.exports = Admin;
