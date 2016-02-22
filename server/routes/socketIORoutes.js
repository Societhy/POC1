/**
 * Created by grout_r on 17/02/16.
 */

var path = require('path');
var ss =    require('socket.io-stream');
var fs = require('fs');
var user = require('../database/user');

// init socketio
global.io.on('connection', function (socket) {

    ////emit
    //socket.emit('news', { hello: 'world' });
    //
    ////receive
    //socket.on('my other event', function (data) {
    //    console.log(data);
    //});

    socket.on('updateppic', function (data) {
        setTimeout(function()
        {
            user.changeProfilePic(data.addr, data.ppic, function(ret) {
                if (ret.status)
                {
                    socket.emit('OK', ret.message);
                }
                else
                {
                    socket.emit("KO", ret.message);
                }
            })
        }, 3000);
    });

    //files
    ss(socket).on("userimg", function (stream, data) {
        var buff;
        stream.on('data', function (lel) {
            buff += lel;
        });
        stream.on('end', function() {
            console.log(buff);
        });
    });
});
