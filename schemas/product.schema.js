const Joi = require('joi');

// Declare all the restrictions for each param
const id = Joi.number().integer();
const name = Joi.string().min(3).max(20);
const description = Joi.string().min(3).max(20);
const price = Joi.number().integer().min(0);
const image = Joi.string().uri();
const categoryId = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const min_price = Joi.number().integer();

const createProductSchema = Joi.object({
    name: name.required(),
    price: price.required(),
    image: image.required(),
    description: description.required(),
    categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
    name: name,
    price: price,
    image: image,
    description: description,
    categoryId: categoryId
});

const getProductSchema = Joi.object({
    id: id.required(),
});

const queryProductSchema = Joi.object({
    limit,
    offset,
    price,
    min_price,
    max_price: Joi.alternatives().conditional('min_price', {
        is: Joi.number().integer(),
        then: Joi.required(),
    }),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema };
