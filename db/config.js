const Sequelize = require('sequelize');

const sequelize = new Sequelize('projeto', 'usu', 'truco', {
    host: 'localhost',
    dialect: 'mysql', 
    logging: false
});

module.exports = sequelize;