var mongoose = require('mongoose');
var userItems = require('./db').getUserItemsModel();

var model = {};


/***************************

	Register a new user	

***************************/

model.registerUser = function(userData, cb) {

	var user = new userItems(userData);
	user.save(cb);
}


/***************************

	Login a user	

***************************/

model.loginUser = function(userData, cb) {
	
	userItems.findOne({username: userData.username, password: userData.password}, cb);
}


module.exports = model;
