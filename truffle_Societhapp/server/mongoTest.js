var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// example for member in memberList {"user":"0xade87de5", "right":{"admin":true, "proposeDonation":true}}

var url = "mongodb://localhost:27017/test";
var queriesCount = 0;

var finishedQuery = function (db) {
    queriesCount--;
    if (queriesCount == 0){
        console.log("Closing connection to db.");
        db.close();
    }
}

var insertNewUser = function (db, collection, newUser) {
    queriesCount++;
    console.log("Insertion of new user.");

    collection.insertOne(newUser, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted new user in users collection.");
        finishedQuery(db);
    });
};

var existUser = function (db, newUser, callback) {
    queriesCount++;
    console.log("Searching user from db.");
    var collection = db.collection('users');
    var cursor = collection.find({'address':newUser.address});

    cursor.count(function(err, nb){
        assert.equal(err, null);
        if (nb != 0){
            console.log("User already exists.");
        } else {
            callback(db, collection, newUser);
        }
        finishedQuery(db);
    });
};

var insertNewOrga = function (db, collection, newOrga) {
    queriesCount++;
    console.log("Insertion of new orga.");

    collection.insertOne(newOrga, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted new orga in orga collection.");
        finishedQuery(db);
    });
};

var existOrga = function (db, newOrga, callback) {
    queriesCount++;
    console.log("Searching orga from db.");
    var collection = db.collection('orga');
    var cursor = collection.find({'name':newOrga.name});

    cursor.count(function(err, nb){
        assert.equal(err, null);
        if (nb != 0) {
            console.log("Orga already exists.");
        } else {
            callback(db, collection, newOrga);
        }
        finishedQuery(db);
    });
}

var userJoinOrga = function (db, newUser, newOrga) {
    queriesCount++;
    var collection = db.collection('orga');
    var cursor = collection.find({'name':newOrga.name});

    cursor.count(function (err, nb) {
        assert.equal(err, null);
        if (nb != 0){
            console.log("Orga exists");
        } else {
            console.log("Orga doesn't exists");
        }
        finishedQuery(db);
    });
}

console.log("Connection to db...");
MongoClient.connect(url, function(err, db) {
    assert.equal(err, null);
    console.log("Connected to db.");

    var newUser = {"address":"0xa51c9ea5", "mail":"tata@test.com", "photo":null, "listOrga":[], "transHisto":[], "infos":[]};
    var newOrga = {"name":"Croix Rouge", "memberList":[], "transHisto":[], "actualities":[]};

    existUser(db, newUser, insertNewUser);
    existOrga(db, newOrga, insertNewOrga);

    userJoinOrga(db, newUser, newOrga);
});
