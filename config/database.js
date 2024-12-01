const { Sequelize } = require('sequelize');

// Configure a conexão com seu banco de dados
const sequelize = new Sequelize('projeto', 'usu', 'truco', {
    host: 'localhost',
    dialect: 'mysql' // ou o banco de dados que você está usando
});

// Testa a conexão
sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    })
    .catch(err => {
        console.error('Erro ao conectar ao banco de dados:', err);
    });

// Importa o modelo
const ProductModel = require('../models/Product')(sequelize);

// Exporta a instância do Sequelize e o modelo
module.exports = {
    sequelize,
    Product: ProductModel
};
