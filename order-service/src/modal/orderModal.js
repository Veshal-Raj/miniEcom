const mongoose = require("mongoose");
const { Schema, Types, model } = mongoose;

const orderSchema = new Schema({
  products: String,
  email: String,
});

const OrderModel = model("Order", orderSchema);

module.exports = { OrderModel };
