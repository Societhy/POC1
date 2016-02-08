var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var http = require('http');
var finalhandler = require('finalhandler');
var io = require('socket.io');
var serveStatic = require('serve-static');
var database = require('./mongoTest.js');

var url = "mongodb://localhost:27017/test";

var server = {
	start: function(config, done) {
		var serve = serveStatic(config.build.directory);

		var server = http.createServer(function(req, res) {
			var done = finalhandler(req, res);
			serve(req, res, done);
		});
		MongoClient.connect(url, function(err, db) {
			if (err) {
				console.error("Unable to connect to db");
				return ;
			}
			console.log("Connected to db.");

            database.fillDatabase(db);
            database.getOrgaByName(db, 'croix rouge', function(orga) {
                console.log(orga);
            });
            database.getUserByAddress(db, '0x00000004', function(user) {
                console.log(user);
            });

			console.log("Serving app on port 8080...bite");

			io = io(server);

			io.on('connection', function(socket){
				socket.on('event', function(data){});
				socket.on('disconnect', function(){})
				socket.emit('userData', 'met ton nom', 'conard');
			});

			server.listen(8080);
			done();
		});
	}
};

module.exports = server;
