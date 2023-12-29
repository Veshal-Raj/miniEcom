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
    created_at: {
        type: Date,
        default: Date.now()
    },
})

module.exports = Product = mongoose.model('product', ProductSchema)