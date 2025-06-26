require('dotenv').config(); // Also make sure to call .config() here

const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (id) => {
  return jwt.sign(
    { _id: id }, 
    process.env.JWT_SECRET, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};
