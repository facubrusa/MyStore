const Joi = require('joi');

// Declare all the restrictions for each param
const id = Joi.number().integer();
const customerId = Joi.number().integer();

const getOrderSchema = Joi.object({
    id: id.required(),
});

const createOrderSchema = Joi.object({
    customerId: customerId.required(),
});

const updateOrderSchema = Joi.object({
    customerId,
});

module.exports = { getOrderSchema, createOrderSchema, updateOrderSchema };
