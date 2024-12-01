const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Fornecedores = sequelize.define('Fornecedores', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false, // Nome do fornecedor é obrigatório
        },
        cnpj: {
            type: DataTypes.STRING,
            allowNull: false, // CNPJ é obrigatório
            unique: true, // CNPJ deve ser único
            validate: {
                len: [14, 14], // Valida o tamanho do CNPJ
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true, // Valida o formato do email
            },
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: true, // Telefone é opcional
        },
        endereco: {
            type: DataTypes.TEXT,
            allowNull: true, // Endereço é opcional
        },
    }, 
    {
        tableName: 'fornecedores',
        timestamps: false, // Não adiciona campos createdAt e updatedAt
    });

    return Fornecedores;
};