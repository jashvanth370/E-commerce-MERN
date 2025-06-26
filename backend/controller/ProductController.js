const User = require('../models/user');
const Product = require('../models/product');

module.exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, category, countInStock, image } = req.body;

    if (!title || !description || !price || !category || countInStock == null) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    if(!req.user._id){
        console.log("user not there : ",req.user._id);
        return res.status(400).json({ message: "User not found." });
    }

    const newProduct = new Product({
      owner: req.user._id,
      title,
      description,
      price,
      category,
      countInStock,
      image
    });

    const savedProduct = await newProduct.save();

    await User.findByIdAndUpdate(req.user._id, {
      $push: { products: savedProduct._id }
    });

    res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
    });

  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};