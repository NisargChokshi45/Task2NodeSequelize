const chalk = require("chalk");
const { DataTypes, Model } = require("sequelize");
const sequelize = require("./../util/dbConnect");

// ----------------------------------- METHOD - 1 | Using Seuqelize.define() ---------------------------
// const User = sequelize.define(
//     "User",
//     {
//         firstName: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         lastName: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         email: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true,
//         },
//         mobileNumber: {
//             type: DataTypes.BIGINT,
//             allowNull: false,
//             unique: true,
//             comment: "This is a Comment attached to the Mobile Number Column",
//         },
//         country: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             defaultValue: "India",
//         },
//         darkTheme: {
//             type: DataTypes.BOOLEAN,
//             allowNull: false,
//             defaultValue: false,
//         },
//     },
//     {
//         // Other Essential Options
//         //  freezeTableName: true
//         //  tableName: 'Customers'
//     }
// );

// ----------------------------- METHOD - 2 | Extending the Model Class ----------------------------------------
class User extends Model {
    getFullName() {
        return [this.firstName, this.lastName].join(" ");
    }
}

User.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            isAlpha: true,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            isAlpha: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            isEmail: true,
        },
        mobileNumber: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: true,
            comment: "This is a Comment attached to the MobileNumber Column",
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "India",
        },
        darkTheme: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        sequelize,
        modelName: "User",
    }
);

// console.log(chalk.black.bgGreen(User === sequelize.models.User));
module.exports = User;
