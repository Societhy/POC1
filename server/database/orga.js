var db = require('./db');

// finalCallback param = {
//     success: false,
//     message: '',
//     body: null
// }

function existsOrga(orga, toDo, finalCallback) {
    // console.log("Searching orga: ", orga.name," from db.")
    var cursor = db.get().collection('orga').find({
        'name': orga.name
    });

    cursor.count(function(err, nb) {
        if (err) {
            finalCallback({
                status: false,
                message: err.message,
                body: null
            });
            return;
        }
        if (nb !== 0) {
            // console.log("Orga: ", orga.name," exists.")
            toDo(orga, finalCallback);
        } else {
            // console.log("Orga: ", orga.name," doesn't exists.")
            finalCallback({
                status: false,
                message: "Organisation doesn't exists.",
                body: null
            });
        }
    });
}

function notExistsOrga(orga, toDo, finalCallback) {
    // console.log("Searching orga: ", orga.name," from db.")
    var cursor = db.get().collection('orga').find({
        'name': orga.name
    });

    cursor.count(function(err, nb) {
        if (err) {
            finalCallback({
                status: false,
                message: err.message,
                body: null
            });
            return;
        }
        if (nb !== 0) {
            // console.log("Orga: ", orga.name," exists.")
            finalCallback({
                status: false,
                message: "Organisation already exists.",
                body: null
            });
        } else {
            // console.log("Orga: ", orga.name," doesn't exists.")
            toDo(orga, finalCallback);
        }
    });
}

exports.getOrgaByName = function(name, finalCallback) {
    // console.log("Searching orga for name:", name)
    var nameNonSensitive = new RegExp(["^", name, "$"].join(""), "i");

    var orgaCursor = db.get().collection('orga').find({
        'name': nameNonSensitive
    });
    orgaCursor.hasNext(function(err, orga) {
        if (err) {
            finalCallback({
                status: false,
                message: err.message
            });
        }
        orgaCursor.next(function(err, orga) {
            if (err) {
                finalCallback({
                    status: false,
                    message: 'No such organisation.',
                    body: null
                });
            } else {
                finalCallback({
                    status: true,
                    message: 'No error.',
                    body: orga
                });
            }
        });
    });
};

function addOrga(orga, finalCallback) {
    // console.log("Insertion of new orga.")

    db.get().collection('orga').insertOne(orga, function(err, result) {
        if (err) {
            finalCallback({
                status: false,
                message: err.message
            });
        } else {
            // console.log("Inserted new orga in orga collection.")
            finalCallback({
                status: true,
                message: "Organisation added.",
                body: null
            });
        }
    });
}

exports.addNewOrga = function(orga, finalCallback) {
    notExistsOrga(orga, addOrga, finalCallback);
};
