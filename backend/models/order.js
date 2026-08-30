const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({

    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    orderItems: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        },
        name: String,
        price: Number,
        quantity: Number,
        image: String,
        sellerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    }],
    totalAmount: Number,
    status: String,
    expectedDelivery: String,
   
    createdAt: {
        type: Date,
        default: Date.now
    }
    
});

module.exports = mongoose.model('order', orderSchema);