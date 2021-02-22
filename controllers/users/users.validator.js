const Joi = require("joi");

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

module.exports = profileValidation;
