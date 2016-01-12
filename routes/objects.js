var express = require('express');
var router = express.Router();
var objectModel = require(__dirname + '/../models/object'); 


/***************************

	Add new object

***************************/

router.post('/newobject', function(req, res, next) {
	
	objectModel.addNewObject(req.session.username, req.body.object, function(err, result){
		res.redirect('/objects/' + req.session.username);	
	});
});


/***************************

	Find user's objects	

***************************/

router.get('/:username', function(req, res, next) {
    
    console.log(req.headers);
	
	objectModel.findUserObjects(req.params.username, function(err, user) {
    	if (user != null) {
            if (req.params.username == req.session.username) {
			    res.render('objects_add', user);	
		    } else {
			    res.render('objects', user);
		    }	
    	}
    	else {
        	res.send('Usuario no encontrado');
    	}
	});
});


module.exports = router;