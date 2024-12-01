const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/paymentController');
const PaymentService = require('../Services/PaymentService');
const { checkAuthentication } = require('../middleware/authMiddleware');

const { Transaction, Cart, Product } = require('../models');

const paymentService = new PaymentService(Transaction, Cart, Product);
const paymentController = new PaymentController(paymentService);

router.post('/card',checkAuthentication, paymentController.processCardPayment.bind(paymentController));
router.post('/pix',checkAuthentication, paymentController.processPixPayment.bind(paymentController));
router.get('/status/:id',checkAuthentication, paymentController.getTransactionStatus.bind(paymentController));

module.exports = router;