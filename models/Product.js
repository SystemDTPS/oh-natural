// Product Schema
const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        default: 1
    },
    sells: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    images: [{
        type: String
    }],
    bestselling: {
        type: Boolean,
        default: false
    },
    newlyLaunched: {
        type: Boolean,
        default: false
    },
},{timestamps: true})   

module.exports = mongoose.model('Product', ProductSchema)