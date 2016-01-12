var mongoose = require('mongoose');
var userObjects = require('./db').getUserObjectsModel();

var redisUserObject = require('./db_redis')

var model = {};


/***************************

	Add new object

***************************/

model.addNewObject = function(username, object, cb) {

    redisUserObject.rpush(username, object);

	userObjects.findOne({username: username}, function(err, user){
		user["objects"].push({"object": object });
		user.save(cb);
	});
}


/***************************

	Find user's objects	

***************************/

model.findUserObjects = function(username, cb) {
    
    redisUserObject.lrange(username, 0, -1, function(err, data){
        if (data.length != 0) {
            console.log("Redis Hit!");
            
            result = {};
            result['username'] = username;
            result['objects'] = [];
            for (var i in data) {
                result['objects'].push({'object' : data[i]});    
            }
            cb(0, result);
        }    
        else {
            console.log("MongoDB Hit");
             
            userObjects.findOne({username: username}, function(err, user){
                
                if (user != null) {
                
                    if (user['objects'].length != 0) {        
                        objectList = [];
                        for (var i=0; i<user['objects'].length; i++) {
                            objectList.push(user['objects'][i]['object']);
                        }
                        redisUserObject.rpush(username, objectList);
                        cb(err, user);        
                    }
                    else {
                        cb(err, user);
                    }  
                }
                else {
                    console.log("User not found.");
                    cb(err, user);
                }
            });   
        }
    });
}


module.exports = model;
