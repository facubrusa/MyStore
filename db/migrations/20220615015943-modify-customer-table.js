'use strict';

const { CUSTOMER_TABLE } = require('../models/customer.model');
const { DataTypes } = require('sequelize');

module.exports = {
  async up (queryInterface) {
    // Run migration
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: true,
    });
  },

  async down (queryInterface) {
    // Rollback the last migration runned
    // await queryInterface.dropTable(CUSTOMER_TABLE);
  }
};
