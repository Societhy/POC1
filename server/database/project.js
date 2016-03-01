var db = require('./db');
var PROJ = "projects";

exports.addProject = function(projAddress, finalCallback, projInfos) {
    var project = {
        'address': projAddress,
        'name': projInfos && projInfos.name ? projInfos.name : "",
        'orgaAddress': projInfos && projInfos.orgaAddress ? projInfos.orgaAddress : "",
        'description': projInfos && projInfos.description ? projInfos.description : "",
        'proposalList': projInfos && projInfos.proposalList ? projInfos.proposalList : [],
        'fundraiseList': projInfos && projInfos.fundraiseList ? projInfos.fundraiseList : [],
        'memberList': projInfos && projInfos.memberList ? projInfos.memberList : [],
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

exports.deleteProject = function(projAddress, finalCallback) {
    var ret = {
        'status': false,
        'message': "",
        'object': null
    };
    db.get().collection(PROJ).deleteOne({
        'address': projAddress
    }, function(err, res) {
        if (err) {
            ret.message = err.message;
            finalCallback(ret);
        } else {
            ret.status = true;
            ret.message = "Project deleted.";
            ret.object = res.deletedCount;
            finalCallback(ret);
        }
    });
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
        '_id': false
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
        '_id': false
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
            $addToSet: {
                'memberList': userAddress
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

exports.addProposal = function(projAddr, newProposal, finalCallback) {
    var project = {
        'address': projAddr
    };
    existsProj(project, function(proj, finalCallback) {
        var ret = {
            'status': false,
            'message': "",
            'object': null
        };
        db.get().collection(PROJ).updateOne(proj, {
            $push: {
                'proposalList': newProposal
            }
        }, function(err, result) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                ret.status = true;
                ret.message = "Proposal added.";
                ret.object = proj;
                finalCallback(ret);
            }
        });
    }, finalCallback);
};

exports.addVoteToProposal = function(projAddr, id, vote, finalCallback) {
    var project = {
        'address': projAddr
    };
    existsProj(project, function(proj, finalCallback) {
        var ret = {
            'status': false,
            'message': "",
            'object': null
        };

        var JSobject = {};
        JSobject[vote ? "proposalList.$.voteFor" : "proposalList.$.voteAgainst"] = 1;
        db.get().collection(PROJ).updateOne({
            'address': proj.address,
            'proposalList.id': id
        }, {
            $inc: JSobject
        }, function(err, result) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                ret.status = true;
                ret.message = "Vote added.";
                ret.object = proj;
                finalCallback(ret);
            }
        });
    }, finalCallback);
};

exports.endProposal = function (projAddr, id, outcome, finalCallback) {
    var project = {
        'address': projAddr
    };
    existsProj(project, function(proj, finalCallback) {
        var ret = {
            'status': false,
            'message': "",
            'object': null
        };

        db.get().collection(PROJ).updateOne({
            'address': proj.address,
            'proposalList.id': id
        }, {
            $set: {
                'proposalList.$.outcome': outcome
            }
        }, function(err, result) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                ret.status = true;
                ret.message = "Proposal changed.";
                ret.object = proj;
                finalCallback(ret);
            }
        });
    }, finalCallback);
};

exports.addFundraiseAddr = function (projAddr, fundAddress, finalCallback) {
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
                'fundraiseList': fundAddress
            }
        }, function(err, result) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                ret.status = true;
                ret.message = "Fundraise address added.";
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
        }, {
            '_id': false
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
        }, {
            '_id': false
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
