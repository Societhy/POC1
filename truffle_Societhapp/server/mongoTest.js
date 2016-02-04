var assert = require('assert');

// example for member in memberList {"user":"0xade87de5", "right":{"admin":true, "proposeDonation":true}}

var queriesCount = 0;
    
var database = {

    finishedQuery: function (db) {
	queriesCount--;
	if (queriesCount == 0){
            console.log("Closing connection to db.");
            db.close();
	}
    },

    insertNewUser: function (db, newUser) {
    	queriesCount++;
    	console.log("Insertion of new user.");

    	db.collection('users').insertOne(newUser, function(err, result) {
            assert.equal(err, null);
            console.log("Inserted new user in users collection.");
            database.finishedQuery(db);
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
            database.finishedQuery(db);
	});
    },

    insertNewOrga : function (db, newOrga) {
	queriesCount++;
	console.log("Insertion of new orga.");

	db.collection('orga').insertOne(newOrga, function(err, result) {
            assert.equal(err, null);
            console.log("Inserted new orga in orga collection.");
            database.finishedQuery(db);
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
            database.finishedQuery(db);
	});
    },

    addOrgaToUserListOrga : function(db, newUser, newOrga) {
	queriesCount++;
	console.log("Adding", newOrga.name, "to list orga for", newUser.address);

	db.collection('users').updateOne({'address':newUser.address}, {$push: {'listOrga': newOrga.name}}, function (err, result) {
            assert.equal(err, null);
            database.finishedQuery(db);
	});
    },

    addUserToOrgaMemberList : function(db, newOrga, newUser) {
	queriesCount++;
	console.log("Adding", newUser.address, "to list member for", newOrga.name);

	db.collection('orga').updateOne({'name':newOrga.name}, {$push : {memberList: {'user': newUser.address, 'right': {'admin':true, 'proposeDonation':true}}}}, function (err, result) {
            assert.equal(err, null);
            database.finishedQuery(db);
	});
    },

    userJoinOrga : function (db, newUser, newOrga) {
	queriesCount++;
	var cursor = db.collection('orga').find({'name':newOrga.name});

	cursor.count(function (err, nb) {
            assert.equal(err, null);
            if (nb != 0){
		console.log("Orga exists");
		database.addOrgaToUserListOrga(db, newUser, newOrga);
		database.addUserToOrgaMemberList(db, newOrga, newUser);
            } else {
		console.log("Orga doesn't exists");
            }
            database.finishedQuery(db);
	});
    },

};

module.exports = database;
