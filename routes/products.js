const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { checkAuthentication } = require('../middleware/authMiddleware');


router.post('/',checkAuthentication, ProductController.createProduct);
router.get('/', checkAuthentication,ProductController.getAllProducts);
router.put('/:id',checkAuthentication,ProductController.updateProduct);
router.delete('/:id',checkAuthentication, ProductController.deleteProduct);

module.exports = router;
