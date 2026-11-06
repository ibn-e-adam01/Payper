const mongoose = require('mongoose');

const sellerSchema = mongoose.Schema({
    fullName: {
        type: String,
        minlength: [3, 'Atleast 3 characters'],
        maxlength: [25, 'FirstName cannot exceed 20 characters']
    },

    role: String,
    password: String,

    email: {
        type: String,
        lowercase: true,
        trim: true
    },
    phoneNumber: {
        type: Number
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    businessType: {
        type: String
    },

    businessName: {
        type: String
    },

    businessDescription: {
        type: String
    },

    storeName: String,

    darkTheme: {
        type: Boolean,
        default: false
    },

   
   
    
});

module.exports = mongoose.model('seller', sellerSchema);