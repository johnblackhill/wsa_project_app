var should = require ("chai").should;
//var should = chai.should();
var request = require("request");

console.log("Chai Tests...");

describe ("Index and strings:", function(){
    
    var url_index = "http://localhost:3000";
    var url_objects = "http://localhost:3000/objects/obijuan";
    var url_error = "http://localhost:3000/error";
    var url_login = "http://localhost:3000/users/login";
    
    describe ("Index tests", function() {
        
        it("return status 200 OK", function(done){
            request(url_index, function(err, response, body){
                statusCode.should.equal(200);
                done();
            });                             
        });
        
        it("it contains 'WSA Project' string", function(done){
           request(url_index, function(err, response, body){
               body.should.contain("WSA Project");
               done();
           }); 
        });
        
        it("Not able to add objects if not logged in", function(done){
           request(url_objects, function(err, response, body){
              body.should.not.contain("add object");
           });
           done(); 
        });
        
        it("Successful Login", function(done){
           request.post({url: url_login, form:{username: 'obijuan', password: kenobi}}, function (error, response, body){
              session = (response.headers['set-cookie'][0]);
              session.should.contain("sessionId");
              done();
           }); 
        });
        
        
        
    });
});