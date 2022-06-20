'use strict';

const { PRODUCT_TABLE } = require('../models/product.model');
const { DataTypes } = require('sequelize');

module.exports = {
  async up (queryInterface) {
    // Run migration
    await queryInterface.changeColumn(PRODUCT_TABLE, 'category_id', {
        field: 'category_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false
    });
  },

  async down (queryInterface) {
    // Rollback the last migration runned
    // await queryInterface.dropTable(PRODUCT_TABLE);
  }
};
