var express=require('express');
var app=express();
var path=require('path');
const password=require('./password/password');
var expressValidator = require("express-validator");
var db = require("./DBConnect.js");
var bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'views')));
var register_router=require('./routes/user/register');
app.use('/user',register_router);
var port=process.env.PORT||4000;
app.listen(port, function(err){
    if(err) throw err;
    console.log("Server is running 4000");
});
