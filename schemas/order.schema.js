const Joi = require('joi');

// Declare all the restrictions for each param
const id = Joi.number().integer();
const customerId = Joi.number().integer();

const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const quantity = Joi.number().integer().min(1);

const getOrderSchema = Joi.object({
    id: id.required(),
});

const createOrderSchema = Joi.object({
    customerId: customerId.required(),
});

const updateOrderSchema = Joi.object({
    customerId,
});

const addItemSchema = Joi.object({
    orderId: orderId.required(),
    productId: productId.required(),
    quantity: quantity.required(),
});

module.exports = { getOrderSchema, createOrderSchema, updateOrderSchema, addItemSchema };
