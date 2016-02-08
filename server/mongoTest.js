var assert = require('assert');

var queriesCount = 0;

var databaseAPI = {

    finishedQuery: function (db) {
        queriesCount--;
        if (queriesCount == 0){
            console.log("Closing connection to db.");
            db.close();
        }
    },

    // fill database for test purpose
    filldatabase: function(db) {
        var user1 = {"addresses":["0x00000001", "0x0000000a"], "firstname":"user1", "lastname":"user1", "mail":"u@1.com", "photo":null, "listOrga":[], "transHisto":[], "infos":[]};
        var user2 = {"addresses":["0x00000002", "0x0000000b"], "firstname":"user3", "lastname":"user2", "mail":"u@2.com", "photo":null, "listOrga":[], "transHisto":[], "infos":[]};
        var user3 = {"addresses":["0x00000003", "0x0000000c"], "firstname":"user3", "lastname":"user3", "mail":"u@3.com", "photo":null, "listOrga":[], "transHisto":[], "infos":[]};
        var user4 = {"addresses":["0x00000004", "0x0000000d"], "firstname":"user4", "lastname":"user4", "mail":"u@4.com", "photo":null, "listOrga":[], "transHisto":[], "infos":[]};
        var user5 = {"addresses":["0x00000005", "0x0000000e"], "firstname":"user5", "lastname":"user5", "mail":"u@5.com", "photo":null, "listOrga":[], "transHisto":[], "infos":[]};
        var user6 = {"addresses":["0x00000006", "0x0000000f"], "firstname":"user6", "lastname":"user6", "mail":"u@6.com", "photo":null, "listOrga":[], "transHisto":[], "infos":[]};
        var user7 = {"addresses":["0x00000007", "0x00000010"], "firstname":"user7", "lastname":"user7", "mail":"u@7.com", "photo":null, "listOrga":[], "transHisto":[], "infos":[]};
        var user8 = {"addresses":["0x00000008", "0x00000011"], "firstname":"user8", "lastname":"user8", "mail":"u@8.com", "photo":null, "listOrga":[], "transHisto":[], "infos":[]};
        var user9 = {"addresses":["0x00000009", "0x00000012"], "firstname":"user9", "lastname":"user9", "mail":"u@9.com", "photo":null, "listOrga":[], "transHisto":[], "infos":[]};

        var MSF = {"name":"Medecins Sans Frontiere", "memberList":[], "transHisto":[], "actualities":[]};
        var CR = {"name":"Croix Rouge", "memberList":[], "transHisto":[], "actualities":[]};
        var ACLF = {"name":"Action contre la faim", "memberList":[], "transHisto":[], "actualities":[]};

        databaseAPI.existUser(db, user1, databaseAPI.insertNewUser);
        databaseAPI.existUser(db, user2, databaseAPI.insertNewUser);
        databaseAPI.existUser(db, user3, databaseAPI.insertNewUser);
        databaseAPI.existUser(db, user4, databaseAPI.insertNewUser);
        databaseAPI.existUser(db, user5, databaseAPI.insertNewUser);
        databaseAPI.existUser(db, user6, databaseAPI.insertNewUser);
        databaseAPI.existUser(db, user7, databaseAPI.insertNewUser);
        databaseAPI.existUser(db, user8, databaseAPI.insertNewUser);
        databaseAPI.existUser(db, user9, databaseAPI.insertNewUser);

        databaseAPI.existOrga(db, ACLF, databaseAPI.insertNewOrga);
        databaseAPI.existOrga(db, CR, databaseAPI.insertNewOrga);
        databaseAPI.existOrga(db, MSF, databaseAPI.insertNewOrga);
    },

    // Return first user object matching addr
    // @param db            The database instance.
    // @param addr          Address to search on the db.
    // @param userCallback  The result callback.
    getUserByAddress: function(db, addr, userCallback) {
        queriesCount++;
        console.log("Searching user for addr:", addr);
        var addrNonSensitive = new RegExp(["^", addr, "$"].join(""), "i");

        var userCursor = db.collection('users').find({'addresses': addrNonSensitive});
        userCursor.hasNext(function (err, user) {
            assert.equal(err, null);
            queriesCount++;
            userCursor.next(function (err, user) {
                userCallback(user);
                databaseAPI.finishedQuery(db);
            });
            databaseAPI.finishedQuery(db);
        });
    },

    insertNewUser: function (db, newUser) {
        queriesCount++;
        console.log("Insertion of new user.");

        db.collection('users').insertOne(newUser, function(err, result) {
            assert.equal(err, null);
            console.log("Inserted new user in users collection.");
            databaseAPI.finishedQuery(db);
        });
    },

    existUser: function (db, newUser, callback) {
        queriesCount++;
        console.log("Searching user from db.");
        var cursor = db.collection('users').find({'address':newUser.address});

        cursor.count(function(err, nb){
            assert.equal(err, null);
            if (nb != 0){
                console.log("User already exists.");
            } else {
                callback(db, newUser);
            }
            databaseAPI.finishedQuery(db);
        });
    },

    // Return first user object matching addr
    // @param db            The database instance.
    // @param name          Name to search on the db.
    // @param orgaCallback  The result callback.
    getOrgaByName : function (db, name, orgaCallback) {
        queriesCount++;
        console.log("Searching orga for name:", name);
        var nameNonSensitive = new RegExp(["^", name, "$"].join(""), "i");

        var orgaCursor = db.collection('orga').find({'name': nameNonSensitive});
        orgaCursor.hasNext(function (err, orga) {
            assert.equal(err, null);
            queriesCount++;
            orgaCursor.next(function (err, orga) {
                orgaCallback(orga);
                databaseAPI.finishedQuery(db);
            });
            databaseAPI.finishedQuery(db);
        });
    },

    insertNewOrga : function (db, newOrga) {
        queriesCount++;
        console.log("Insertion of new orga.");

        db.collection('orga').insertOne(newOrga, function(err, result) {
            assert.equal(err, null);
            console.log("Inserted new orga in orga collection.");
            databaseAPI.finishedQuery(db);
        });
    },

    existOrga : function (db, newOrga, callback) {
        queriesCount++;
        console.log("Searching orga from db.");
        var cursor = db.collection('orga').find({'name':newOrga.name});

        cursor.count(function(err, nb){
            assert.equal(err, null);
            if (nb != 0) {
                console.log("Orga already exists.");
            } else {
                callback(db, newOrga);
            }
            databaseAPI.finishedQuery(db);
        });
    },

    addOrgaToUserListOrga : function(db, newUser, newOrga) {
        queriesCount++;
        console.log("Adding", newOrga.name, "to list orga for", newUser.address);

        db.collection('users').updateOne({'address':newUser.address}, {$addToSet: {'listOrga': newOrga.name}}, function (err, result) {
            assert.equal(err, null);
            databaseAPI.finishedQuery(db);
        });
    },

    addUserToOrgaMemberList : function(db, newOrga, newUser) {
        queriesCount++;
        console.log("Adding", newUser.address, "to list member for", newOrga.name);

        db.collection('orga').updateOne({'name':newOrga.name}, {$addToSet : {memberList: {'user': newUser.address, 'right': {'admin':true, 'proposeDonation':true}}}}, function (err, result) {
            assert.equal(err, null);
            databaseAPI.finishedQuery(db);
        });
    },

    userJoinOrga : function (db, newUser, newOrga) {
        queriesCount++;
        var userCursor = db.collection('users').find({'address':newUser.address});

        userCursor.count(function (err, nb) {
            assert.equal(err, null);
            if (nb != 0){
                console.log("User exists");

                queriesCount++;
                var orgaCursor = db.collection('orga').find({'name':newOrga.name});

                orgaCursor.count(function (err, nb) {
                    assert.equal(err, null);
                    if (nb != 0){
                        console.log("Orga exists");

                        databaseAPI.addOrgaToUserListOrga(db, newUser, newOrga);
                        databaseAPI.addUserToOrgaMemberList(db, newOrga, newUser);
                    } else {
                        console.log("Orga doesn't exists");
                    }
                    databaseAPI.finishedQuery(db);
                });
            } else {
                console.log("User doesn't exists");
            }
            databaseAPI.finishedQuery(db);
        });
    },
};

module.exports = databaseAPI;
