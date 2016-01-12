var express = require('express');
var router = express.Router();
var userModel = require(__dirname + '/../models/user'); 


/***************************

	Register a new user	

***************************/

router.get('/register', function(req, res, next) {
	
	res.render('register', {});
});


router.post('/register', function(req, res, next) {
	
	userModel.registerUser(req.body, function(err, user) {
		if (err) {
			res.send("Ha ocurrido un error en el registro del usuario");
		} else {
			req.session.username = user.username;
			res.redirect('/objects/' + user.username);
		}
	});
});


/***************************

	Login a user	

***************************/

router.get('/login', function(req, res, next) {
	
	res.render('login', {});	
});


router.post('/login', function(req, res, next) {
	
	userModel.loginUser(req.body, function(err, user) {
		if (err) {
			res.send("Ha ocurrido un error en el login del usuario");
		} else {
			if (!user) {
				res.send("Username or password incorrect!");
			} 
			else {
				req.session.username = user.username;
				res.redirect('/objects/' + user.username);	
			}
		}
	});
});


module.exports = router;