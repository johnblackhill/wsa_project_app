var expect = require ("chai").expect;
var request = require("request");

console.log("Chai Tests...");

describe ("Index and strings ->", function(){
    
    var url_index = "http://localhost:3000";
    var url_objects = "http://localhost:3000/objects/obijuan";
    var url_error = "http://localhost:3000/error";
    var url_login = "http://localhost:3000/users/login";
    var url_register = "http://localhost:3000/users/register";
    
    describe ("Main Tests ->", function() {
        
        it("Connection can be stablished with Node.", function(done){
            request(url_index, function(err, response, body){
                expect(response.statusCode).to.equal(200);
                done();
            });                             
        });
        
        it("Index Page Correct Load", function(done){
           request(url_index, function(err, response, body){
               expect(body).to.contain("laborum");
               done();
           }); 
        });
        
        
        it("Register Page Correct Load", function(done){
           request(url_register, function(err, response, body){
               expect(body).to.contain("Welcome Aboard!");
               done();
           }); 
        });
                
        it("Not able to add objects if not logged in", function(done){
           request(url_objects, function(err, response, body){
              expect(body).to.not.contain("add object");
           });
           done(); 
        });
        
        // Login Tests
        it("Successful Login", function(done) {
            request.post({url: url_login, form: {username : 'obijuan', password : 'kenobi'}}, function (error, response, body) {
                sessId = (response.headers['set-cookie'][0]);
                expect(sessId).to.contain("sessionId");
                done();
            });
        });
        
        it("Erroneous Login", function(done) {
            request.post({url: url_login, form: {username : 'nonexistentuser', password : 'notapassword'}}, function (error, response, body) {
                expect(body).to.contain("Username or password incorrect");
                done();
            });
        });
        
        
        
    });
});