const { Model, DataTypes } = require('sequelize');
const { USER_TABLE } = require('./user.model');

const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'last_name',
    },
    phone: {
        allowNull: true,
        type: DataTypes.STRING,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: DataTypes.NOW,
    },
    userId: {
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: true,
        references: {
            model: USER_TABLE,
            key: 'id'
        },
        // What do when update or delete the user
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
}

class Customer extends Model {
    // Static because we don't need create a instance if we call the function

    static assocciate(models) {
        // This class has a relation with ..
        this.belongsTo(models.User, { as: 'user'});
        this.hasMany(models.Order, {
            as: 'orders',
            foreignKey: 'customerId'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: CUSTOMER_TABLE,
            modelName: 'Customer',
            timestamps: false
        }
    }
}

module.exports = { CUSTOMER_TABLE, CustomerSchema, Customer };
