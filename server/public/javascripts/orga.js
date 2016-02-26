/**
 * Created by Roman on 26/02/2016.
 */

$("#createProject").on('click', function() {
    console.log($('#projectName').val());
    return;
    var socket = io('http://localhost:3000');

    socket.emit('newProject', {name: $('#projectName').val(), desc: $('#projectDesc').val()});
});