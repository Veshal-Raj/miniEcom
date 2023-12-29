const { Schema, model, Types } = require("mongoose");

const OrderSchema = new Schema({
  products: {
    type: Types.ObjectId,
    ref: "Product",
  },
  userEmail: String,
});

const OrderModel = model("Order", OrderSchema);

module.exports = OrderModel;
