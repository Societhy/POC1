/**
 * Created by kod1 on 2/26/16.
 */
$( document ).ready(function() {

    var angle  = 180;
    $("li.togglable").on('click', function () {
        $(this).children(".dropdown").toggle();
    $(this).toggleClass('dropdownEn');
    });
});
