var db = require('./db');
var ORGA = "orga";

exports.addOrga = function(orgaAddress, finalCallback, orgaInfos) {
    var orga = {
        address: orgaAddress,
        name: orgaInfos && orgaInfos.name ? orgaInfos.name : "",
        created: orgaInfos && orgaInfos.created ? orgaInfos.created : {},
        ABI: orgaInfos && orgaInfos.ABI ? orgaInfos.ABI : {},
        binary: orgaInfos && orgaInfos.binary ? orgaInfos.binary : "",
        memberList: orgaInfos && orgaInfos.memberList ? orgaInfos.memberList : [],
        projects: orgaInfos && orgaInfos.projects ? orgaInfos.projects : [],
        subOrga: orgaInfos && orgaInfos.subOrga ? orgaInfos.subOrga : [],
        transactionHistoric: orgaInfos && orgaInfos.transactionHistoric ? orgaInfos.transactionHistoric : [],
        actualities: orgaInfos && orgaInfos.actualities ? orgaInfos.actualities : [],
        files: orgaInfos && orgaInfos.files ? orgaInfos.files : []
    };
    notExistsOrga(orga, function(orga, finalCallback) {
        var ret = {
            status: false,
            message: "",
            object: null
        };
        db.get().collection(ORGA).insertOne(orga, function(err, orga) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                ret.status = true;
                ret.message = "Organisation added.";
                ret.object = orga;
                finalCallback(ret);
            }
        });
    }, finalCallback);
};

exports.getOrga = function(orgaAddress, finalCallback) {
    var orga = {
        address: orgaAddress
    };
    existsOrga(orga, function(orga, finalCallback) {
        var ret = {
            status: true,
            message: "Found Organisation.",
            object: orga
        };
        finalCallback(ret);
    }, finalCallback);
};

exports.getAllOrgas = function(finalCallback) {
    var ret = {
        status: false,
        message: "",
        object: null
    };
    db.get().collection(ORGA).find({}, {
        '_id': false,
        'name': true,
        'address': true
    }).toArray(function(err, docs) {
        if (err) {
            ret.message = err.message;
            finalCallback(ret);
        } else {
            ret.status = true;
            ret.message = "List of organisation";
            ret.object = docs;
            finalCallback(ret);
        }
    });
};

exports.changeABI = function(orgaAddress, newABI, finalCallback) {
    var orga = {
        address: orgaAddress
    };

    existsOrga(orga, function(orga, finalCallback) {
        var ret = {
            status: false,
            message: "",
            object: null
        };
        db.get().collection(ORGA).updateOne(orga, {
            $set: {
                ABI: newABI
            }
        }, function(err, result) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                ret.status = true;
                ret.message = "ABI changed.";
                ret.object = orga;
                finalCallback(ret);
            }
        });
    }, finalCallback);
};

exports.changeBinary = function(orgaAddress, newBinary, finalCallback) {
    var orga = {
        address: orgaAddress
    };

    existsOrga(orga, function(orga, finalCallback) {
        var ret = {
            status: false,
            message: "",
            object: null
        };
        db.get().collection(ORGA).updateOne(orga, {
            $set: {
                binary: newBinary
            }
        }, function(err, result) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                ret.status = true;
                ret.message = "Binary changed.";
                ret.object = orga;
                finalCallback(ret);
            }
        });
    }, finalCallback);
};

exports.addMemberAddress = function(orgaAddress, userAddress, finalCallback) {
    var orga = {
        address: orgaAddress
    };
    existsOrga(orga, function(orga, finalCallback) {
        var ret = {
            status: false,
            message: "",
            object: null
        };
        db.get().collection(ORGA).updateOne(orga, {
            $push: {
                memberList: userAddress
            }
        }, function(err, result) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                ret.status = true;
                ret.message = "Member address added.";
                ret.object = orga;
                finalCallback(ret);
            }
        });
    }, finalCallback);
};

