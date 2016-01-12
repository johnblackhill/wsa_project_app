var expect = require("chai").expect;
var request = require("request");

console.log("Tests...");

describe("Login and tasks:", function() {
    
    var url_tasks = "http://localhost:3000/tasks/cayetano";
    var url_login = "http://localhost:3000/users/login";
    
    describe("Cayetano's tasks", function() {
        
        it("return status 200 OK", function(done) {
            request(url_tasks, function(err, response, body) {
                expect(response.statusCode).to.equal(200);   
                done();
            });
        });
        
        it("it contains 'cayetano's tasks' string", function(done) {
            request(url_tasks, function(err, response, body) {
                expect(body).to.contain("cayetano's tasks");
                done();
            });
        });
                
        it("login succesful!", function(done) {
            request.post({url: url_login, form: {username : 'cayetano', password : 'lp9900'}}, function (error, response, body) {
                sessId = (response.headers['set-cookie'][0]);
                expect(sessId).to.contain("sessionId");
                done();
            });
        });
        
        it("cayetano's tasks when logged", function(done) {            
            options = {
                url: url_tasks,
                headers: {
                    cookie: sessId,
                    host: 'localhost:3000'
                    }
            };
    
            request.get(options, function (error, response, body) {
                expect(body).to.contain('<form action="/tasks/newtask" method="post">');
                done();
            });
        });   
    });
});



