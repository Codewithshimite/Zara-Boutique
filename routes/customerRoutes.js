// routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const { customerRegister, customerLogin } = require('../controllers/customerController');
const { getProfile, updateProfile } = require('../controllers/customerProfileController');
const { verifyToken } = require('../middleware/authMiddleware');


// Customer Authentication Routes
router.post('/register', customerRegister);
router.post('/login', customerLogin);

// Customer Profile Routes (Protected with Auth Middleware)
router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);


module.exports = router;
