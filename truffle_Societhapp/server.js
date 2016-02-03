var http = require('http');
var finalhandler = require('finalhandler');
var io = require('socket.io')(http);
var serveStatic = require('serve-static');

var server = {
    start: function(config, done) {
	var serve = serveStatic(config.build.directory);

	var server = http.createServer(function(req, res) {
	    var done = finalhandler(req, res);
	    serve(req, res, done);
	});

	server.listen(8080);
	console.log("Serving app on port 8080...bite");
	done();
    }
};

module.exports = server;
