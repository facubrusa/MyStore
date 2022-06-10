const express = require('express');
const ProductsService = require('../services/products.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res, next) => {
    try {
        const { size } = req.query;
        const limit = size || 10;
        const products = await service.find(limit);
        res.status(200).json(products);
    } catch (error) {
        // Call the middleware (error handler)
        next(error);
    }
});

router.get('/:id',
    validatorHandler(getProductSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await service.findOne(id);
            res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createProductSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const response = await service.create(body);
            res.status(201).json({
                message: 'Product created',
                data: response
            });
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id',
validatorHandler(getProductSchema, 'params'), // Validate id
validatorHandler(updateProductSchema, 'body'), // Validate body
async (req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const response = await service.update(id, body);
        res.status(200).json({
            message: 'Product updated',
            data: response
        });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id',
    validatorHandler(getProductSchema, 'params'), // Validate id
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const response = await service.delete(id);
            res.status(200).json({
                message: 'Product deleted',
                data: response
            });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
