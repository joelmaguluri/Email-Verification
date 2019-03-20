var app=require('express');
var path=require('path');
var router=app.Router();
router.get('/register',function(req,res,next){
res.render('index.pug');
});


module.exports=router;