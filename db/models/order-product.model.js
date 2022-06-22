const { Model, DataTypes } = require('sequelize');
const { ORDER_TABLE } = require('./order.model');
const { PRODUCT_TABLE } = require('./product.model');

const ORDER_PRODUCT_TABLE = 'orders_products';

const OrderProductSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    quantity: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    orderId: {
        allowNull: false,
        field: 'order_id',
        type: DataTypes.INTEGER,
        references: {
            model: ORDER_TABLE,
            key: 'id'
        },
        // What do when update or delete the user
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    productId: {
        allowNull: false,
        field: 'product_id',
        type: DataTypes.INTEGER,
        references: {
            model: PRODUCT_TABLE,
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
}

class OrderProduct extends Model {
    // Static because we don't need create a instance if we call the function
    static assocciate() {
        //
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ORDER_PRODUCT_TABLE,
            modelName: 'OrderProduct',
            timestamps: false
        }
    }
}

module.exports = { ORDER_PRODUCT_TABLE, OrderProductSchema, OrderProduct };