exports.addProjectAddress = function(orgaAddress, projAddress, finalCallback) {
    var orga = {
        address: orgaAddress
    };
    existsOrga(orga, function(orga, finalCallback) {
        var ret = {
            status: false,
            message: "",
            object: null
        };
        db.get().collection(ORGA).updateOne(orga, {
            $push: {
                projects: projAddress
            }
        }, function(err, result) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                ret.status = true;
                ret.message = "Project address added.";
                ret.object = orga;
                finalCallback(ret);
            }
        });
    }, finalCallback);
};

exports.addSubOrga = function(orgaAddress, subOrga, finalCallback) {
    var orga = {
        address: orgaAddress
    };
    existsOrga(orga, function(orga, finalCallback) {
        var ret = {
            status: false,
            message: "",
            object: null
        };
        db.get().collection(ORGA).updateOne(orga, {
            $push: {
                subOrga: subOrga
            }
        }, function(err, result) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                ret.status = true;
                ret.message = "SubOrganisation added.";
                ret.object = orga;
                finalCallback(ret);
            }
        });
    }, finalCallback);
};

exports.addTransaction = function(orgaAddress, transaction, finalCallback) {
    var orga = {
        address: orgaAddress
    };
    existsOrga(orga, function(orga, finalCallback) {
        var ret = {
            status: false,
            message: "",
            object: null
        };
        db.get().collection(ORGA).updateOne(orga, {
            $push: {
                transactionHistoric: transaction
            }
        }, function(err, result) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                ret.status = true;
                ret.message = "Transaction added.";
                ret.object = orga;
                finalCallback(ret);
            }
        });
    }, finalCallback);
};

exports.addActuality = function(orgaAddress, actuality, finalCallback) {
    var orga = {
        address: orgaAddress
    };
    existsOrga(orga, function(orga, finalCallback) {
        var ret = {
            status: false,
            message: "",
            object: null
        };
        db.get().collection(ORGA).updateOne(orga, {
            $push: {
                actualities: actuality
            }
        }, function(err, result) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                ret.status = true;
                ret.message = "Actuality added.";
                ret.object = orga;
                finalCallback(ret);
            }
        });
    }, finalCallback);
};

exports.addFile = function(orgaAddress, fileData, finalCallback) {
    var orga = {
        address: orgaAddress
    };
    existsOrga(orga, function(orga, finalCallback) {
        var ret = {
            status: false,
            message: "",
            object: null
        };
        db.get().collection(ORGA).updateOne(orga, {
            $push: {
                files: fileData
            }
        }, function(err, result) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                ret.status = true;
                ret.message = "File added.";
                ret.object = orga;
                finalCallback(ret);
            }
        });
    }, finalCallback);
};

function existsOrga(orga, doExists, finalCallback) {
    var ret = {
        status: false,
        message: "",
        object: null
    };

    if (orga.address === "") {
        ret.message = "Address is empty.";
        finalCallback(ret);
    } else {
        var cursor = db.get().collection(ORGA).find({
            'address': new RegExp(["^", orga.address, "$"].join(""), "i")
        });

        cursor.hasNext(function(err, orga) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                cursor.next(function(err, orga) {
                    if (err) {
                        ret.message = "Organisation doesn't exists.";
                        finalCallback(ret);
                    } else {
                        doExists(orga, finalCallback);
                    }
                });
            }
        });
    }
}

function notExistsOrga(searchOrga, doNotExists, finalCallback) {
    var ret = {
        status: false,
        message: "",
        object: null
    };

    if (searchOrga.address === "") {
        ret.message = "Address is empty.";
        finalCallback(ret);
    } else {
        var cursor = db.get().collection(ORGA).find({
            'address': new RegExp(["^", searchOrga.address, "$"].join(""), "i")
        });

        cursor.hasNext(function(err, orga) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                cursor.next(function(err, orga) {
                    if (err) {
                        doNotExists(searchOrga, finalCallback);
                    } else {
                        ret.message = "Organisation already exists.";
                        finalCallback(ret);
                    }
                });
            }
        });
    }
}
