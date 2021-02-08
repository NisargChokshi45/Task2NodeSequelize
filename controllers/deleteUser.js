const chalk = require("chalk");
const User = require("../models/user");

const deleteUser = async (req, res) => {
    console.log(chalk.inverse("/api/deleteuser called !"));
    if (req.params.id === undefined) {
        res.status(400);
        res.json({ is_error: true, message: "UserID not Valid ! " });
    } else {
        const user_id = req.params.id;
        try {
            const deletedUser = await User.destroy({ where: { id: user_id } });
            res.status(200);
            res.json({
                is_error: false,
                message: "User Deleted Successfully !",
                data: deletedUser,
            });
        } catch (e) {
            console.log(chalk.bgRed("Error Deleting User ! "));
            res.status(500);
            res.json({ is_error: true, message: "Error Deleting User !" });
        }
    }
};

module.exports = deleteUser;
