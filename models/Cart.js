// models/cart.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/config');
const Product = require('./product');

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        }
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'cart',
    timestamps: false
});

// Optional: Add association method
Cart.associate = (models) => {
    Cart.belongsTo(Product, {
        foreignKey: 'productId'
    });
};

module.exports = Cart;