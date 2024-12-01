'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = function (sequelize) {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Transaction, {
        foreignKey: 'userId',
        as: 'transactions',
      });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      data_nasc: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
      logging: console.log,
    }
  );

  // Hook para logar tentativas de criação
  User.addHook('beforeCreate', (user, options) => {
    console.log('Attempting to create user:', user.email);
  });

  return User;
};