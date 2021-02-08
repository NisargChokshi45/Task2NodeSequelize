const User = require("../models/user");
const chalk = require("chalk");
const checkEmail = require("./../validations/checkEmail");
const checkName = require("./../validations/checkName");
const checkMobile = require("./../validations/checkMobile");
const checkCountry = require("./../validations/checkCountry");
const checkTheme = require("./../validations/checkTheme");
const checkStatus = require("./../validations/checkStatus");

const addUser = async (req, res) => {
    console.log(chalk.inverse("/api/adduser called !"));
    const valid_fname = checkName(req.body.firstName);
    const valid_lname = checkName(req.body.lastName);
    const valid_email = checkEmail(req.body.email);
    const valid_mobile = checkMobile(req.body.mobileNumber);
    const valid_country = checkCountry(req.body.country);
    const valid_theme = checkTheme(req.body.darkTheme);
    const valid_status = checkStatus(req.body.is_active);

    if (valid_fname) {
        var user_fname = req.body.firstName;
    } else {
        res.status(400);
        res.json({ is_error: true, message: "First Name not valid ! " });
    }

    if (valid_lname) {
        var user_lname = req.body.lastName;
    } else {
        res.status(400);
        res.json({ is_error: true, message: "Last Name not valid ! " });
    }

    if (valid_email) {
        var user_email = req.body.email;
    } else {
        res.status(400);
        res.json({ is_error: true, message: "Email not valid ! " });
    }

    if (valid_mobile) {
        var user_mobile = req.body.mobileNumber;
    } else {
        res.status(400);
        res.json({ is_error: true, message: "Mobile Number not valid ! " });
    }

    const user_country = valid_country;
    const user_darkTheme = valid_theme;
    const user_is_active = valid_status;

    if (req.body.id !== undefined) {
        const user_id = req.body.id;
        try {
            const result = await User.findByPk(user_id);
            if (result) {
                res.status(400);
                res.json({ is_error: true, message: "User Already Exists !" });
            }
        } catch (e) {
            console.log(chalk.bgRed("Error Finding the User by ID !"));
            res.status(500);
            res.json({
                is_error: true,
                message: "Error Finding the User by ID !",
            });
        }
    } else {
        try {
            const newUser = await User.create({
                firstName: user_fname,
                lastName: user_lname,
                email: user_email,
                mobileNumber: user_mobile,
                country: user_country,
                darkTheme: user_darkTheme,
                is_active: user_is_active,
            });
            //    console.log(chalk.black.bgCyan(JSON.stringify(newUser, null, 4)));
            res.status(200);
            res.json({
                is_error: false,
                message: "User Added Successfully !",
                data: newUser,
            });
        } catch (e) {
            console.log(chalk.bgRed("Error Creating User ! "));
            res.status(500);
            res.json({ is_error: true, message: "Error Creating User !" });
        }
    }
};

module.exports = addUser;
