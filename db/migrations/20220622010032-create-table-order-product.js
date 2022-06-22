'use strict';

const { ORDER_PRODUCT_TABLE, OrderProductSchema } = require('../models/order-product.model');

module.exports = {
  async up (queryInterface) {
    // Run migration
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);
  },

  async down (queryInterface) {
    // Rollback the last migration runned
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
  }
};
