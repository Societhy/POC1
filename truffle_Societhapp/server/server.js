var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var http = require('http');
var finalhandler = require('finalhandler');
//var io = require('socket.io')(http);
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
			var newUser = {"address":"0xa51c9ea5", "firstname":"tata", "lastname":"test", "mail":"tata@test.com", "photo":null, "listOrga":[], "transHisto":[], "infos":[]};
			var newOrga = {"name":"Medecins sans frontiere", "memberList":[], "transHisto":[], "actualities":[]};

			database.existUser(db, newUser, database.insertNewUser);
			database.existOrga(db, newOrga, database.insertNewOrga);
			database.userJoinOrga(db, newUser, newOrga);

			console.log("Serving app on port 8080...bite");

			var io = require('socket.io')(server);

			io.on('connection', function(socket){
				socket.on('event', function(data){});
				socket.on('disconnect', function(){})
			});

			io.on('connection', function(socket){
				socket.emit('userData', 'met ton nom', 'conard');
			});
			server.listen(8080);
			done();
		});
	}
};
    
module.exports = server;
