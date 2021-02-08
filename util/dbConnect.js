const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

// Creating a Sequelize instance (DB)
const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.USER_NAME,
    process.env.PASSWORD,
    {
        host: process.env.HOST,
        dialect: "mysql",
    }
);

module.exports = sequelize;
