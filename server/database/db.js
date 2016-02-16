var MongoClient = require('mongodb').MongoClient
var assert = require('assert')

var state = {
    db: null
}

exports.connect = function(url, done) {
    if (state.db)
    return done()
    MongoClient.connect(url, function(err, db) {
        if (err)
        return done(err)
        state.db = db
        done()
    })
}

exports.get = function() {
    return state.db
}

exports.close = function (done) {
    if (state.db){
        state.db.close(function(err, result){
            assert(err, null)
            state.db = null
            done(result)
        })
    }
}

// // fill database for test purpose
// fillDatabase: function() {
//     var user1 = {"addresses":["0x00000001", "0x0000000a"], "firstname":"user1", "lastname":"user1", "mail":"u@1.com", "photo":null, "listOrga":[], "transHisto":[], "infos":[]}
//     var user2 = {"addresses":["0x00000002", "0x0000000b"], "firstname":"user2", "lastname":"user2", "mail":"u@2.com", "photo":null, "listOrga":[], "transHisto":[], "infos":[]}
//     var user3 = {"addresses":["0x00000003", "0x0000000c"], "firstname":"user3", "lastname":"user3", "mail":"u@3.com", "photo":null, "listOrga":[], "transHisto":[], "infos":[]}
//     var user4 = {"addresses":["0x00000004", "0x0000000d"], "firstname":"user4", "lastname":"user4", "mail":"u@4.com", "photo":null, "listOrga":[], "transHisto":[], "infos":[]}
//     var user5 = {"addresses":["0x00000005", "0x0000000e"], "firstname":"user5", "lastname":"user5", "mail":"u@5.com", "photo":null, "listOrga":[], "transHisto":[], "infos":[]}
//     var user6 = {"addresses":["0x00000006", "0x0000000f"], "firstname":"user6", "lastname":"user6", "mail":"u@6.com", "photo":null, "listOrga":[], "transHisto":[], "infos":[]}
//     var user7 = {"addresses":["0x00000007", "0x00000010"], "firstname":"user7", "lastname":"user7", "mail":"u@7.com", "photo":null, "listOrga":[], "transHisto":[], "infos":[]}
//     var user8 = {"addresses":["0x00000008", "0x00000011"], "firstname":"user8", "lastname":"user8", "mail":"u@8.com", "photo":null, "listOrga":[], "transHisto":[], "infos":[]}
//     var user9 = {"addresses":["0x00000009", "0x00000012"], "firstname":"user9", "lastname":"user9", "mail":"u@9.com", "photo":null, "listOrga":[], "transHisto":[], "infos":[]}
//
//     var MSF = {"name":"Medecins Sans Frontiere", "memberList":[], "transHisto":[], "actualities":[]}
//     var CR = {"name":"Croix Rouge", "memberList":[], "transHisto":[], "actualities":[]}
//     var ACLF = {"name":"Action contre la faim", "memberList":[], "transHisto":[], "actualities":[]}
//
//     databaseAPI.existsUser(user1, function(user){console.log(user.addresses, "already exists");}, databaseAPI.insertNewUser)
//     databaseAPI.existsUser(user2, function(user){console.log(user.addresses, "already exists");}, databaseAPI.insertNewUser)
//     databaseAPI.existsUser(user3, function(user){console.log(user.addresses, "already exists");}, databaseAPI.insertNewUser)
//     databaseAPI.existsUser(user4, function(user){console.log(user.addresses, "already exists");}, databaseAPI.insertNewUser)
//     databaseAPI.existsUser(user5, function(user){console.log(user.addresses, "already exists");}, databaseAPI.insertNewUser)
//     databaseAPI.existsUser(user6, function(user){console.log(user.addresses, "already exists");}, databaseAPI.insertNewUser)
//     databaseAPI.existsUser(user7, function(user){console.log(user.addresses, "already exists");}, databaseAPI.insertNewUser)
//     databaseAPI.existsUser(user8, function(user){console.log(user.addresses, "already exists");}, databaseAPI.insertNewUser)
//     databaseAPI.existsUser(user9, function(user){console.log(user.addresses, "already exists");}, databaseAPI.insertNewUser)
//
//     databaseAPI.existsOrga(ACLF, function(orga){console.log(orga.name, "already exists");}, databaseAPI.insertNewOrga)
//     databaseAPI.existsOrga(CR, function(orga){console.log(orga.name, "already exists");}, databaseAPI.insertNewOrga)
//     databaseAPI.existsOrga(MSF, function(orga){console.log(orga.name, "already exists");}, databaseAPI.insertNewOrga)
// },

exports.addOrgaToUserListOrga = function(user, orga) {
    console.log("Adding", orga.name, "to list orga for", user.address)

    state.db.collection('users').updateOne({'addresses':user.addresses}, {$addToSet: {'listOrga': orga.name}}, function (err, result) {
        assert.equal(err, null)
    })
}

exports.addUserToOrgaMemberList = function(orga, user) {
    console.log("Adding", user.addresses, "to list member for", orga.name)

    state.db.collection('orga').updateOne({'name':orga.name}, {$addToSet : {memberList: {'user': user.addresses, 'right': {'admin':true, 'proposeDonation':true}}}}, function (err, result) {
        assert.equal(err, null)
    })
}

exports.userJoinOrga = function (user, orga) {
    var userCursor = state.db.collection('users').find({'addresses':user.addresses})

    userCursor.count(function (err, nb) {
        assert.equal(err, null)
        if (nb != 0){
            console.log("User exists")

            var orgaCursor = state.db.collection('orga').find({'name':orga.name})
            orgaCursor.count(function (err, nb) {
                assert.equal(err, null)
                if (nb != 0){
                    console.log("Orga exists")

                    databaseAPI.addOrgaToUserListOrga(user, orga)
                    databaseAPI.addUserToOrgaMemberList(orga, user)
                } else {
                    console.log("Orga doesn't exists")
                }
            })
        } else {
            console.log("User doesn't exists")
        }
    })
}
