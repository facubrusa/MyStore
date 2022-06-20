const { UserSchema, User } = require('./user.model');
const { ProductSchema, Product } = require('./product.model');
const { CategorySchema, Category } = require('./category.model');
const { CustomerSchema, Customer } = require('./customer.model');
const { OrderSchema, Order } = require('./order.model');

function setupModels(sequelize) {
    User.init(UserSchema, User.config(sequelize));
    Product.init(ProductSchema, Product.config(sequelize));
    Category.init(CategorySchema, Category.config(sequelize));
    Customer.init(CustomerSchema, Customer.config(sequelize));
    Order.init(OrderSchema, Order.config(sequelize));

    User.assocciate(sequelize.models);
    Customer.assocciate(sequelize.models);
    Category.assocciate(sequelize.models);
    Product.assocciate(sequelize.models);
    Order.assocciate(sequelize.models);
}

module.exports = setupModels;
