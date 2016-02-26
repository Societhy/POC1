var db = require('./db');
var USER = 'users';

exports.addUser = function(userAddress, finalCallback, userInfos) {
    var user = {
        'addresses': [userAddress],
        'firstname': userInfos && userInfos.firstname ? userInfos.firstname : "",
        'lastname': userInfos && userInfos.lastname ? userInfos.lastname : "",
        'nickname': userInfos && userInfos.nickname ? userInfos.nickname : "",
        'mail': userInfos && userInfos.mail ? userInfos.mail : "",
        'profilePic': userInfos && userInfos.profilePic ? userInfos.profilePic : "",
        'listOrga': userInfos && userInfos.listOrga ? userInfos.listOrga : [],
        'transactionHistoric': userInfos && userInfos.transactionHistoric ? userInfos.transactionHistoric : [],
        'contacts': userInfos && userInfos.contacts ? userInfos.contacts : []
    };
    notExistsUser(user, function(user, finalCallback) {
        var ret = {
            'status': false,
            'message': "",
            'object': null
        };
        db.get().collection(USER).insertOne(user, function(err, user) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                ret.status = true;
                ret.message = "User added.";
                ret.object = user;
                finalCallback(ret);
            }
        });
    }, finalCallback);
};

exports.getAllUsers = function(finalCallback) {
    var ret = {
        'status': false,
        'message': "",
        'object': null
    };
    db.get().collection(USER).find({}, {
        '_id': false
    }).toArray(function(err, docs) {
        if (err) {
            ret.message = err.message;
            finalCallback(ret);
        } else {
            ret.status = true;
            ret.message = "List of users.";
            ret.object = docs;
            finalCallback(ret);
        }
    });
};

exports.getUser = function(userAddress, finalCallback) {
    var user = {
        'addresses': [userAddress]
    };
    existsUser(user, function(user, finalCallback) {
        var ret = {
            'status': true,
            'message': "Found user.",
            'object': user
        };
        finalCallback(ret);
    }, finalCallback);
};

exports.getUserByOrga = function (orgaAddress, finalCallback) {
    var ret = {
        'status': false,
        'message': "",
        'object': null
    };
    db.get().collection(USER).find({'listOrga': orgaAddress}, {
        '_id': false,
    }).toArray(function(err, docs) {
        if (err) {
            ret.message = err.message;
            finalCallback(ret);
        } else {
            ret.status = true;
            ret.message = "List of users.";
            ret.object = docs;
            finalCallback(ret);
        }
    });
};

exports.getUserByLastName = function (searchLastName, finalCallback) {
    var ret = {
        'status': false,
        'message': "",
        'object': null
    };
    db.get().collection(USER).find({'lastname': searchLastName}, {
        '_id': false,
    }).toArray(function(err, docs) {
        if (err) {
            ret.message = err.message;
            finalCallback(ret);
        } else {
            ret.status = true;
            ret.message = "List of users";
            ret.object = docs;
            finalCallback(ret);
        }
    });
};

exports.getUserByFirstName = function (searchFirstName, finalCallback) {
    var ret = {
        'status': false,
        'message': "",
        'object': null
    };
    db.get().collection(USER).find({'firstname': searchFirstName}, {
        '_id': false,
    }).toArray(function(err, docs) {
        if (err) {
            ret.message = err.message;
            finalCallback(ret);
        } else {
            ret.status = true;
            ret.message = "List of users";
            ret.object = docs;
            finalCallback(ret);
        }
    });
};

exports.addAddress = function(userAddress, addrToAdd, finalCallback) {
    var user = {
        'addresses': [userAddress]
    };
    existsUser(user, function(user, finalCallback) {
        var ret = {
            'status': false,
            'message': "",
            'object': null
        };
        db.get().collection(USER).updateOne(user, {
            $push: {
                'addresses': addrToAdd
            }
        }, function(err, result) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                ret.status = true;
                ret.message = "New address added.";
                ret.object = user;
                finalCallback(ret);
            }
        });
    }, finalCallback);
};

exports.changeFirstName = function(userAddress, newFN, finalCallback) {
    var user = {
        'addresses': [userAddress]
    };
    existsUser(user, function(user, finalCallback) {
        var ret = {
            'status': false,
            'message': "",
            'object': null
        };
        db.get().collection(USER).updateOne(user, {
            $set: {
                'firstname': newFN
            }
        }, function(err, result) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                ret.status = true;
                ret.message = "Firstname changed.";
                ret.object = user;
                finalCallback(ret);
            }
        });
    }, finalCallback);
};

exports.changeLastName = function(userAddress, newLN, finalCallback) {
    var user = {
        'addresses': [userAddress]
    };
    existsUser(user, function(user, finalCallback) {
        var ret = {
            'status': false,
            'message': "",
            'object': null
        };
        db.get().collection(USER).updateOne(user, {
            $set: {
                'lastname': newLN
            }
        }, function(err, result) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                ret.status = true;
                ret.message = "Lastname changed.";
                ret.object = user;
                finalCallback(ret);
            }
        });
    }, finalCallback);
};

