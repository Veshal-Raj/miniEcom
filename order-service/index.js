const express = require("express");
const app = express();
const PORT = process.env.PORT_ONE || 3002;
const mongoose = require('mongoose')
const Order = require('./Order')
const jwt = require('jsonwebtoken')

app.use(express.json())

mongoose.connect('mongodb://localhost/Order-Service2', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Order-Service2 DB Connected');
    })
    .catch((error) => {
        console.error('Error connecting to Order-Service2 DB:', error);
    });



    // Get Product
app.post("/getProduct", async(req,res) => {
    const {_id} = req.body;
    const findProduct = await Product.findById(_id)
    if (findProduct) {
        console.log(findProduct)
        return res.status(200).json({ message: 'Product Got successfully', data: findProduct})
    } else {
        return res.status(404).json({message: "Product Couldn't find!!"})
    }

})




app.listen(PORT, () => {
    console.log(`Order-Service2 is running at ${PORT}`)
})