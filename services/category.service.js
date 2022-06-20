const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CategoryService {

    constructor() {}

    async create(data) {
        const response = await models.Category.create(data);
        return response;
    }

    async find() {
        const response = await models.Category.findAll();
        return response;
    }

    async findOne(id) {
        const category = await models.Category.findByPk(id, {
            include: ['products']
        });
        if (!category) {
            throw boom.notFound('Category not found');
        }
        return category;
    }

    async update(id, changes) {
        const category = await this.findOne(id);
        const response = await category.update(changes);
        return response;
    }

    async delete(id) {
        const category = await this.findOne(id);
        await category.destroy();
        return { id };
    }

}

module.exports = CategoryService;
