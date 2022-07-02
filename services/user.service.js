const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newData = {
        ...data,
        password: hash
    };
    const newUser = await models.User.create(newData);
    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    const response = await models.User.findAll({
        include: ['customer'],
    });
    return response;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async findByEmail(email) {
    const user = await models.User.findOne({
        where: { email },
        attributes: ['id', 'email', 'password', 'role', 'created_at'],
    });
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const response = await user.update(changes);
    return response;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
