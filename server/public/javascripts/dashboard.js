/**
 * Created by kod1 on 2/26/16.
 */
$( document ).ready(function() {

    var angle  = 180;
    $("li.togglable").on('click', function () {
        $(this).children("div").toggle();
        if (angle == 180)
            angle = 0;
        else
            angle = 180;

        $(this).children("a").children("div").css({'-webkit-transform' : 'rotate('+angle+'deg)',
            '-moz-transform' : 'rotate('+angle+'deg)',
            '-ms-transform' : 'rotate('+angle+'deg)',
            'transform' : 'rotate('+angle+'deg)'});
    });
});
