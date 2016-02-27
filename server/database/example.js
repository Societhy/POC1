var user = require('./user');
var orga = require('./orga');
var proj = require('./project');

/*
██    ██ ███████ ███████ ██████
██    ██ ██      ██      ██   ██
██    ██ ███████ █████   ██████
██    ██      ██ ██      ██   ██
██████  ███████ ███████ ██   ██
*/

// 'USAGE': ADD NEW USER
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
        'firstname': addr,
        'lastname': addr,
        'nickname': addr,
        'mail': 'test@test.com'
    });
};

// 'USAGE': GET A USER BY AN ADDRESS
exports.getUser = function() {
    user.getUser("0x5b18e694", function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.object);
    });
};

exports.getAllUsers = function() {
    user.getAllUsers(function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.message, ret.object);
    });
};

exports.getUserByOrga = function () {
    user.getUserByOrga("0x6acd520f", function (ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.message, ret.object);
    });
};

// 'USAGE': ADD AN ADDRESS TO ADDRESS LIST
exports.userAddAddress = function() {
    user.addAddress("0x5b18e694", "0x5b18e694", function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.object.addresses);
    });
};

// 'USAGE': CAHNGE USER FIRSTNAME
exports.userChangeFirstName = function() {
    user.changeFirstName("0x5b18e694", "philippes", function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.object.firstname);
    });
};

// 'USAGE': CHANGE USER LASTNAME
exports.userChangeLastName = function() {
    user.changeLastName("0x5b18e694", "Maurice", function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.object.lastname);
    });
};

// 'USAGE': CHANGE USER NICKNAME
exports.userChangeNickName = function() {
    user.changeNickName("0x5b18e694", "PPPM", function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.object.nickname);
    });
};

// 'USAGE': CHANGE USER MAIL
exports.userChangeMail = function() {
    user.changeMail("0x5b18e694", "philippes@maurice.com", function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.object.mail);
    });
};

// 'USAGE': CHANGE USER PROFILE PIC
exports.userChangeProfilePic = function() {
    user.changeProfilePic("0x5b18e694", "CECI EST LA DATA DE MA PHOTO", function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.object.profilePic);
    });
};

// 'USAGE': ADD AN ORGA ADDRESS TO ORGA LIST
exports.userAddOrgaAddress = function() {
    user.addOrgaAddress("0x5b18e694", "addresse d'orga", function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.object.listOrga);
    });
};

// 'USAGE': ADD A TX TO TX LIST
exports.userAddTransaction = function() {
    user.addTransaction("0x5b18e694", {
        'hash': "434RA23ERA34",
        'date': (new Date()).toJSON(),
        'from': "tete",
        'to': "rg",
        'amount': 10000000
    }, function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.object.transactionHistoric);
    });
};

// 'USAGE': ADD A CONTACT ADDRESS TO CONTACT LIST
exports.userAddContact = function() {
    user.addContact("0x5b18e694", "0x5b18e694", function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.object.contacts);
    });
};

// 'USAGE': FILL USER DB
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
            'firstname': addr,
            'lastname': addr,
            'nickname': addr,
            'mail': 'test@test.com'
        });
    }
};

/*
 ██████  ██████   ██████   █████
██    ██ ██   ██ ██       ██   ██
██    ██ ██████  ██   ███ ███████
██    ██ ██   ██ ██    ██ ██   ██
 ██████  ██   ██  ██████  ██   ██
*/

// 'USAGE': ADD NEW ORGA
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
        'name': addr
    });
};

exports.deleteOrga = function() {
    orga.deleteOrga("0x05d4e538", function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.message, ret.object);
    });
};

exports.getAllOrgas = function() {
    orga.getAllOrgas(function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.message, ret.object);
    });
};

// 'USAGE': GET ORGA BY ADDRESS
exports.getOrga = function() {
    orga.getOrga("0x05d4e538", function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.message);
    });
};

exports.orgaChangeABI = function() {
    orga.changeABI("0x05d4e538", {
        'name': "New ABI LOL",
        'type': "function",
        'inputs': [{
            'name': 'a',
            'type': 'uint32'
        }, ],
        'outputs': [{
            'name': 'd',
            'type': 'uint32'
        }, ]
    }, function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.message);
    });
};

exports.orgaAddMemberAddress = function() {
    orga.addMemberAddress("0x05d4e538", "0x5b18e694", function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.message);
    });
};

exports.orgaAddProjectAddress = function() {
    orga.addProjectAddress("0x05d4e538", "testProject", function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.message);
    });
};

exports.orgaAddSubOrga = function() {
    // 'TODO': define how is passed a suborga
};

exports.orgaAddTransaction = function() {
    orga.addTransaction("0x05d4e538", {
        'hash': 0xF43A2E5C,
        'date': (new Date()).toJSON(),
        'from': "0x5b18e694",
        'to': "0x05d4e538",
        'amount': 2
    }, function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.message);
    });
};

exports.orgaAddActuality = function() {
    orga.addActuality("0x05d4e538", "Nous, c'est cool!", function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.message);
    });
};

exports.orgaAddFile = function() {
    orga.addFile("0x05d4e538", "TOUT PLEIN DE DATA DE FICHIER", function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.message);
    });
};

// 'USAGE': FILL ORGA DB
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
            'name': addr
        });
    }
};

/*
██████  ██████   ██████       ██ ███████  ██████ ████████
██   ██ ██   ██ ██    ██      ██ ██      ██         ██
██████  ██████  ██    ██      ██ █████   ██         ██
██      ██   ██ ██    ██ ██   ██ ██      ██         ██
██      ██   ██  ██████   █████  ███████  ██████    ██
*/

// 'USAGE': ADD NEW PROJECT
exports.addProject = function() {
    var addr = '0x' + (function co(lor) {
        return (lor += [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 16)]) && (lor.length == 8) ? lor : co(lor);
    })('');
    proj.addProject(addr, function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log('Project added');
    }, {
        'name': addr
    });
};

// 'USAGE': GET PROJECT BY ADDRESS
exports.getProject = function() {
    proj.getProject("0xaa33acc9", function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.message, ret.object);
    });
};

// 'USAGE': CHANGE PROJECT NAME
exports.projChangeName = function() {
    proj.changeName("0xaa33acc9", "New proj name", function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.message);
    });
};

// 'USAGE': CHANGE PROJECT DESCRIPTION
exports.projChangeDescription = function() {
    proj.changeDescription("0xaa33acc9", "New descripition olololololololol", function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.message);
    });
};

// 'USAGE': ADD MEMBER ADDRESS
exports.projAddMemberAddress = function() {
    proj.addMemberAddress("0xaa33acc9", "0xa415eaf", function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.message);
    });
};

// 'USAGE': CHANGE PROJECT FUNDRAISING
exports.projChangeFundRaising = function() {
    proj.changeFundRaising("0xaa33acc9", {
        'isFundRaising': true,
        'goal': 120
    }, function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.message);
    });
};

// 'USAGE': ADD REVIEW TO PROJECT
exports.projAddReview = function() {
    proj.addReview("0xaa33acc9", {
        'author': "Grt le magnifaik",
        'review': "C'est vraiment trooop top"
    }, function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.message);
    });
};

// 'USAGE': ADD FILE TO PROJECT
exports.projAddFile = function() {
    proj.addFile("0xaa33acc9", "file data", function(ret) {
        if (!ret.status)
            console.log(ret.message);
        else
            console.log(ret.message);
    });
};
