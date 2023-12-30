const { OrderModel } = require("../modal/orderModal");
const User = require("../modal/userModal");
const Product = require("../modal/userModal");

async function createOrder(req, res) {
  try {
    const { email, product_id } = req.body;
    console.log(email, product_id);
    const createOrder = await new OrderModel({
      products: product_id,
      email,
    });

    if (createOrder !== null) {
      await createOrder.save();
      return res.status(200).json({ message: "Order Created!" });
    } else {
      return res.status(404).json({ message: "Order is not created!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}


async function getOrder (req,res) {
  try {
    const {_id} = req.body;
    const findOrder = await OrderModel.findById(_id)
    if (!findOrder) {
      return res.json({ message: 'Order not found'})
    }
    return res.json({ message: 'order found : ', findOrder})
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Internal Server Error"})
  }
}


module.exports = {
  createOrder,
  getOrder
};
