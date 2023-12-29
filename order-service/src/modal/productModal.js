const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_id: {
    type: String
  },
  productname: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const ProductModel = mongoose.model("Product", productSchema);

module.exports = { ProductModel };
