var express = require('express');
var router = express.Router();
var itemModel = require(__dirname + '/../models/item'); 


/***************************

	Add new item

***************************/

router.post('/newitem', function(req, res, next) {
	
	itemModel.addNewItem(req.session.username, req.body.item, function(err, result){
		res.redirect('/items/' + req.session.username);	
	});
});


/***************************

	Find user's items	

***************************/

router.get('/:username', function(req, res, next) {
	
	itemModel.findUserItems(req.params.username, function(err, user) {
		if (req.params.username == req.session.username) {
			res.render('items_add', user);	
		} else {
			res.render('items', user);
		}
	});
});


module.exports = router;