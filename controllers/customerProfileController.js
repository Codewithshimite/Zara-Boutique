// controllers/customerProfileController.js
const User = require('../models/User');
const multer = require('multer');
const path = require('path');

// Profile Picture Storage Setup (Multer)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage }).single('profilePicture');

// Get Customer Profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};

// Update Customer Profile
const updateProfile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ message: "Error uploading image" });

    const { firstName, lastName, address } = req.body;
    const updateData = {
      firstName,
      lastName,
      address,
    };

    if (req.file) {
      updateData.profilePicture = `/uploads/${req.file.filename}`;
    }

    try {
      const user = await User.findByIdAndUpdate(req.user.id, updateData, { new: true });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Error updating profile" });
    }
  });
};

module.exports = { getProfile, updateProfile };
