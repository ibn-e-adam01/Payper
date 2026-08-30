require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path')
const PORT = process.env.PORT;
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);
const cors = require('cors');
const userModel = require('./models/user');
const productModel = require('./models/product');
const sellerModel = require('./models/seller');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const braintree = require('braintree');

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANT_ID,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
});


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: process.env.FRONTEND_LIVE_URL,
    allowedHeaders: ['Content-Type'],
    methods: ['POST', 'GET', 'PATCH', 'PUT', 'DELETE'],
    credentials: true
}))
app.set('view engine', 'ejs');
app.set('trust proxy', 1);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    let token = req.cookies.token;
    if (!token) {
    return res.status(401).json({ msg: "No token found in cookies" });
  }
    // console.log(token);
    let verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(verifiedToken);

    let user = await userModel.findById(verifiedToken._id);
    console.log(user);

    res.json({
        message: "user found!!!",
        success: true,
        user
    })
});

app.post("/logout", (req, res) => {

    res.cookie("token", "").json({
        message: "logout done successfully!",
        success: true
    });
})

app.post('/payment-gateway-portal/:UserID', (req, res) => {

    let UserID = req.params;

    gateway.transaction.sale(
  {
    amount: "5.00",
    paymentMethodNonce: "nonce-from-the-client",
    options: {
      submitForSettlement: true,
    },
  },
  function (err, result) {
    if (err) {
      console.error(err);
      return;
    }

    if (result.success) {
      console.log("Transaction ID: " + result.transaction.id);
      let TransactionID = result.transaction.id;

      return res.status(200).json({
        message: "Amount Paid!",
        success: true,
        TransactionID
      })
    } else {
      console.error(result.message);
    }
  })

});

app.post('/create-new-product', async (req, res) => {
    let {ProductName, ProductCategory, ProductPrice, ProductStockQuantity, ProductSKU, ProductDescription, ProductImageUrl} = req.body;
    let token = req.cookies.token;
    if (!token) {
    return res.status(401).json({ msg: "No token found in cookies" });
  }
    console.log(token);
    let verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verifiedToken);

    let sellerFound = await sellerModel.findById(verifiedToken._id);
    console.log('Seller Found in create product: ', sellerFound);


    if(ProductName == ''){
        return res.json({
            message1: 'Enter product name!!!',
            success: false
        });
    }
    else if(ProductCategory == ''){
        return res.json({
            message2: 'Enter product category!!!',
            success: false
        });
    }
    else if(ProductPrice == ''){
        return res.json({
            message3: 'Enter product price!!!',
            success: false
        });
    }
    else if(ProductStockQuantity == ''){
        return res.json({
            message4: 'Enter product stock quantity!!!',
            success: false
        });
    }
    else if(ProductDescription == ''){
        return res.json({
            message5: 'Enter product description!!!',
            success: false
        });
    }
    else if(ProductImageUrl == ''){
        return res.json({
            message6: 'Enter product image url!!!',
            success: false
        });
    }
    


    // console.log(ProductName);
    // console.log(ProductCategory);
    // console.log(ProductPrice);
    // console.log(ProductStockQuantity);
    // console.log(ProductSKU);
    // console.log(ProductDescription);
    // console.log(ProductImageUrl);

    let productCreated = await productModel.create({
    sellerId: sellerFound._id,
    productName: ProductName,
    price: ProductPrice,
    category: ProductCategory,
    stockQuantity: ProductStockQuantity,
    SKU: ProductSKU,
    description: ProductDescription,
    images: [ProductImageUrl],
    status: 'Processing',
    expectedDeliveryDate: '00-00-0000'
    });

    console.log(productCreated);

    res.status(200).json({
        message: 'Product Added!',
        success: true,
        productCreated
    })

});

app.get('/seller-dashboard', async (req, res) => {
    let token = req.cookies.token;
    if (!token) {
    return res.status(401).json({ msg: "No token found in cookies" });
  }
    console.log(token);
    let verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verifiedToken);

    let seller = await sellerModel.findById(verifiedToken._id);
    console.log('seller found in dashboard is: ',seller);

    res.status(200).json({
        message:'seller data found!!!',
        success: true,
        seller
    })
});

app.patch('/updateAccount', async (req, res) => {
    let {AccountProfession} = req.body;


    let token = req.cookies.token;
    if (!token) {
    return res.status(401).json({ msg: "No token found in cookies" });
  }
    // console.log(token);
    let verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(verifiedToken);

    let updatedUser = await userModel.findOneAndUpdate({_id: verifiedToken._id}, {
        $set: {profession: AccountProfession}}, {new: true});

    console.log(updatedUser);
    res.json({
        message: "profession added to account details!",
        success: true
    })
});

app.post("/addToCart/:productID", async (req, res) => {
    let productID = req.params;

    console.log(productID);// {productID: "1"}

    

    let token = req.cookies.token;
    if (!token) {
    return res.status(401).json({ msg: "No token found in cookies" });
  }
    // console.log(token);
    let verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(verifiedToken);

    let userCarted = await userModel.findOneAndUpdate({_id: verifiedToken._id},
        {$push: {cartProducts: productID.productID}}, {new: true}
    );

    // userCarted.cartProducts.push(productID.productID);

    // const updatedUser = await user.save();

    console.log(userCarted);

});

