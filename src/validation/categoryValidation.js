const Joi = require("joi")
const Response = require("../services/Response");
const Helper = require("../services/Helper");

module.exports = {
    createCategoryValidation : (req ,res , cb) => {
        const Schema = Joi.object({
            name: Joi.string().required(),
        });

        const {error} = Schema.validate(req);
        if(error) {
            return Response.validationErrorResponseData(
                res,
                res.__(Helper.validationMessageKey('createCategoryValidation',error))
            )
        } 
        return cb(true);     
    }
}