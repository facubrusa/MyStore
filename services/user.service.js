const boom = require('@hapi/boom');
const { models } = require('../libs/sequealize');

class UserService {
  constructor() {}

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    const users = await models.User.findAll();
    return users;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    /* if(!user) {
        throw boom.notFound('User not found');
    } */
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const response = user.update(changes);
    return response;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy(id);
    return { id };
  }
}

module.exports = UserService;
