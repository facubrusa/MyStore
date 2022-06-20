'use strict';

const { USER_TABLE, UserSchema } = require('../models/user.model');

module.exports = {
  async up (queryInterface) {
    // Run migration
    await queryInterface.createTable(USER_TABLE, UserSchema);
  },

  async down (queryInterface) {
    // Rollback the last migration runned
    await queryInterface.dropTable(USER_TABLE);
  }
};
