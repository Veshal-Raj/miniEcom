const Order = require('../modal/orderModal');
const User = require('../modal/userModal')
const Product = require('../modal/userModal')

async function createOrder(req, res) {
  try {
    const { user, product_id, total_price, quantity } = req.body;
    const createOrder = await new Order({
      products: product_id,
      user,
      total_price,
      quantity,
    });

    if (createOrder !== null) {
      // send the quantity to the product service and reduce the stock using quantity.
      await createOrder.save();
      return res.status(200).json({ message: 'Order Created!' });
    } else {
      return res.status(404).json({ message: 'Order is not created!' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
  createOrder,
};
