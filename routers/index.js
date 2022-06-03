const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const express = require('express');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/products', productsRouter);
    router.use('/categories', categoriesRouter);
}

module.exports = routerApi;
