const express = require('express');
const router = express.Router();
const userService = require('../Services/userService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const { checkAuthentication } = require('../middleware/authMiddleware');

// Rota de registro (mantida igual)
router.post('/register', async (req, res) => {
    try {
        const { email, password, data_nasc } = req.body;
        const newUser = await userService.create(email, password, data_nasc);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: error.errors.map(err => err.message) });
        }
        res.status(500).json({ error: 'Erro ao criar usuário.' });
    }
});

// Rota de login
router.post('/login', async (req, res) => {
    try {
        console.log('Tentativa de login:', req.body);
        const { email, password } = req.body;

        // Validação básica
        if (!email || !password) {
            return res.status(400).json({ 
                error: 'Email e senha são obrigatórios.' 
            });
        }

        // Buscar usuário pelo email
        const user = await userService.findByEmail(email);
        
        // Verificar se o usuário existe
        if (!user) {
            return res.status(401).json({ 
                error: 'Email ou senha inválidos.' 
            });
        }

        // Verificar a senha
        const validPassword = await bcrypt.compare(password, user.password);
        
        if (!validPassword) {
            return res.status(401).json({ 
                error: 'Email ou senha inválidos.' 
            });
        }

        // Gerar token JWT
        const token = jwt.sign(
            { 
                id: user.id,
                email: user.email 
            },
            process.env.JWT_SECRET || 'sua-chave-secreta',
            { expiresIn: '24h' }
        );

        // Retornar usuário e token (excluindo a senha)
        const userWithoutPassword = {
            id: user.id,
            email: user.email,
            data_nasc: user.data_nasc,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };

        res.json({
            user: userWithoutPassword,
            token
        });

    } catch (error) {
        console.error('Erro detalhado:', error);
        res.status(500).json({ error: 'Erro ao realizar login.' });
    }
});

// Rota de validação de token
router.get('/validate', checkAuthentication, async (req, res) => {
    try {
        const user = await userService.findById(req.userId);
        if (!user) {
            return res.status(404).json({ valid: false });
        }
        
        const userWithoutPassword = {
            id: user.id,
            email: user.email,
            data_nasc: user.data_nasc,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
        
        res.json({ valid: true, user: userWithoutPassword });
    } catch (error) {
        res.status(500).json({ valid: false, error: 'Erro ao validar token.' });
    }
});

module.exports = router;