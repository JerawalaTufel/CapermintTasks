const Joi = require("joi")
const Response = require("../services/Response");
const Helper = require("../services/Helper");

module.exports = {
    registerValidation : (req ,res , cb) => {
        const registerSchema = Joi.object({
            name : Joi.string().required(),
            email : Joi.string().email().required(),
            password : Joi.string()
            .min(8) // Minimum length of 8 characters
            .max(30) // Maximum length of 30 characters
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/) // Requires at least one lowercase letter, one uppercase letter, and one digit
            .required(),
            phone: Joi.string()
            .pattern(/^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/)
            .required()
        });

        const {error} = registerSchema.validate(req);
        if(error) {
            return Response.validationErrorResponseData(
                res,
                res.__(Helper.validationMessageKey('registerValidation',error))
            )
        } 
        return cb(true);     
    },
    loginValidation : (req ,res , cb) => {
        const loginSchema = Joi.object({
             email : Joi.string().email().required(),
            password : Joi.string()
            .min(8) // Minimum length of 8 characters
            .max(30) // Maximum length of 30 characters
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/) // Requires at least one lowercase letter, one uppercase letter, and one digit
            .required()
        });

        const {error} = loginSchema.validate(req);
        if(error) {
            return Response.validationErrorResponseData(
                res,
                res.__(Helper.validationMessageKey('loginValidation',error))
            )
        } 
        return cb(true);
    },
}