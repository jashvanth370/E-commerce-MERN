require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const { auth } = require('express-oauth2-jwt-bearer');
// const bodyParser = require('body-parser');
// const path = require('path');
// const cookieParser = require("cookie-parser");
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const subscriberRoutes = require('./routes/subscriberRoutes');

const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Security
app.use(helmet());
// only sanitize body & params, ignore query
app.use((req, res, next) => {
  if (req.body) mongoSanitize.sanitize(req.body);
  if (req.params) mongoSanitize.sanitize(req.params);
  next();
});


app.use(express.json({ limit: "100kb" }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL if different
  credentials: true, // If you need to send cookies or authentication headers
}));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// --- Auth0 access-token validation middleware ---
const requireAuth = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

// --- routes ---
app.get("/api/public", (req, res) => {
  res.json({ message: "This is a public endpoint, no auth needed." });
});

app.get("/api/me", requireAuth, (req, res) => {
  res.json({
    message: "Protected route success!",
    user: {
      id: req.auth.payload.sub, // Auth0 stable user ID
      permissions: req.auth.payload.permissions || [],
    },
  });
});

// --- error handler ---
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({ error: err.message });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));


const PORT = process.env.PORT || 8089;


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/subscribers', subscriberRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});