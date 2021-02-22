const chalk = require("chalk");
// const User = require("../../models/user");
const User = require("./../../models/user");
const profileValidation = require("./users.validator");

const addUser = async (req, res) => {
    console.log(chalk.inverse("/api/adduser called !"));

    const incomingData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobileNumber: req.body.mobileNumber,
        country: req.body.country,
        darkTheme: req.body.darkTheme,
        is_active: req.body.is_active,
    };

    const { error } = profileValidation.validate(incomingData);

    if (error) {
        res.status(400);
        return res.json({ is_error: true, message: error.details[0].message });
    }
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
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                mobileNumber: req.body.mobileNumber,
                country: req.body.country,
                darkTheme: req.body.darkTheme,
                is_active: req.body.is_active,
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

const deleteUser = async (req, res) => {
    console.log(chalk.inverse("/api/deleteuser called !"));
    if (req.params.id === undefined) {
        res.status(400);
        res.json({ is_error: true, message: "UserID not Valid ! " });
    } else {
        const user_id = req.params.id;
        try {
            const deletedUser = await User.destroy({ where: { id: user_id } });
            if (deletedUser === 0) {
                res.status(401);
                return res.json({
                    is_error: true,
                    message: "User Does not exists !",
                });
            } else {
                res.status(200);
                res.json({
                    is_error: false,
                    message: "User Deleted Successfully !",
                    data: deletedUser,
                });
            }
        } catch (e) {
            console.log(chalk.bgRed("Error Deleting User ! "));
            res.status(500);
            res.json({ is_error: true, message: "Error Deleting User !" });
        }
    }
};

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

const getUser = async (req, res) => {
    const user_id = req.params.id;
    console.log(chalk.inverse("/api/users called !"));
    try {
        const fetchedUser = await User.findOne({
            where: { id: user_id, is_active: true },
        });
        // console.log(chalk.inverse(JSON.stringify(fetchedUser, null, 4)));
        if (fetchedUser === null || fetchedUser === undefined) {
            res.status(401);
            return res.json({
                is_error: false,
                message: "User Does not Exists !",
            });
        } else {
            res.status(200);
            res.json({
                is_error: false,
                message: "Fetched User Successfully ! ",
                data: fetchedUser,
            });
        }
    } catch (e) {
        console.log(chalk.bgRed("Error Getting the user ! "));
        console.log(chalk.bgRed("Error : ", e));
        res.status(500);
        res.json({ is_error: true, message: "Error getting the user ! " });
    }
};

const updateUser = async (req, res) => {
    console.log(chalk.inverse("/api/updateuser called !"));

    const incomingData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobileNumber: req.body.mobileNumber,
        country: req.body.country,
        darkTheme: req.body.darkTheme,
        is_active: req.body.is_active,
    };

    const { error } = profileValidation.validate(incomingData);

    if (error) {
        res.status(400);
        res.json({ is_error: true, message: erorr });
    }
    if (req.params.id === undefined) {
        res.status(400);
        res.json({ is_error: true, message: "UserID not Valid ! " });
    } else {
        const user_id = req.params.id;
        const result = await User.findByPk(user_id);
        if (result !== null) {
            try {
                const updatedUser = await User.update(
                    {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        mobileNumber: req.body.mobileNumber,
                        country: req.body.country,
                        darkTheme: req.body.darkTheme,
                        is_active: req.body.is_active,
                    },
                    { where: { id: user_id } }
                );
                //  console.log(chalk.black.bgCyan(JSON.stringify(updatedUser, null, 4)));
                res.status(200);
                res.json({
                    is_error: false,
                    message: "User Updated Successfully !",
                    data: updatedUser,
                });
            } catch (e) {
                console.log(chalk.bgRed("Error Updating User ! "));
                res.status(500);
                res.json({ is_error: true, message: "Error Updating User !" });
            }
        } else {
            res.status(401);
            return res.json({
                is_error: true,
                message: "User Does not exists !",
            });
        }
    }
};

module.exports = {
    addUser: addUser,
    deleteUser: deleteUser,
    getAllUsers: getAllUsers,
    getUser: getUser,
    updateUser: updateUser,
};
