var mongoose = require('mongoose');
var connection = mongoose.createConnection("mongodb://localhost/aswDB");


var userItemsSchema = mongoose.Schema({ 
			username: String,
			email: String,
			password: String,
            p_img: { type: String, default: "userIMG.jpg" },
            regdate: { type: Date, default: Date.now },
			items: [{
				item: String,
                descr: String,
                score: String,
                ref: String,
                img: String,
				date: { type: Date, default: Date.now }
				}] 	
			});
			
			
module.exports = {
	getUserItemsModel: function() {
		return connection.model("userItems", userItemsSchema);
	}
};



