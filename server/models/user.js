const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        minlength: [3, 'Atleast 3 characters'],
        maxlength: [25, 'FirstName cannot exceed 20 characters']
    },
    lastName: {
        type: String,
        minlength: [3, 'Atleast 3 characters'],
        maxlength: [25, 'FirstName cannot exceed 20 characters']
    },

    primaryRole: String,
    secondaryRole: String,

    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    profession: {
        type: String
    },

    darkTheme: {
        type: Boolean,
        default: false
    },

    cartProducts: [

            {type: String,
            ref: 'product',
            unique: true,
            }, {_id: false}

    ],
    myOrder: [
            {type: mongoose.Schema.Types.ObjectId,
                ref: 'product'
            }
            
        ],
    productsPurchased : 
        [
            {type: mongoose.Schema.Types.ObjectId,
                ref: 'product'
            }
            
        ]
    
});

module.exports = mongoose.model('user', userSchema);