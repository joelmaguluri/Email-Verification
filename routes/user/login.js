var app=require('express');
var router=app.Router();
router.get('/login',function(req,res,next){

res.send('hello');
});


module.exports=router;