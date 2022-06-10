const { Model, DataTypes } = require('sequelize');

const USER_TABLE = 'categories';

const CategorySchema = {
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
    image: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: DataTypes.NOW,
    },
}

class Category extends Model {
    // Static because we don't need create a instance if we call the function
    static assocciate() {
        // models
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'Category',
            timestamps: false
        }
    }
}

module.exports = { USER_TABLE, CategorySchema, Category };
