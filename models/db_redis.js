
var redis = require('redis');
var client = redis.createClient();

var redisUserTask = {}

client.on('connect', function() {
    console.log('Redis connection: established.');
});

module.exports = client;
