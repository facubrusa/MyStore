'use strict';

const { PRODUCT_TABLE, ProductSchema } = require('../models/product.model');

module.exports = {
    async up (queryInterface) {
        await queryInterface.addColumn(PRODUCT_TABLE, 'category_id', ProductSchema.categoryId);
    },
    async down (queryInterface) {
        await queryInterface.removeColumn(PRODUCT_TABLE, 'category_id');
    }
};
