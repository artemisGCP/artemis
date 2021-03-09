var express = require('express');
var router = express.Router();
var path = require('path');


router.get('/', function (req, res) {
	// Check that email & password fields are non-empty, and pw is valid
    req.checkBody("email", "Email is required").notEmpty();
    req.checkBody("email", "Please enter a valid email").isEmail();
    req.checkBody("password", "Password is required").notEmpty();
    

    password = req.body.password;
    const errors = req.validationErrors();
    if (errors) {
    	console.log("Error in registering the user");
    	req.session.errors = errors;
    	res.redirect('/register');
    	return;
    }

    // let getEmailResp = collection.findOne({ email : req.body.email }); need DB URI

    if (getEmailResp) {
    	console.log("User already exists. Forgot your password?");

    	res.status(501).redirect('/login');
    }
    else {
    	// create new user in MongoDB collection with the following credentials:
    	/*
    	 {
    		email : req.body.email,
    		password: req.body.password,
		}
		Then set session variables as follows:
			req.session.email = req.body.email
			req.session.password = req.body.password
    	*/
    }

    // Now check user has been successfully created
    const tryGetUser = collection.findOne( { email : req.session.email })
    req.session.uid = tryGetUser.id;

    console.log("User has been successfully created");
    console.log("The session ID is: ", req.session.uid);
    res.status(200).redirect("/" + req.session.uid );
});

module.exports = router;