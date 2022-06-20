const express = require('express');
const OrdersService = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
    getOrderSchema,
    createOrderSchema,
    updateOrderSchema,
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

router.patch('/:id',
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
