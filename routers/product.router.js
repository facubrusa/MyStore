const express = require('express');
const passport = require('passport');

const ProductsService = require('../services/products.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
    createProductSchema,
    updateProductSchema,
    getProductSchema,
    queryProductSchema
} = require('../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

router.get('/',
    validatorHandler(queryProductSchema, 'query'),
    async (req, res, next) => {
    try {
        const products = await service.find(req.query);
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
    passport.authenticate('jwt', { session: false }),
    validatorHandler(createProductSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const newProduct = await service.create(body);
            res.status(201).json({
                message: 'Product created',
                data: newProduct,
            });
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id',
    passport.authenticate('jwt', { session: false }),
    validatorHandler(getProductSchema, 'params'), // Validate id
    validatorHandler(updateProductSchema, 'body'), // Validate body
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const product = await service.update(id, body);
            res.status(201).json({
                message: 'Product updated',
                data: product,
            });
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    validatorHandler(getProductSchema, 'params'), // Validate id
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await service.delete(id);
            res.status(201).json({
                message: 'Product deleted',
                data: {
                    id
                },
            });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