app.post("/removeFromCart/:productID", async (req, res) => {
    let productID = req.params;

    console.log(productID);// {productID: "1"}

    

    let token = req.cookies.token;
    if (!token) {
    return res.status(401).json({ msg: "No token found in cookies" });
  }
    // console.log(token);
    let verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(verifiedToken);

    let userUpdatedCart = await userModel.findOneAndUpdate({_id: verifiedToken._id},
        {$pull: {cartProducts: productID.productID}}, {new: true}
    );

    // userCarted.cartProducts.push(productID.productID);

    // const updatedUser = await user.save();

    console.log(userUpdatedCarted);
    res.json({
        message: "product removed from cart!",
        success: true,
        userUpdatedCart
    })

})

app.delete('/deleteAccount', async (req, res) => {
    let token = req.cookies.token;
    if (!token) {
    return res.status(401).json({ msg: "No token found in cookies" });
  }
    // console.log(token);
    let verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(verifiedToken);

    let deletedUser = await userModel.findOneAndDelete({_id: verifiedToken._id});
       

    console.log(deletedUser);
    res.json({
        message: "Account Deleted Permanently!",
        success: true
    })
});

app.patch('/updateProduct/:ProductID', async (req, res) => {
    let ProductID = req.params;
    let {ExpectedDeliveryDate, StatusOrder, Shipped} = req.body;
    console.log(ProductID);
    console.log(ExpectedDeliveryDate);
    console.log(StatusOrder);
    console.log(Shipped);


    const UpdatedProduct = await productModel.findOneAndUpdate({_id: ProductID.ProductID}, {
    expectedDeliveryDate : ExpectedDeliveryDate,
    status: StatusOrder,
    shipped: Shipped 
    }, {new: true});

    res.status(200).json({
        message: 'product updated!',
        success: true,
        UpdatedProduct
    })
})

app.patch('/themeChange', async (req, res) => {

    let {EnabledDark} = req.body;

    // console.log(EnabledDark);


    let token = req.cookies.token;
    if (!token) {
    return res.status(401).json({ msg: "No token found in cookies" });
  }
    // console.log(token);
    let verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(verifiedToken);

    let updatedUser = await userModel.findOneAndUpdate({_id: verifiedToken._id}, {
        darkTheme: !EnabledDark
    }, {new: true} );

    console.log(updatedUser);
    res.json({
        message: "theme changed!",
        success: true
    })

})

app.delete('/deleteProfession', async (req, res) => {
    let {AccountProfession} = req.body;

    let token = req.cookies.token;
    if (!token) {
    return res.status(401).json({ msg: "No token found in cookies" });
  }
    console.log(token);
    let verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verifiedToken);

    let deleteUserField = await userModel.findOneAndUpdate({_id: verifiedToken._id}, {
        $unset: {profession: ''}
    })

    console.log("DELETED USER IS: ", deleteUserField);


})

app.post('/createAccount', async (req, res) => {
    let {firstName, lastName, Email, Password} = req.body;

    if(firstName == "" || lastName == ""){
        return res.json({
            message1st: "Enter First Name!",
            message2nd: "Enter Last Name!",
            success: false
        })
    }

    let alreadyUser = await userModel.findOne({email:Email});
    console.log(alreadyUser);

    if(alreadyUser){
        return res.json({
            message: "Email Already Registered! Try New One",
            success: false
        })
    }

    if(Password == ""){
        return res.json({
            messagePassword: "Enter Password!",
            success: false
        })
    }

    let userCreated;
    // console.log(firstName);
    // console.log(lastName);
    // console.log(Email);
    // console.log(Password);

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(Password, salt, async (err, hash) => {

        userCreated = await userModel.create({
        firstName,
        lastName,
        email: Email,
        password: hash,
        primaryRole: 'Customer'
    });

        console.log(userCreated);

        let token = jwt.sign({email: Email, _id: userCreated._id}, process.env.JWT_SECRET);
        res.cookie("token", token, {
        httpOnly: true,     // Prevents client-side JS from reading the cookie
        secure: true,       // Requires HTTPS (essential in production)
        sameSite: 'none',   // Required if frontend and backend are on different domains
        maxAge: 24 * 60 * 60 * 1000 // 1 day expiration
        }).json({
            message: "Account Successfully Created!",
            success: true,
            userCreated
        });

        });
    });
});

