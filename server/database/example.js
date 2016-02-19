var user = require('./newUser');

// USAGE: ADD NEW USER
exports.addUser = function(i) {
    user.addUser(i, function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log('User added');
    }, {
        firstname: i,
        lastname: i,
        nickname: i,
        mail: 'test@test.com'
    });
};

// USAGE: GET A USER BY AN ADDRESS
exports.getUser = function() {
    user.getUser("1", function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.object);
    });
};

// USAGE: ADD AN ADDRESS TO ADDRESS LIST
exports.addAddress = function() {
    user.addAddress("1", "13", function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.object.addresses);
    });
};

// USAGE: CAHNGE USER FIRSTNAME
exports.changeFirstName = function() {
    user.changeFirstName("1", "philippes", function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.object.firstname);
    });
};

// USAGE: CHANGE USER LASTNAME
exports.changeLastName = function() {
    user.changeLastName("1", "Maurice", function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.object.lastname);
    });
};

// USAGE: CHANGE USER NICKNAME
exports.changeNickName = function() {
    user.changeNickName("1", "PPPM", function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.object.nickname);
    });
};

// USAGE: CHANGE USER MAIL
exports.changeMail = function() {
    user.changeMail("1", "philippes@maurice.com", function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.object.mail);
    });
};

// USAGE: CHANGE USER PROFILE PIC
exports.changeProfilePic = function() {
    user.changeProfilePic("1", "CECI EST LA DATA DE MA PHOTO", function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.object.profilePic);
    });
};

// USAGE: ADD AN ORGA ADDRESS TO ORGA LIST
exports.addOrgaAddress = function() {
    user.addOrgaAddress("1", "addresse d'orga", function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.object.listOrga);
    });
};

// USAGE: ADD A TX TO TX LIST
exports.addTransaction = function() {
    user.addTransaction("1", {
        hash: "434RA23ERA34",
        date: 18 / 02 / 2016,
        from: "tete",
        to: "rg",
        amount: 10000000
    }, function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.object.transactionHistoric);
    });
};

// USAGE: ADD A CONTACT ADDRESS TO CONTACT LIST
exports.addContact = function() {
    user.addContact("1", "2", function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.object.contacts);
    });
};

// USAGE: FILL DB
exports.fillUserDb = function() {
    for (var i = 0; i < 20; i++) {
        user.addUser(i, function(ret) {
            if (!ret.status)
                console.log(ret.message);
            else
                console.log('User well added');
        }, {
            firstname: i,
            lastname: i,
            nickname: i,
            mail: 'test@test.com'
        });
    }
};
