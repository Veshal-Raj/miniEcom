const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    productName: String,
    productDescription: String,
    productPrice: Number,
    stock: {
        type: Number,
        default: 1
    },
})

module.exports = Product = mongoose.model('product', ProductSchema)