const express = require('express');
const router = express.Router();
const { adminRegister, adminLogin, getUserCart, updateUserCart } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/admin/register', adminRegister);
router.post('/admin/login', adminLogin);

// Cart routes
router.get('/cart', verifyToken, getUserCart);
router.post('/cart', verifyToken, updateUserCart);

module.exports = router;
