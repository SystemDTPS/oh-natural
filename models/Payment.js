// Payment Schema For Razorpay
const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    razorpay_payment_id: {
        type: String
    },
    razorpay_order_id: {
        type: String
    },
    razorpay_signature: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    }
},{timestamps: true})

module.exports = mongoose.model('Payment', PaymentSchema)