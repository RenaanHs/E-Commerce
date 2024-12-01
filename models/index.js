const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'mysql://usu:truco@localhost:3306/projeto');

const db = {};

// Importa os modelos
db.User = require('./user')(sequelize, DataTypes);
db.Transaction = require('./transaction')(sequelize, DataTypes);
db.Product = require('./product');
db.Cart = require('./Cart');
db.Fornecedores = require('./Fornecedores')(sequelize, DataTypes); 


// Define associações somente após os modelos serem definidos
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// Adiciona as instâncias ao objeto `db`
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;