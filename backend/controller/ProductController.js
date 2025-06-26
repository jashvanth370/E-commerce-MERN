const User = require('../models/user');
const Product = require('../models/product');

module.exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, category, countInStock, image } = req.body;

    if (!title || !description || !price || !category || countInStock == null) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    if (!req.user._id) {
      console.log("user not there : ", req.user._id);
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

module.exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      console.log("Products not there : ");
      return res.status(400).json({ message: "Products not found." });
    }
    res.status(200).json({ products: products, success: true, message: "Products fetched successfully" })
  } catch (error) {
    console.error("Fetch  Products Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports.getProductsByUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      console.log("user not there in token ");
      return res.status(400).json({ message: "User not found." });
    }
    const products = await Product.find({ owner: userId }).lean();
    if (products.length === 0 || !products) {
      console.log("This user don't have products : ", userId);
      return res.status(400).json({ message: "No Products found for this user." });
    }
    res.status(200).json({
      products: products,
      success: true,
      message: "Products fetched successfully"
    })
  } catch (error) {
    console.error("fetched Product Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
}