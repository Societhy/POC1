var http = require('http');
var finalhandler = require('finalhandler');
var io = require('socket.io')(http);
var serveStatic = require('serve-static');
var db = require('./mongoTest.js');

var server = {
    start: function(config, done) {
	var serve = serveStatic(config.build.directory);

	var server = http.createServer(function(req, res) {
	    var done = finalhandler(req, res);
	    serve(req, res, done);
	});

	console.log("Serving app on port 8080...bite");

	var io = require('socket.io')(server);
	// db.insertNewUser(db, "lala");    TO DECOMENT

	// io.on('connection', function(socket){
	//     socket.on('event', function(data){});
	//     socket.on('disconnect', function(){})
	// });

	io.on('connection', function(socket){
	    socket.emit('userData', 'met ton nom', 'conard');   
	});

	server.listen(8080);
	done();
    }
};

module.exports = server;
