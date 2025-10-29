// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // <-- ensure uploads dir exists

// Load environment variables
dotenv.config();

// Initialize Express App
const app = express();

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message);
    // Optional: exit so Render shows a clear failure instead of 502 loop
    // process.exit(1);
  });

// CORS Configuration (Flexible for Development)
app.use(cors({
  origin: (origin, callback) => {
    callback(null, true); // Allow any origin (dev-friendly)
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure uploads directory exists (Render's disk starts empty each deploy)
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Health routes (so / doesn't show "Cannot GET /")
app.get('/', (_req, res) => {
  res.json({ ok: true, service: 'ZaraDrips API', time: new Date().toISOString() });
});
app.get('/health', (_req, res) => res.send('OK'));

// Serve uploaded images statically
app.use('/uploads', express.static(uploadsDir));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Import Routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const customerRoutes = require('./routes/customerRoutes');
const { verifyToken } = require('./middleware/authMiddleware');
const adminMiddleware = require('./middleware/adminMiddleware');
const opayRoutes = require('./routes/opay');

// Product Routes (Multer applied)
app.use('/api/products', (req, res, next) => {
  req.upload = upload;
  next();
}, productRoutes);

// User Routes
app.use('/api/users', userRoutes);

// Customer Routes
app.use('/api/customers', customerRoutes);

// Admin Status Route - Use both authMiddleware and adminMiddleware
app.get('/api/admin/status', verifyToken, adminMiddleware, (req, res) => {
  return res.status(200).json({ status: 'Admin' });
});

app.use('/api/opay', opayRoutes);

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
