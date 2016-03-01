/**
 * Created by kod1 on 2/26/16.
 */
$( document ).ready(function() {

    var angle  = 180;
    $("li.togglable").on('click', function () {
        $(this).children(".dropdown").toggle();
    $(this).toggleClass('dropdownEn');
    });
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    var date = new Date();
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    console.log(day, monthNames[monthIndex], year);
});
