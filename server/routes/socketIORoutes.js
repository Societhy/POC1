/**
 * Created by grout_r on 17/02/16.
 */

var path = require('path');
var ss = require('socket.io-stream');
var fs = require('fs');

// init socketio
global.io.on('connection', function (socket) {

    //emit
    socket.emit('news', { hello: 'world' });

    //receive
    socket.on('my other event', function (data) {
        console.log(data);
    });

    socket.on('updateppic', function (data) {
       console.log(data);
    });

    //files
    ss(socket).on("userimg", function (stream, data) {
        var buff;
        stream.on('data', function (lel) {
            buff += lel;
            //console.log(buff);
        });
        stream.on('end', function() {
            console.log(buff);
        });
    });
});