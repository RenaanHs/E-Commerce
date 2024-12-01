// routes/fornecedores.js
const express = require('express');
const router = express.Router();
const FornecedoresService = require('../services/FornecedoresService');
const FornecedoresController = require('../controllers/FornecedoresController');
const db = require('../models');
const { checkAuthentication } = require('../middleware/authMiddleware');

// Instancia os serviços e controladores
const fornecedoresService = new FornecedoresService(db.Fornecedores);
const fornecedoresController = new FornecedoresController(fornecedoresService);

// Criar fornecedor - Somente usuários autenticados
router.post('/', checkAuthentication, (req, res) => {
    return fornecedoresController.createFornecedor(req, res);
});

// Listar fornecedores - Somente usuários autenticados agora
router.get('/', checkAuthentication, (req, res) => {
    return fornecedoresController.listFornecedores(req, res);
});

// Atualizar fornecedor - Somente usuários autenticados
router.put('/:id', checkAuthentication, (req, res) => {
    return fornecedoresController.updateFornecedor(req, res);
});

// Deletar fornecedor - Somente usuários autenticados
router.delete('/:id', checkAuthentication, (req, res) => {
    return fornecedoresController.deleteFornecedor(req, res);
});

module.exports = router;