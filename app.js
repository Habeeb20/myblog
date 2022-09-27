const express = require('express');
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyparser = require("body-parser")
const productRoutes = require('./api/models/productserver');
const productapp = require('./api/models/productserver')
const orderRoutes = require('./api/models/orderserver');
const User = require("./api/Schema/userschema");
const router = express.Router();




const PORT = process.env.PORT || 3000;
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("veiw engine", "ejs");
app.use('.../productsever', productRoutes)
app.use('.../productsever', productapp)
app.use('/orderserver', orderRoutes)




app.use( '/product',(req, res, next) =>{
        res.status(200).json({
            message: "hello there"
        });
      
    })


    app.use( '/productId',(req, res, next) =>{
        res.status(200).json({
            message: "hello "
        });
      
    })


app.get('/fintech', (req, res, next) => {
    res.render("fintech.ejs")
});




app.get('/product1', (req, res, next) => {
    res.render("product1.ejs")
});


app.get('/product2', (req, res, next) => {
    res.render("product2.ejs")
});



app.get('/contactus', (req, res, next) => {
    res.render("contactus.ejs")
});

app.get('/signing', (req, res, next) => {
    res.render("signing.ejs")
})

app.post('/signing', (req, res, next) => {
    User.find({email :req.body.email})
    .exec()
    .then(user => {
        if (user.length >= 1){
            return res.status(409).json ({
                message:"mail already exist"
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) { 
                        error:err
                    
                } else {
                    const user = new User ({
                        email: req.body.email,
                        password: hash
                    });
                    user
                    .save()
                    .then(result => {
                        console.log(result)
                        res.render("shopping.ejs")
                    });
                }
            });
        }
    });
    
    
    
});



app.get('/log', (req, res, next) => {
    res.render("log.ejs")
})


app.get('/login', (req, res, next) => {
    res.render("login.ejs")
})

app.post('/login', (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length < 1){
             res.status(404).json(
                res.render("log.ejs")
            );
        }
        bcrypt.compare(req.body.password, user [0].password,(err, result))
        if (err) {
            res.status(401).json(
                res.render("log.ejs")
            );
        }
        if (result){
            res.render("shopping.ejs")

        }
    });
});







app.use((req, res, next) => {
    res.status(200).json ({
        message: "hello its working"
    });
});

app.use((req, res, next) => {
    const error = new error ("not available")
    error.status = 404
    next(error)
})



app.listen(PORT, () => console.log ("server listening on port " + PORT));