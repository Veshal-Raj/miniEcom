const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  _id: {
    type: String
  },
  productName: {
    type: String,
  },
  productDescription: {
    type: String,
  },
  productPrice: {
    type: Number,
  },
  stock: {
    type: Number
  }
});

const ProductModel = mongoose.model("Product", productSchema);

module.exports = { ProductModel };
