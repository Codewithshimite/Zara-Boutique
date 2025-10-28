const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Customer Registration
const customerRegister = async (req, res) => {
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

    // Create a new customer user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin: false,  // Set as customer
    });

    await newUser.save();
    return res.status(201).json({ message: 'Customer registration successful' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error registering customer' });
  }
};

// Customer Login
const customerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Ensure the user is not an admin
    if (user.isAdmin) {
      return res.status(403).json({ message: 'Access denied, admin login only' });
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

module.exports = { customerRegister, customerLogin };
