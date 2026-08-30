const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    productName: String,
    price: Number,
    category: String,
    stockQuantity: Number,
    SKU: String,
    description: String,
    images: [
        {type: String}
    ],
    favourite: {
        type: Boolean,
        default: false
    },
    addedToCart: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    },

    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order'
    },

    expectedDeliveryDate : String,
    status: String,
    shipped: String
    
});

module.exports = mongoose.model('product', productSchema);