const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class ProductsService {
    constructor() {}

    async create(data) {
        const response = await models.Product.create(data);
        return response;
    }

    async find() {
        const response = await models.Product.findAll({
            include: ['category']
        });
        return response;
    }

    async findOne(id) {
        const product = await models.Product.findByPk(id);
        if (!product) {
            throw boom.notFound('Product not found');
        }
        return product;
    }

    async update(id, changes) {
        const product = await this.findOne(id);
        const response = await product.update(changes);
        return response;
    }

    async delete(id) {
        const product = await this.findOne(id);
        await product.destroy();
        return { id };
    }
}

module.exports = ProductsService;
