var db = require('./db');

// finalCallback param = {
//     success: false,
//     message: ''
// }

function existsOrga(orga, toDo, finalCallback) {
    console.log("Searching orga: ", orga.name," from db.")
    var cursor = db.get().collection('orga').find({'name':orga.name})

    cursor.count(function(err, nb){
        if (err){
            finalCallback({status: false, message: err.message})
            return
        }
        if (nb != 0) {
            console.log("Orga: ", orga.name," exists.")
            toDo(orga, finalCallback)
        } else {
            console.log("Orga: ", orga.name," doesn't exists.")
            finalCallback({status: false, message: "Orga doesn't exists."})
        }
    })
}

function notExistsOrga(orga, toDo, finalCallback) {
    console.log("Searching orga: ", orga.name," from db.")
    var cursor = db.get().collection('orga').find({'name':orga.name})

    cursor.count(function(err, nb){
        if (err){
            finalCallback({status: false, message: err.message})
            return
        }
        if (nb != 0) {
            console.log("Orga: ", orga.name," exists.")
            finalCallback({status: false, message: "Orga already exists."})
        } else {
            console.log("Orga: ", orga.name," doesn't exists.")
            toDo(orga, finalCallback)
        }
    })
}

exports.getOrgaByName = function (name, orgaCallback) {
    console.log("Searching orga for name:", name)
    var nameNonSensitive = new RegExp(["^", name, "$"].join(""), "i")

    var orgaCursor = db.get().collection('orga').find({'name': nameNonSensitive})
    orgaCursor.hasNext(function (err, orga) {
        assert.equal(err, null)
        orgaCursor.next(function (err, orga) {
            noOrga = (orga != undefined ? null : true)
            orgaCallback(noOrga, orga)
        })
    })
}

function addOrga(orga, finalCallback) {
    console.log("Insertion of new orga.")
    
    db.get().collection('orga').insertOne(orga, function(err, result) {
        if (err) {
            finalCallback({status: false, message: err.message})
        } else {
            console.log("Inserted new orga in orga collection.")
            finalCallback({status: false, message: "Orga added."})
        }
    })
}

exports.addOrga = function (orga, finalCallback) {
    notExistsOrga(orga, addOrga, finalCallback)
}
