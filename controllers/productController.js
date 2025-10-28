// productController.js
const Product = require('../models/Product'); // Ensure this is correctly imported
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(404).json({ error: 'No products found' });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Error fetching products:", error.message);
    res.status(500).json({
      error: 'Error fetching products',
      message: error.message, // Detailed error message for debugging
    });
  }
};


// Add a new product
exports.addProduct = async (req, res) => {
  try {
    // Log request body and file for debugging
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    const { name, price, rating, category, description } = req.body;

    // Validate required fields
    if (!name || !price || !description || !category) {
      return res.status(400).json({ error: "Name, price, description, and category are required." });
    }

    // Construct image path if file uploaded
    const image = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;


    const newProduct = new Product({
      name,
      price: Number(price),
      description,
      category,
      rating: rating ? Number(rating) : 0,
      image,
    });

    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: 'Error adding product' });
  }
};

// Update product by ID
exports.updateProduct = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    const { name, price, rating, category, description } = req.body;
    // Image: if new file uploaded, use its path, else keep existing image URL sent from frontend
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

    const updatedFields = {
      name,
      price: price !== undefined ? Number(price) : undefined,
      description,
      category,
      rating: rating ? Number(rating) : 0,
      image
    };

    // Remove undefined fields to avoid overwriting with undefined
    Object.keys(updatedFields).forEach(key => updatedFields[key] === undefined && delete updatedFields[key]);

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );
    

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: 'Error updating product' });
  }
};

// Delete product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted' });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: 'Error deleting product' });
  }
};

