var db = require('./db');
var FUND = "fundraises";

exports.addFundraise = function(fundAddress, finalCallback, fundInfos) {
    var fundraise = {
        'address': fundAddress,
        'name': fundInfos && fundInfos.name ? fundInfos.name : "",
        'description': fundInfos && fundInfos.description ? fundInfos.description : "",
        'goal': fundInfos && fundInfos.goal ? fundInfos.goal : 0,
        'transactionHistoric': fundInfos && fundInfos.transactionHistoric ? fundInfos.transactionHistoric : [],
        'timeLimit': fundInfos && fundInfos.timeLimit ? fundInfos.timeLimit : 0,
        'outcome': fundInfos && fundInfos.outcome ? fundInfos.outcome : false
    };
    notExistsFund(fundraise, function(fund, finalCallback) {
        var ret = {
            'status': false,
            'message': "",
            'object': null
        };
        db.get().collection(FUND).insertOne(fund, function(err, fund) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                ret.status = true;
                ret.message = "Fundraise added.";
                ret.object = fund;
                finalCallback(ret);
            }
        });
    }, finalCallback);
};

exports.addTransaction = function(fundAddress, transaction, finalCallback) {
    var fund = {
        'address': fundAddress
    };
    existsFund(fund, function(fund, finalCallback) {
        var ret = {
            'status': false,
            'message': "",
            'object': null
        };
        db.get().collection(FUND).updateOne(fund, {
            $push: {
                'transactionHistoric': transaction
            }
        }, function(err, result) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                ret.status = true;
                ret.message = "Transaction added.";
                ret.object = fund;
                finalCallback(ret);
            }
        });
    }, finalCallback);
};

exports.endFundraise = function (fundAddress, outcome, finalCallback) {
    var fund = {'address': fundAddress};
    existsFund(fund, function (fund, finalCallback) {
        var ret = {
            'status': false,
            'message': "",
            'object': null
        };
        db.get().collection(FUND).updateOne(fund, {$set:{'outcome': outcome}}, function (err, result) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                ret.status = true;
                ret.message = "Fundraise ended.";
                ret.object = fund;
                finalCallback(ret);
            }
        });
    }, finalCallback);
};

function existsFund(fund, doExists, finalCallback) {
    var ret = {
        'status': false,
        'message': "",
        'object': null
    };

    if (fund.address === "") {
        ret.message = "Address is empty.";
        finalCallback(ret);
    } else {
        var cursor = db.get().collection(FUND).find({
            'address': new RegExp(["^", fund.address, "$"].join(""), "i")
        }, {
            '_id': false
        });

        cursor.hasNext(function(err, fund) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                cursor.next(function(err, fund) {
                    if (err) {
                        ret.message = "Fundraise doesn't exist.";
                        finalCallback(ret);
                    } else {
                        doExists(fund, finalCallback);
                    }
                });
            }
        });
    }
}

function notExistsFund(searchFund, doNotExists, finalCallback) {
    var ret = {
        'status': false,
        'message': "",
        'object': null
    };

    if (searchFund.address === "") {
        ret.message = "Address is empty.";
        finalCallback(ret);
    } else {
        var cursor = db.get().collection(FUND).find({
            'address': new RegExp(["^", searchFund.address, "$"].join(""), "i")
        }, {
            '_id': false
        });

        cursor.hasNext(function(err, fund) {
            if (err) {
                ret.message = err.message;
                finalCallback(ret);
            } else {
                cursor.next(function(err, fund) {
                    if (err) {
                        doNotExists(searchFund, finalCallback);
                    } else {
                        ret.message = "Fundraise already exists.";
                        ret.object = fund;
                        finalCallback(ret);
                    }
                });
            }
        });
    }
}
