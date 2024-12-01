const express = require('express');
const cors = require('cors');
const sequelize = require('./db/config');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const paymentRoutes = require('./routes/payment');
const userRoutes = require('./routes/users')
const FornecedoresRouter = require('./routes/Fornecedores');


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3001' })); // Substitua pela porta do React


// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log('Body:', req.body);
    next();
});

// Rotas
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/fornecedores', FornecedoresRouter);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Erro interno do servidor'
    });
});

// Inicialização
const PORT = process.env.PORT || 3000;

sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
        return sequelize.sync({ alter: true });
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Erro ao iniciar o servidor:', err);
    });

module.exports = app;