/**
 * Created by grout_r on 17/02/16.
 */

// init socketio
global.io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});
