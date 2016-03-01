/**
 * Created by kod1 on 2/26/16.
 */
$( document ).ready(function() {

    var angle  = 180;
    $("li.togglable").on('click', function () {
        $(this).children(".dropdown").toggle();
    if($(this).children(".dropdown").toggleClass('dropdownEn'))
        if (angle == 270)
            angle = 0;
        else
            angle = 270;

        $(this).children("a").children("i").css({'-webkit-transform' : 'rotate('+angle+'deg)',
            '-moz-transform' : 'rotate('+angle+'deg)',
            '-ms-transform' : 'rotate('+angle+'deg)',
            'transform' : 'rotate('+angle+'deg)'});
    });
});
