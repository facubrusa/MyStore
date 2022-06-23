const { Model, DataTypes } = require('sequelize');
const { CUSTOMER_TABLE } = require('./customer.model');

const ORDER_TABLE = 'orders';

const OrderSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    customerId: {
        field: 'customer_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: CUSTOMER_TABLE,
            key: 'id'
        },
        // What do when update or delete the user
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: DataTypes.NOW,
    },
    // Virtual column that return the total of the order
    // Commented because heroku don't support this type
    /* total: {
        type: DataTypes.VIRTUAL,
        get() {
            if(this.items.length > 0) {
                return this.items.reduce((total, item) => {
                    return total + (item.price * item.OrderProduct.quantity)
                }, 0);
            }
            return 0;
        },
    }, */
}

class Order extends Model {
    // Static because we don't need create a instance if we call the function
    static assocciate(models) {
        // This class has a relation with ..
        // A order has a relation with just one customer
        this.belongsTo(models.Customer, { as: 'customer'});
        // This model (Order) will have a relation with many product
        // and it will be resolved with a ternary table
        this.belongsToMany(models.Product, { // what is the item that will be repeated
            as: 'items',
            through: models.OrderProduct, // Which table resolve the relation
            foreignKey: 'orderId', // Specify foreign key that belongs to THIS model
            otherKey: 'productId' // Specify the other foreign key
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ORDER_TABLE,
            modelName: 'Order',
            timestamps: false
        }
    }
}

module.exports = { ORDER_TABLE, OrderSchema, Order };
