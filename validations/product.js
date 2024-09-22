const Joi = require("joi");

module.exports = {
    createProduct: Joi.object({
        name: Joi.string()
            .required()
            .messages({
                'string.empty': 'Name is required',
                'any.required': 'Name is required',
            }),

        description: Joi.string()
            .allow(null)
            .optional(),

        price: Joi.number()
            .greater(0)
            .required()
            .messages({
                'number.base': 'Price must be a number',
                'number.greater': 'Price must be greater than 0',
                'any.required': 'Price is required',
            }),
        hsn_code: Joi.string()
            .required()
            .messages({

                'string.empty': 'HSN code is required',
                'any.required': 'HSN code is required',
            })
    })

};