app.post('/createSellerAccount', async (req, res) => {
    let {FullName, EmailSeller, PasswordSeller, PhNumber, BusinessName, BusinessType, BusinessDescription} = req.body;

    console.log(EmailSeller)

    if(FullName == "" || EmailSeller == ""){
        return res.json({
            message1st: "Enter Full!",
            message2nd: "Enter Email!",
            success: false
        })
    }

    let alreadyUser = await userModel.findOne({email:EmailSeller});
    console.log(alreadyUser);

    if(!alreadyUser){
        return res.json({
            message: "Email is not registered! Try registered One",
            success: false
        })
    }

    
    // console.log(firstName);
    // console.log(lastName);
    // console.log(Email);
    // console.log(Password);

    let sellerCreated;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(PasswordSeller, salt, async (err, hash) => {
            sellerCreated = await sellerModel.create({
            fullName: FullName,
            email: EmailSeller + '@attireSeller',
            role: 'Seller',
            storeName: 'AttireStore',
            businessName: BusinessName,
            businessType: BusinessType,
            businessDescription: BusinessDescription,
            phoneNumber: PhNumber,
            password: hash

        });

        console.log(sellerCreated);

        

        let token = jwt.sign({email: sellerCreated.email, _id: sellerCreated._id}, process.env.JWT_SECRET);
        res.cookie("token", token, {
        httpOnly: true,     // Prevents client-side JS from reading the cookie
        secure: true,       // Requires HTTPS (essential in production)
        sameSite: 'none',   // Required if frontend and backend are on different domains
        maxAge: 24 * 60 * 60 * 1000 // 1 day expiration
        }).json({
        message: "Seller Account Successfully Created!",
        success: true,
        sellerCreated
        });
    })
})

});


app.get('/seller/MyProducts', async (req, res) => {

    let token = req.cookies.token;
    if (!token) {
    return res.status(401).json({ msg: "No token found in cookies" });
  }
    console.log(token);
    let verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verifiedToken);

    let sellerFound = await sellerModel.findById(verifiedToken._id);
    console.log('Seller Found in My Products: ', sellerFound);

    let MyProducts = await productModel.find({sellerId: sellerFound._id});
    console.log("My Products are: ", MyProducts);

    res.status(200).json({
        message: 'Seller Added Products Recieved!',
        success: true,
        MyProducts
    });
    
});

app.delete('/delete/:ProductID', async (req, res) => {
    let ProductID = req.params;
    console.log(ProductID);

    const deleteProduct = await productModel.findOneAndDelete({_id: ProductID.ProductID});

    res.status(200).json({
        message:'deleted product successfully!',
        success: true
    })

})

app.post('/signin', async (req, res) => {
    let {Email, Password} = req.body;

    if(Email == ""){
        return res.json({
            messageEmail: "Enter Email!",
            success: false
        })
    }

    // console.log(Email);
    // console.log(Password);

    let foundUser = await userModel.findOne({email: Email});

    if(!foundUser){
        return res.json({
            messageNotFound: "Email is Not Registered!",
            success: false
        })
    }

    if(Password == ""){
        return res.json({
            messagePassword: "Enter Password!",
            success: false
        })
    }

    bcrypt.compare(Password, foundUser.password, (err, result) => {
        if(!result){
            return res.json({
                messageWrongPWD: "Incorrect Password!",
                success: false
            });
        }


        let token = jwt.sign({email: Email, _id: foundUser._id}, process.env.JWT_SECRET);
        res.cookie("token", token, {
        httpOnly: true,     // Prevents client-side JS from reading the cookie
        secure: true,       // Requires HTTPS (essential in production)
        sameSite: 'none',   // Required if frontend and backend are on different domains
        maxAge: 24 * 60 * 60 * 1000 // 1 day expiration
        }).json({
            message: "Successfully Logged In!",
            success: true,
            foundUser
        })
    })
})

app.post('/seller/login', async (req, res) => {
    let {FullNameSeller, EmailSeller, PasswordSeller} = req.body;

    if(EmailSeller == ""){
        return res.json({
            messageEmail: "Enter Email!",
            success: false
        })
    }

    console.log(FullNameSeller);
    // console.log(Password);

    let foundSeller = await userModel.findOne({email: EmailSeller});

    if(!foundSeller){
        return res.json({
            messageNotFound: "Email is not registered for a seller!",
            success: false
        })
    }

    // if(foundSeller.fullName !== FullNameSeller){
    //     return res.json({
    //         messageFullName: "Full name doesn't match!",
    //         success: false
    //     })
    // }

    if(PasswordSeller == ""){
        return res.json({
            messagePassword: "Enter Password!",
            success: false
        })
    }

    bcrypt.compare(PasswordSeller, foundSeller.password, (err, result) => {
        if(!result){
            return res.json({
                messageWrongPWD: "Incorrect Password!",
                success: false
            });
        }

        let modifiedEmail = EmailSeller + '@attireSeller'

        let token = jwt.sign({email: modifiedEmail, _id: foundSeller._id}, process.env.JWT_SECRET);
        res.cookie("token", token, {
        httpOnly: true,     // Prevents client-side JS from reading the cookie
        secure: true,       // Requires HTTPS (essential in production)
        sameSite: 'none',   // Required if frontend and backend are on different domains
        maxAge: 24 * 60 * 60 * 1000 // 1 day expiration
        }).json({
            message: "Successfully Logged In As A Seller!",
            success: true,
            foundSeller
        })
    })
})

app.listen(PORT, () => {
    console.log(`Listening on the port ${PORT}...`);
});