const Joi = require("joi")
const Response = require("../services/Response");
const Helper = require("../services/Helper");

module.exports = {
    createProductValidation : (req ,res , cb) => {
        const Schema = Joi.object({
            title: Joi.string().required(),
            category: Joi.string().required(), // Assuming category is an ObjectId, validated as a string
            description: Joi.string().allow(null, ''), // Allows the description to be null or an empty string
            amount: Joi.number().required(),
            image: Joi.string().allow(null, '') // Allows the image to be a valid URI, null, or an empty string
        });

        const {error} = Schema.validate(req);
        if(error) {
            return Response.validationErrorResponseData(
                res,
                res.__(Helper.validationMessageKey('createProductValidation',error))
            )
        } 
        return cb(true);     
    },
    updateProductValidation : (req ,res , cb) => {
        const Schema = Joi.object({
            title: Joi.string().required(),
            category: Joi.string().required(), // Assuming category is an ObjectId, validated as a string
            description: Joi.string().allow(null, ''), // Allows the description to be null or an empty string
            amount: Joi.number().required(),
            image: Joi.string().allow(null, '') // Allows the image to be a valid URI, null, or an empty string
        });

        const {error} = Schema.validate(req);
        if(error) {
            return Response.validationErrorResponseData(
                res,
                res.__(Helper.validationMessageKey('updateProductValidation',error))
            )
        } 
        return cb(true);     
    },
}