'use strict';
const { Model } = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }

  Transaction.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    valorTotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    metodoPagamento: {
      type: DataTypes.ENUM('CREDIT_CARD', 'PIX'),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED'),
      allowNull: false,
      defaultValue: 'PENDING'
    },
    pixCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    paymentDetails: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Transaction',
    tableName: 'transactions',
    timestamps: true
  });

  return Transaction;
};