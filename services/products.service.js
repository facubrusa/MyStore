const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');

class ProductsService {
    constructor() {}

    async create(data) {
        const response = await models.Product.create(data);
        return response;
    }

    async find(query) {
        const options = {
            include: ['category'],
            where: {}
        };
        const { limit, offset, price, min_price, max_price } = query;
        if (limit && offset) {
            options.limit = limit;
            options.offset = offset;
        }

        if (price) {
            options.where.price = price;
        }

        if (min_price && max_price) {
            options.where.price = {
                [Op.gte]: min_price,
                [Op.lte]: max_price
            };
        }
        const response = await models.Product.findAll(options);
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
