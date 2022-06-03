const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsService {

    constructor() {
        this.products = [];
        this.generate();
    }

    generate(size) {
        const limit = size || 10;
        for (let index = 0; index < limit; index++) {
            this.products.push({
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price(), 10),
                image: faker.image.imageUrl(),
            });
        }
    }

    async create(body) {
        const name = Object.prototype.hasOwnProperty.call(body, 'name');
        const price = Object.prototype.hasOwnProperty.call(body, 'price');
        const image = Object.prototype.hasOwnProperty.call(body, 'image');
        if(!name || !price || !image) return false;
        body.id = faker.datatype.uuid();
        this.products.push(body);
        return body;
    }

    async find() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.products);
            }, 2000);
        });
    }

    async findOne(id) {
        const index = this.products.findIndex(item => item.id === id);
        if(index === -1) throw boom.notFound('Product not found');
        return this.products[index];
    }

    async update(id, changes) {
        const index = this.products.findIndex(item => item.id === id);
        if(index === -1) throw boom.notFound('Product not found');

        const product = this.products[index];
        this.products[index] = {
            ...product,
            ...changes
        }
        return this.products[index];
    }

    async delete(id) {
        const index = this.products.findIndex(item => item.id === id);
        if(index === -1) throw boom.notFound('Product not found');

        this.products.splice(index, 1);
        return id;
    }
}

module.exports = ProductsService;
