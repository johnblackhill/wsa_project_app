var mongoose = require('mongoose');
var userObjects = require('./db').getUserObjectsModel();

var redisUserObject = require('./db_redis')

var model = {};


/***************************

	Register a new user	

***************************/

model.registerUser = function(userData, cb) {

    //redisUserObject.set(userData.username, userData.email);

	var user = new userObjects(userData);
	user.save(cb);
}


/***************************

	Login a user	

***************************/

model.loginUser = function(userData, cb) {
	
	userObjects.findOne({username: userData.username, password: userData.password}, cb);
}


module.exports = model;
