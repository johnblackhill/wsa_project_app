var mongoose = require('mongoose');
var userItems = require('./db').getUserItemsModel();

var model = {};


/***************************

	Add new item

***************************/

model.addNewItem = function(username, item, cb) {
		
	userItems.findOne({username: username}, function(err, user){
		user["items"].push({"item": item });
		user.save(cb);
	});
}


/***************************

	Find user's items

***************************/

model.findUserItems = function(username, cb) {
	
	userItems.findOne({username: username},  cb  );
}


module.exports = model;
