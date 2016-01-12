var mongoose = require('mongoose');
var connection = mongoose.createConnection("mongodb://localhost/quickDB");


var userObjectsSchema = mongoose.Schema({ 
			username: String,
			email: String,
			password: String,
            p_img: { type: String, default: "userIMG.jpg" },
            regdate: { type: Date, default: Date.now },
			objects: [{
				object: String,
                descr: String,
                score: String,
                ref: String,
                img: String,
				date: { type: Date, default: Date.now }
				}] 	
			});
			
			
			
module.exports = {
	getUserObjectsModel: function() {
		return connection.model("userObjects", userObjectsSchema);
	}
};



