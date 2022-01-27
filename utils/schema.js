const Joi = require('joi');

exports.updateTodoSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().required()
})