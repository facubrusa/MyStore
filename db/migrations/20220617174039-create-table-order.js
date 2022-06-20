'use strict';

const { ORDER_TABLE, OrderSchema } = require('../models/order.model');

module.exports = {
  async up (queryInterface) {
    // Run migration
    await queryInterface.createTable(ORDER_TABLE, OrderSchema);
  },

  async down (queryInterface) {
    // Rollback the last migration runned
    await queryInterface.dropTable(ORDER_TABLE);
  }
};
