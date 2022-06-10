const productRouter = require('./product.router');
const userRouter = require('./user.router');
const categoryRouter = require('./category.router');
const express = require('express');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/products', productRouter);
    router.use('/users', userRouter);
    router.use('/categories', categoryRouter);
}

module.exports = routerApi;
