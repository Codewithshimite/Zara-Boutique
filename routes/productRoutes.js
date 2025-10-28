// productRoutes.js
const express = require('express');
const { getProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();

// Get all products
router.get('/', getProducts);

// Add a new product with image upload
router.post('/', (req, res, next) => {
  req.upload.single('image')(req, res, next);
}, addProduct);

// Update a product by ID with image upload
router.put('/:id', (req, res, next) => {
  req.upload.single('image')(req, res, next);
}, updateProduct);

// Delete a product by ID
router.delete('/:id', deleteProduct);

module.exports = router;
