var db = require('./db');

// finalCallback param = {
//     success: false,
//     message: '',
//     body: null
// }

function existsUser(user, toDo, finalCallback) {
    console.log("Searching user: ", user.addresses," from db.")
    var cursor = db.get().collection('users').find({'addresses':user.addresses})

    cursor.count(function(err, nb){
        if (err){
            finalCallback({status: false, message: err.message, body: null})
            return
        }
        if (nb != 0){
            console.log("User: ", user.addresses," exists.")
            toDo(user, finalCallback)
        } else {
            console.log("User: ", user.addresses," doesn't exists.")
            finalCallback({status: false, message: "User doesn't exists.", body: null})
        }
    })
}

function notExistsUser(user, toDo, finalCallback) {
    console.log("Searching user: ", user.addresses," from db.")
    var cursor = db.get().collection('users').find({'addresses':user.addresses})

    cursor.count(function(err, nb){
        if (err){
            finalCallback({status: false, message: err.message, body: null})
            return
        }
        if (nb != 0){
            console.log("User: ", user.addresses," exists.")
            finalCallback({status: false, message: "User already exists.", body: null})
        } else {
            console.log("User: ", user.addresses," doesn't exists.")
            toDo(user, finalCallback)
        }
    })
}

exports.getUserByAddress = function(addr, finalCallback) {
    console.log("Searching user for addr:", addr)
    var addrNonSensitive = new RegExp(["^", addr, "$"].join(""), "i")

    var userCursor = db.get().collection('users').find({'addresses': addrNonSensitive})
    userCursor.hasNext(function (err, user) {
        if (err) {
            finalCallback({status: false, message: err.message, body: null})
        } else {
            userCursor.next(function (err, user) {
                if (err) {
                    finalCallback({status: false, message: 'No such user.', body: null})
                } else {
                    finalCallback({status: true, message: 'No error.', body: user})
                }
            })
        }
    })
}

function addUser(user, finalCallback) {
    console.log("Adding new user.")

    db.get().collection('users').insertOne(user, function(err, result) {
        if (err) {
            finalCallback({status: false, message: err.message, body: null})
        } else {
            console.log("added new user in users collection.")
            finalCallback({status: true, message: "User added.", body: result})
        }
    })
}

exports.addNewUser = function (user, finalCallback) {
    notExistsUser(user, addUser, finalCallback)
}
