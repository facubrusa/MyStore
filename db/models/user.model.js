const { Model, DataTypes } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    recoveryToken: {
        field: 'recovery_token',
        allowNull: true,
        type: DataTypes.STRING,
    },
    role: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'customer',
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: DataTypes.NOW,
    },
}

class User extends Model {
    // Static because we don't need create a instance if we call the function
    static assocciate(models) {
        this.hasOne(models.Customer, {
            as: 'customer',
            foreignKey: 'userId'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false,
            defaultScope: {
                attributes: {
                  exclude: ['password'], // Don't return the password for any query associative
                }
            },
        }
    }
}

module.exports = { USER_TABLE, UserSchema, User };
