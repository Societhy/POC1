/**
 * Created by Roman on 09/02/2016.
 */

var address = $('#ethaddr');
var submit = $('#submit_form');
var socket = io.connect('/');
var img64;

function previewFile(){
    var preview = document.querySelector('img'); //selects the query named img
    var file    = document.querySelector('input[type=file]').files[0]; //sames as here
    var reader  = new FileReader();

    reader.onloadend = function () {
        img64 = reader.result;
        preview.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
    } else {
        preview.src = "";
    }
}

previewFile();

submit.click(function(){
    console.log("zizipanpan")
    socket.emit(
      'updateppic',
        {
            addr : address.val(),
            ppic : img64
        }
    );
});
