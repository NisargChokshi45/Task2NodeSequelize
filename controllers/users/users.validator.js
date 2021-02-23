const Joi = require("joi");
const errorFunction = require("../../util/errorFunction");

const profileValidation = Joi.object({
    firstName: Joi.string()
        .min(3)
        .max(50)
        .regex(/^[a-zA-Z ]*$/)
        .required(),
    lastName: Joi.string()
        .min(3)
        .max(50)
        .regex(/^[a-zA-Z ]*$/)
        .required(),
    email: Joi.string()
        .email()
        .regex(/^[a-zA-Z0-9._]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
        .required(),
    mobileNumber: Joi.number().min(6130000000).max(9999999999).required(),
    country: Joi.string().default("India"),
    darkTheme: Joi.boolean().default(false),
    is_active: Joi.boolean().default(true),
});

const userValidation = (req, res, next) => {
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
        return res.json(errorFunction(true, error.details[0].message));
    } else {
        next();
    }
};

module.exports = userValidation;
