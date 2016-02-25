var db = require('./db');
var PROJ = "projects";

exports.addProject = function(projAddress, finalCallback, projInfos) {
    var project = {
        'address': projAddress,
        'name': projInfos && projInfos.name ? projInfos.name : "",
        'orgaAddress': projInfos && projInfos.orgaAddress ? projInfos.orgaAddress : "",
        'description': projInfos && projInfos.description ? projInfos.description : "",
        'memberList': projInfos && projInfos.memberList ? projInfos.memberList : [],
        'fundRaising': projInfos && projInfos.fundRaising ? projInfos.fundRaising : {},
        'review': projInfos && projInfos.review ? projInfos.review : [],
        'files': projInfos && projInfos.files ? projInfos.files : [],
    };
    notExistsProj(project, function(proj, finalCallback) {
        var ret = {
            'status': false,
            'message': "",
            'object': null
        };
        db.get().collection(PROJ).insertOne(proj, function(err, proj) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                ret.status = true;
                ret.message = "Project added.";
                ret.object = proj;
                finalCallback(ret);
            }
        });
    }, finalCallback);
};

exports.getProject = function(projAddress, finalCallback) {
    var project = {
        'address': projAddress
    };
    existsProj(project, function(proj, finalCallback) {
        var ret = {
            'status': true,
            'message': "Found project.",
            'object': proj
        };
        finalCallback(ret);
    }, finalCallback);
};

exports.getAllProjects = function(finalCallback) {
    var ret = {
        'status': false,
        'message': "",
        'object': null
    };
    db.get().collection(PROJ).find({}, {
        '_id': false,
        'name': true,
        'description': true,
        'address': true
    }).toArray(function(err, docs) {
        if (err) {
            ret.message = err.message;
            finalCallback(ret);
        } else {
            ret.status = true;
            ret.message = "List of projects";
            ret.object = docs;
            finalCallback(ret);
        }
    });
};

exports.getProjectsByOrga = function(orgaAddress, finalCallback) {
    var ret = {
        'status': false,
        'message': "",
        'object': null
    };
    db.get().collection(PROJ).find({
        'orgaAddress': orgaAddress
    }, {
        '_id': false,
        'name': true,
        'description': true,
        'address': true
    }).toArray(function(err, docs) {
        if (err) {
            ret.message = err.message;
            finalCallback(ret);
        } else {
            ret.status = true;
            ret.message = "List of projects";
            ret.object = docs;
            finalCallback(ret);
        }
    });
};

exports.changeName = function(projAddress, newName, finalCallback) {
    var project = {
        'address': projAddress
    };
    existsProj(project, function(proj, finalCallback) {
        var ret = {
            'status': false,
            'message': "",
            'object': null
        };
        db.get().collection(PROJ).updateOne(proj, {
            $set: {
                'name': newName
            }
        }, function(err, result) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                ret.status = true;
                ret.message = "Name changed.";
                ret.object = proj;
                finalCallback(ret);
            }
        });
    }, finalCallback);
};

exports.changeDescription = function(projAddress, newDesc, finalCallback) {
    var project = {
        'address': projAddress
    };
    existsProj(project, function(proj, finalCallback) {
        var ret = {
            'status': false,
            'message': "",
            'object': null
        };
        db.get().collection(PROJ).updateOne(proj, {
            $set: {
                'description': newDesc
            }
        }, function(err, result) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                ret.status = true;
                ret.message = "Description changed.";
                ret.object = proj;
                finalCallback(ret);
            }
        });
    }, finalCallback);
};

exports.addMemberAddress = function(projAddress, userAddress, finalCallback) {
    var project = {
        'address': projAddress
    };
    existsProj(project, function(proj, finalCallback) {
        var ret = {
            'status': false,
            'message': "",
            'object': null
        };
        db.get().collection(PROJ).updateOne(proj, {
            $push: {
                'memberList': userAddaress
            }
        }, function(err, result) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                ret.status = true;
                ret.message = "User address added.";
                ret.object = proj;
                finalCallback(ret);
            }
        });
    }, finalCallback);
};

exports.changeFundRaising = function(projAddress, newFundRaising, finalCallback) {
    var project = {
        'address': projAddress
    };
    existsProj(project, function(proj, finalCallback) {
        var ret = {
            'status': false,
            'message': "",
            'object': null
        };
        db.get().collection(PROJ).updateOne(proj, {
            $set: {
                'fundRaising': newFundRaising
            }
        }, function(err, result) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                ret.status = true;
                ret.message = "FundRaising changed.";
                ret.object = proj;
                finalCallback(ret);
            }
        });
    }, finalCallback);
};

exports.addReview = function(projAddress, review, finalCallback) {
    var project = {
        'address': projAddress
    };
    existsProj(project, function(proj, finalCallback) {
        var ret = {
            'status': false,
            'message': "",
            'object': null
        };
        db.get().collection(PROJ).updateOne(proj, {
            $push: {
                'reviews': review
            }
        }, function(err, result) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                ret.status = true;
                ret.message = "Review added.";
                ret.object = proj;
                finalCallback(ret);
            }
        });
    }, finalCallback);
};

exports.addFile = function(projAddress, file, finalCallback) {
    var project = {
        'address': projAddress
    };
    existsProj(project, function(proj, finalCallback) {
        var ret = {
            'status': false,
            'message': "",
            'object': null
        };
        db.get().collection(PROJ).updateOne(proj, {
            $push: {
                'files': file
            }
        }, function(err, result) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                ret.status = true;
                ret.message = "File added.";
                ret.object = proj;
                finalCallback(ret);
            }
        });
    }, finalCallback);
};

function existsProj(proj, doExists, finalCallback) {
    var ret = {
        'status': false,
        'message': "",
        'object': null
    };

    if (proj.address === "") {
        ret.message = "Address is empty.";
        finalCallback(ret);
    } else {
        var cursor = db.get().collection(PROJ).find({
            'address': new RegExp(["^", proj.address, "$"].join(""), "i")
        });

        cursor.hasNext(function(err, proj) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                cursor.next(function(err, proj) {
                    if (err) {
                        ret.message = "Project doesn't exist.";
                        finalCallback(ret);
                    } else {
                        doExists(proj, finalCallback);
                    }
                });
            }
        });
    }
}

function notExistsProj(searchProj, doNotExists, finalCallback) {
    var ret = {
        'status': false,
        'message': "",
        'object': null
    };

    if (searchProj.address === "") {
        ret.message = "Address is empty.";
        finalCallback(ret);
    } else {
        var cursor = db.get().collection(PROJ).find({
            'address': new RegExp(["^", searchProj.address, "$"].join(""), "i")
        });

        cursor.hasNext(function(err, proj) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                cursor.next(function(err, proj) {
                    if (err) {
                        doNotExists(searchProj, finalCallback);
                    } else {
                        ret.message = "Project already exists.";
                        ret.object = proj;
                        finalCallback(ret);
                    }
                });
            }
        });
    }
}
