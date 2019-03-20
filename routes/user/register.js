var app=require('express');
var path=require('path');
var router=app.Router();
const password=require('../../password/gmailpassword');
const nodemailer = require("nodemailer");
var randomString = require("randomstring");
var User=require('../../models/user')
var transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
    service: 'Gmail',
    auth: {
    user: 'msudeep.joel@gmail.com',
    pass: `${password}`
    }
});
router.get('/register',function(req,res,next){
 res.render('index.pug')
});

router.post("/register", function(req, res,next) {
	req.checkBody("name", "Invalid name").notEmpty();
	req.checkBody("email", "Invalid email").isEmail();

	var errors = req.validationErrors();
	if (errors) {
		res.json(errors);
	}
	else {
		const token = randomString.generate();
		var user = new User();
		user.name = req.body.name;
		user.email = req.body.email;
		user.password = req.body.password;
		user.token = token;

		user.save(function(err) {
			if (err) throw err;
			console.log({ Status: "Success" });
	});

	}
         let mailOptions = {
               from: '"Sudeep Joel" <msudeep.joel@gmail.com>', // sender address
               to:`${req.body.email}`,// list of receivers
               subject:  "EmailVerification",// Subject line
               text: `Please click the below link to verify`, // plain text body
               html: `<a href="http://localhost:4000/user/verify/${user.token}">verify</a>` // html body

          };

         let info = transporter.sendMail(mailOptions,function(error, response){
           if(error){
              console.log('Failed in sending mail');
              console.dir({success: false, existing: false, sendError: true});
              console.dir(error);
              res.end('Failed in sending mail');
          }

          else{
              console.log('Successful in sending email');
              console.dir({success: true, existing: false, sendError: false});
              console.dir(response);
              res.send('please verify email');
              res.end('Successful in sending email');
          }
 
        });

});

router.get("/verify/:code", function(req, res) {
	User.findOneAndUpdate(
		{ token: req.params.code },
		{ $set: { active: true } },
		function(err, user) {
			if (!user) res.json({ Status: "Not found" });
			else {
				console.log({ Status: "Conformed and active changed to true" });
				res.render('thankyou.pug')
		}
	});
});
module.exports=router;
		