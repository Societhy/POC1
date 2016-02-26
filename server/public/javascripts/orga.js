/**
 * Created by Roman on 26/02/2016.
 */

var socket = io('http://localhost:3000');
socket.emit('newProject', {my: 'data'});