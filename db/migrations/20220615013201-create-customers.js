'use strict';

const { CUSTOMER_TABLE, CustomerSchema } = require('../models/customer.model');

module.exports = {
  async up (queryInterface) {
    // Run migration
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
  },

  async down (queryInterface) {
    // Rollback the last migration runned
    await queryInterface.dropTable(CUSTOMER_TABLE);
  }
};
