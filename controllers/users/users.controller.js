const chalk = require("chalk");
const errorFunction = require("../../util/errorFunction");
const User = require("./../../models/user");

const addUser = async (req, res) => {
    try {
        console.log(chalk.inverse("/api/adduser called !"));
        if (req.body.id !== undefined) {
            const user_id = req.body.id;
            try {
                const result = await User.findByPk(user_id);
                if (result) {
                    res.status(400);
                    res.json(errorFunction(true, "User Already Exists"));
                }
            } catch (e) {
                console.log(chalk.bgRed("Error Finding the User by ID !"));
                res.status(500);
                res.json(errorFunction(true, "Error Finding the User by ID"));
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
                res.json(
                    errorFunction(false, "User Added Successfully", newUser)
                );
            } catch (e) {
                console.log(chalk.bgRed("Error Creating User ! "));
                res.status(500);
                res.json(errorFunction(true, "Error Creating User"));
            }
        }
    } catch (e) {
        console.log(chalk.bgRed("Error : ", e));
    }
};

const deleteUser = async (req, res) => {
    try {
        console.log(chalk.inverse("/api/deleteuser called !"));
        if (req.params.id === undefined) {
            res.status(400);
            res.json(errorFunction(true, "UserID not valid"));
        } else {
            const user_id = req.params.id;
            try {
                const deletedUser = await User.destroy({
                    where: { id: user_id },
                });
                if (deletedUser === 0) {
                    res.status(401);
                    return res.json(
                        errorFunction(true, "User Does not Exists")
                    );
                } else {
                    res.status(200);
                    res.json(
                        errorFunction(
                            false,
                            "User Deleted Successfully",
                            deletedUser
                        )
                    );
                }
            } catch (e) {
                console.log(chalk.bgRed("Error Deleting User ! "));
                res.status(500);
                res.json(errorFunction(true, "Error Deleting User"));
            }
        }
    } catch (e) {
        console.log("Error : ", e);
    }
};

const getAllUsers = async (req, res) => {
    try {
        console.log(chalk.inverse("/api/allusers called !"));
        try {
            const fetchedUsers = await User.findAll({
                where: { is_active: true },
            });
            // console.log(chalk.inverse(JSON.stringify(fetchedUsers, null, 4)));
            res.status(200);
            res.json(
                errorFunction(false, "Fetched Users Successfully", fetchedUsers)
            );
        } catch (e) {
            console.log(chalk.bgRed("Error Getting users ! "));
            console.log(chalk.bgRed("Error : ", e));
            res.status(500);
            res.json(errorFunction(true, "Error Getting user"));
        }
    } catch (e) {
        console.log("Error :", e);
    }
};

const getUser = async (req, res) => {
    try {
        const user_id = req.params.id;
        console.log(chalk.inverse("/api/users called !"));
        try {
            const fetchedUser = await User.findOne({
                where: { id: user_id, is_active: true },
            });
            // console.log(chalk.inverse(JSON.stringify(fetchedUser, null, 4)));
            if (fetchedUser === null || fetchedUser === undefined) {
                res.status(401);
                return res.json(errorFunction(true, "User Does not Exists"));
            } else {
                res.status(200);
                res.json(
                    errorFunction(
                        false,
                        "Fetched User Successfully",
                        fetchedUser
                    )
                );
            }
        } catch (e) {
            console.log(chalk.bgRed("Error Getting the user ! "));
            console.log(chalk.bgRed("Error : ", e));
            res.status(500);
            res.json(errorFunction(true, "Error getting the User"));
        }
    } catch (e) {
        console.log("Error :", e);
    }
};

const updateUser = async (req, res) => {
    try {
        console.log(chalk.inverse("/api/updateuser called !"));
        if (req.params.id === undefined) {
            res.status(400);
            res.json(errorFunction(true, "UserID not Valid ! "));
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
                    res.json(
                        errorFunction(
                            false,
                            "User Updated Successfully",
                            updatedUser
                        )
                    );
                } catch (e) {
                    console.log(chalk.bgRed("Error Updating User ! "));
                    res.status(500);
                    res.json(errorFunction(true, "Error Updating User"));
                }
            } else {
                res.status(401);
                return res.json(errorFunction(true, "User Does not exists"));
            }
        }
    } catch (e) {
        console.log("Error : ", e);
    }
};

module.exports = {
    addUser: addUser,
    deleteUser: deleteUser,
    getAllUsers: getAllUsers,
    getUser: getUser,
    updateUser: updateUser,
};
