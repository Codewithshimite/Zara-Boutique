const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  category: String,
  image: String,
  stock: { type: Number, default: 0 },
  rating: { type: Number, default: 0 }, // Add rating field with default value
});

module.exports = mongoose.model('Product', productSchema);
