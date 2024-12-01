const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');
const { checkAuthentication } = require('../middleware/authMiddleware');

router.post('/',checkAuthentication,  CartController.addToCart);
router.get('/',checkAuthentication,  CartController.getCart);
router.delete('/:id',checkAuthentication,  CartController.removeFromCart);
router.patch('/:id', checkAuthentication, CartController.updateQuantity);

module.exports = router;