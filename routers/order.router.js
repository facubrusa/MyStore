const express = require('express');
const passport = require('passport');

const OrdersService = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
    getOrderSchema,
    createOrderSchema,
    updateOrderSchema,
    addItemSchema,
} = require('../schemas/order.schema');

const router = express.Router();
const service = new OrdersService();

router.get('/', async (req, res, next) => {
    try {
        const orders = await service.find();
        res.status(200).json(orders);
    } catch (error) {
        // Call the middleware (error handler)
        next(error);
    }
});

router.get('/:id',
    validatorHandler(getOrderSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const order = await service.findOne(id);
            res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    passport.authenticate('jwt', { session: false }),
    validatorHandler(createOrderSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const newOrder = await service.create(body);
            res.status(201).json({
                message: 'Order created',
                data: newOrder,
            });
        } catch (error) {
            next(error);
        }
    }
);

router.post('/add-item',
    passport.authenticate('jwt', { session: false }),
    validatorHandler(addItemSchema, 'query'),
    async (req, res, next) => {
        try {
            const body = req.query;
            const newItem = await service.addItem(body);
            res.status(201).json({
                message: 'Item added',
                data: newItem,
            });
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id',
    passport.authenticate('jwt', { session: false }),
    validatorHandler(getOrderSchema, 'params'), // Validate id
    validatorHandler(updateOrderSchema, 'body'), // Validate body
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const order = await service.update(id, body);
            res.status(201).json({
                message: 'Order updated',
                data: order,
            });
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    validatorHandler(getOrderSchema, 'params'), // Validate id
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await service.delete(id);
            res.status(201).json({
                message: 'Order deleted',
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
