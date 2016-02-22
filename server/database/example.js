var user = require('./user');

// USAGE: ADD NEW USER
exports.addUser = function() {
    var addr = '0x' + (function co(lor) {
        return (lor += [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 16)]) && (lor.length == 8) ? lor : co(lor);
    })('');
    user.addUser(addr, function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log('User added');
    }, {
        firstname: addr,
        lastname: addr,
        nickname: addr,
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

// USAGE: FILL USER DB
exports.fillUserDb = function() {
    for (var i = 0; i < 20; i++) {
        var addr = '0x' + (function co(lor) {
            return (lor += [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 16)]) && (lor.length == 8) ? lor : co(lor);
        })('');
        user.addUser(addr, function(ret) {
            if (!ret.status)
                console.log(ret.message);
            else
                console.log('User well added');
        }, {
            firstname: addr,
            lastname: addr,
            nickname: addr,
            mail: 'test@test.com'
        });
    }
};

// USAGE: ADD NEW ORGA
exports.addOrga = function() {
    var addr = '0x' + (function co(lor) {
        return (lor += [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 16)]) && (lor.length == 8) ? lor : co(lor);
    })('');
    orga.addOrga(addr, function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log('Orga added');
    }, {
        name: addr
    });
};

// USAGE: GET ORGA BY ADDRESS
exports.getOrga = function() {
    orga.getOrga("0x05d4e538", function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.message);
    });
};

exports.changeABI = function() {
    orga.changeABI("0x05d4e538", {
        name: "New ABI LOL",
        type: "function",
        inputs: [{
            name: 'a',
            type: 'uint32'
        }, ],
        outputs: [{
            name: 'd',
            type: 'uint32'
        }, ]
    }, function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.message);
    });
};

exports.addMemberAddress = function() {
    orga.addMemberAddress("0x05d4e538", "0x5b18e694", function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.message);
    });
};

exports.addProjectAddress = function() {
    orga.addProjectAddress("0x05d4e538", "testProject", function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.message);
    });
};

exports.addSubOrga = function() {
    // TODO: define how is passed a suborga
};

exports.addTransaction = function() {
    orga.addTransaction("0x05d4e538", {
        hash: 0xF43A2E5C,
        date: (new Date()).toJSON(),
        from: "0x5b18e694",
        to: "0x05d4e538",
        amount: 2
    }, function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.message);
    });
};

exports.addActuality = function() {
    orga.addActuality("0x05d4e538", "Nous, c'est cool!", function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.message);
    });
};

exports.addFile = function() {
    orga.addFile("0x05d4e538", "TOUT PLEIN DE DATA DE FICHIER", function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.message);
    });
};

// USAGE: FILL ORGA DB
exports.fillOrgaDb = function() {
    for (var i = 0; i < 20; i++) {
        var addr = '0x' + (function co(lor) {
            return (lor += [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 16)]) && (lor.length == 8) ? lor : co(lor);
        })('');
        orga.addOrga(addr, function(ret) {
            if (!ret.status)
                console.log(ret.message);
            else
                console.log('Orga added');
        }, {
            name: addr
        });
    }
};
