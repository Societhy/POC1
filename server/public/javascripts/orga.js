/**
 * Created by Roman on 26/02/2016.
 */

$("#createProject").on('click', function() {
    console.log($('#projectName').val());
    var socket = io('http://localhost:3000');
    // TODO: GERER L'ADDR
    var addr = '0x' + (function co(lor) {
            return (lor += [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 16)]) && (lor.length == 8) ? lor : co(lor);
        })('');

    socket.emit('newProject', {name: $('#projectName').val(), desc: $('#projectDesc').val(), addr:addr});
});