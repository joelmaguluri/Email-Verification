var express=require('express');
var app=express();
var path=require('path')
var bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'pug');
app.use(express.static('views'));
var register_router=require('./routes/user/register');
app.use('/user',register_router);
var port=process.env.PORT||4000;
app.listen(port, function(err){
    if(err) throw err;
    console.log("Server is running 4000");
});
