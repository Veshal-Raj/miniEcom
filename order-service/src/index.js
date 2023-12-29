const express = require('express');
const app = express();
const PORT = process.env.PORT_ONE || 3002;
const mongoose = require('mongoose');
const orderRoutes = require('../src/routes/orderRoute');

app.use(express.json());

mongoose
  .connect('mongodb://localhost/Order-Service2', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Order-Service2 DB Connected');
  })
  .catch((error) => {
    console.error('Error connecting to Order-Service2 DB:', error);
  });

app.use(orderRoutes);

app.listen(PORT, () => {
  console.log(`Order-Service2 is running at ${PORT}`);
});


// const express = require("express");
// const app = express();
// const PORT = process.env.PORT_ONE || 3002;
// const mongoose = require('mongoose')
// const Order = require('./modal/orderModal')
// const jwt = require('jsonwebtoken')
// const consumer = require('./consumer')

// app.use(express.json())

// mongoose.connect('mongodb://localhost/Order-Service2', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => {
//         console.log('Order-Service2 DB Connected');
//     })
//     .catch((error) => {
//         console.error('Error connecting to Order-Service2 DB:', error);
//     });

// // use direct exchange
// app.post('/create-order', async (req,res) => {
//     const {user, product_id, total_price, quantity } = req.body;
//     const createOrder = await new Order({
//         products: product_id,
//         user,
//         total_price,
//         quantity,
//     }) 

//     if (createOrder !== null) {
//         // send the quantity to the product service and reduce the stock using quantity.
//         await createOrder.save()
//         return res.status(200).json({ message: 'Order Created!'})
//     } else {
//         return res.status(404).json({message: 'Order is not created!'})
//     }
// })




// app.listen(PORT, () => {
//     console.log(`Order-Service2 is running at ${PORT}`)
// })
