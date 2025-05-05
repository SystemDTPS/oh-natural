// Order Schema
const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    status: {
        type: String,
        enum: ['pending', 'delivered', 'cancelled'],
        default: 'pending'
    },
    total: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    tracking_id: {
        type: String
    },
    transaction_id: {
        type: String
    },
    payment_status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    payment_type: {
        type: String,
        enum: ['prepaid', 'postpaid',],
        default: 'postpaid'
    },
    reference_id: {
        type: String
    }
},{timestamps: true})

module.exports = mongoose.model('Order', OrderSchema)