exports.changeNickName = function(userAddress, newNM, finalCallback) {
    var user = {
        'addresses': [userAddress]
    };
    existsUser(user, function(user, finalCallback) {
        var ret = {
            'status': false,
            'message': "",
            'object': null
        };
        db.get().collection(USER).updateOne(user, {
            $set: {
                'nickname': newNM
            }
        }, function(err, result) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                ret.status = true;
                ret.message = "Nickname changed.";
                ret.object = user;
                finalCallback(ret);
            }
        });
    }, finalCallback);
};

exports.changeMail = function(userAddress, newMail, finalCallback) {
    var user = {
        'addresses': [userAddress]
    };
    existsUser(user, function(user, finalCallback) {
        var ret = {
            'status': false,
            'message': "",
            'object': null
        };
        db.get().collection(USER).updateOne(user, {
            $set: {
                'mail': newMail
            }
        }, function(err, result) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                ret.status = true;
                ret.message = "Mail changed.";
                ret.object = user;
                finalCallback(ret);
            }
        });
    }, finalCallback);
};

exports.changeProfilePic = function(userAddress, newPicData, finalCallback) {
    var user = {
        'addresses': [userAddress]
    };
    existsUser(user, function(user, finalCallback) {
        var ret = {
            'status': false,
            'message': "",
            'object': null
        };
        db.get().collection(USER).updateOne(user, {
            $set: {
                'profilePic': newPicData
            }
        }, function(err, result) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                ret.status = true;
                ret.message = "Profile picture changed.";
                ret.object = user;
                finalCallback(ret);
            }
        });
    }, finalCallback);
};

exports.addOrgaAddress = function(userAddress, orgaAddress, finalCallback) {
    var user = {
        'addresses': [userAddress]
    };
    existsUser(user, function(user, finalCallback) {
        var ret = {
            'status': false,
            'message': "",
            'object': null
        };
        db.get().collection(USER).updateOne(user, {
            $push: {
                'listOrga': orgaAddress
            }
        }, function(err, result) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                ret.status = true;
                ret.message = "New orga added.";
                ret.object = user;
                finalCallback(ret);
            }
        });
    }, finalCallback);
};

exports.addTransaction = function(userAddress, transaction, finalCallback) {
    var user = {
        'addresses': [userAddress]
    };
    existsUser(user, function(user, finalCallback) {
        var ret = {
            'status': false,
            'message': "",
            'object': null
        };
        db.get().collection(USER).updateOne(user, {
            $push: {
                'transactionHistoric': transaction
            }
        }, function(err, result) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                ret.status = true;
                ret.message = "New transaction added.";
                ret.object = user;
                finalCallback(ret);
            }
        });
    }, finalCallback);
};

exports.addContact = function(userAddress, userToAdd, finalCallback) {
    var user = {
        'addresses': [userAddress]
    };
    var contact = {
        'addresses': [userToAdd]
    };
    existsUser(user, function(user, finalCallback) {
        var ret = {
            'status': false,
            'message': "",
            'object': null
        };
        db.get().collection(USER).updateOne(user, {
            $push: {
                'contacts': userToAdd
            }
        }, function(err, result) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                ret.status = true;
                ret.message = "New contact added.";
                ret.object = user;
                finalCallback(ret);
            }
        });
    }, finalCallback);
};

function existsUser(user, doExists, finalCallback) {
    var ret = {
        'status': false,
        'message': "",
        'object': null
    };

    if (user.addresses[0] === "") {
        ret.message = "Address is empty.";
        finalCallback(ret);
    } else {
        var cursor = db.get().collection(USER).find({
            'addresses': new RegExp(["^", user.addresses[0], "$"].join(""), "i")
        });

        cursor.hasNext(function(err, user) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                cursor.next(function(err, user) {
                    if (err) {
                        ret.message = "User doesn't exists.";
                        finalCallback(ret);
                    } else {
                        doExists(user, finalCallback);
                    }
                });
            }
        });
    }
}

function notExistsUser(searchUser, doNotExists, finalCallback) {
    var ret = {
        'status': false,
        'message': "",
        'object': null
    };

    if (searchUser.addresses[0] === "") {
        ret.message = "Address is empty.";
        finalCallback(ret);
    } else {
        var cursor = db.get().collection(USER).find({
            'addresses': new RegExp(["^", searchUser.addresses[0], "$"].join(""), "i")
        });

        cursor.hasNext(function(err, user) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                cursor.next(function(err, user) {
                    if (err) {
                        doNotExists(searchUser, finalCallback);
                    } else {
                        ret.message = "User already exists.";
                        finalCallback(ret);
                    }
                });
            }
        });
    }
}
