const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerService {
    constructor() {}

    async find() {
        const response = await models.Customer.findAll({
            include: ['user'],
        });
        return response;
    }

    async findOne(id) {
        const customer = await models.Customer.findByPk(id, {
            include: ['user'],
        });
        if (!customer) {
            throw boom.notFound('customer not found');
        }
        return customer;
    }

    async create(data) {
        const newCustomer = await models.Customer.create(data, {
            include: ['user'],
        });
        return newCustomer;
    }

    async update(id, changes) {
        const customer = await this.findOne(id);
        const response = await customer.update(changes);
        return response;
    }

    async delete(id) {
        const customer = await this.findOne(id);
        await customer.destroy();
        return { id };
    }
}

module.exports = CustomerService;
