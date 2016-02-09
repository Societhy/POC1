socket.on('userData', function (fName, lName) {
    var firstName_elem = document.getElementById("firstName");
    var lastName_elem = document.getElementById("lastName");

    firstName_elem.innerHTML = fName;
    lastName_elem.innerHTML = lName;
});
