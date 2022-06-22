const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class OrdersService {
    constructor() {}

    async create(data) {
        const response = await models.Order.create(data);
        return response;
    }

    async addItem(data) {
        const response = await models.OrderProduct.create(data);
        return response;
    }

    async find() {
        const response = await models.Order.findAll();
        return response;
    }

    async findOne(id) {
        const order = await models.Order.findByPk(id, {
            include: [
                {
                    association: 'customer',
                    include: ['user'],
                },
                'items',
            ],
        });
        if (!order) {
            throw boom.notFound('Order not found');
        }
        return order;
    }

    async update(id, changes) {
        const order = await this.findOne(id);
        const response = await order.update(changes);
        return response;
    }

    async delete(id) {
        const order = await this.findOne(id);
        await order.destroy();
        return { id };
    }
}

module.exports = OrdersService;
