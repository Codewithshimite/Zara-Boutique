const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Assuming your model is 'user.js'
const jwt = require('jsonwebtoken');

// Admin Registration
const adminRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new admin user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin: true,  // Set as admin
    });

    await newUser.save();
    return res.status(201).json({ message: 'Admin registration successful' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error registering admin' });
  }
};

// Admin Login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check if the user is an admin
    if (!user.isAdmin) {
      return res.status(403).json({ message: 'Access denied, you are not an admin' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ message: 'Login successful', token });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error logging in' });
  }
};

const getUserCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('cart.productId');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateUserCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.cart = req.body.cart;
    await user.save();
    res.json({ message: 'Cart updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update cart' });
  }
};


module.exports = {
  adminRegister,
  adminLogin,
  getUserCart,        // ✅ make sure these are included
  updateUserCart      // ✅
};
