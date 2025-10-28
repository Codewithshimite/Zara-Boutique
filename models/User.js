const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1 },
}, { _id: false });

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  profilePicture: { type: String, default: "" },
  address: { type: String, default: "" },
  isAdmin: { type: Boolean, default: false },
  cart: [cartItemSchema],
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
