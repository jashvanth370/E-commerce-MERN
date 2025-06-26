require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require("cookie-parser");

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app= express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));


const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`Server running on port http://localhost:${PORT}`);
});

app.use('/api/auth',authRoutes);
app.use('/api/products',productRoutes);