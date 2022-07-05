const productRouter = require('./product.router');
const userRouter = require('./user.router');
const categoryRouter = require('./category.router');
const customerRouter = require('./customer.router');
const orderRouter = require('./order.router');
const authRouter = require('./auth.router');
const profileRouter = require('./profile.router');

const express = require('express');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/products', productRouter);
    router.use('/users', userRouter);
    router.use('/categories', categoryRouter);
    router.use('/customers', customerRouter);
    router.use('/orders', orderRouter);
    router.use('/auth', authRouter);
    router.use('/profile', profileRouter);
}

module.exports = routerApi;
