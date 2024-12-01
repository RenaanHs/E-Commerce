const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();  // Carrega as variáveis de ambiente do arquivo .env

const secret = process.env.JWT_SECRET;  // Obtém a chave secreta do arquivo .env

// Gera um token JWT
function generateToken(user) {
    const payload = { id: user.id, email: user.email }; // Dados que serão armazenados no token
    return jwt.sign(payload, secret, { expiresIn: '1h' }); // Token expira em 1 hora
}

// Verifica se o token fornecido é válido
function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return reject(err);  // Se ocorrer erro, rejeita a Promise
            }
            resolve(decoded);  // Se o token for válido, resolve com os dados decodificados
        });
    });
}

// Middleware para verificar a autenticação do token
async function checkAuthentication(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token não informado ou mal formatado' });
    }

    const token = authHeader.split(' ')[1]; // Extrai o token após 'Bearer '

    try {
        const decoded = await verifyToken(token); // Decodifica o token e verifica sua validade
        req.userId = decoded.id; // Armazena o ID do usuário no objeto `req`
        next(); // Passa o controle para o próximo middleware ou rota
    } catch (err) {
        console.error("Erro ao verificar token:", err.message);
        return res.status(401).json({ message: 'Token inválido', error: err.message });
    }
}

// Função para comparar a senha fornecida com a armazenada (geralmente no banco de dados)
function comparePasswords(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = { generateToken, checkAuthentication, comparePasswords }; // Exporta as funções
