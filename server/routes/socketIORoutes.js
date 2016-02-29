/**
 * Created by grout_r on 17/02/16.
 */

var path = require('path');
var ss = require('socket.io-stream');
var fs = require('fs');
var user = require('../database/user');
var orga = require('../database/orga');
var proj = require('../database/project');


var contractLocation = path.join(__dirname, "../../environments/development/contracts");
var Pudding = require("ether-pudding");
var PuddingLoader = require("ether-pudding/loader");
Pudding.setWeb3(global.web3);
PuddingLoader.load(contractLocation, Pudding, global, function(error, names) {});

global.io.on('connection', function(socket) {

    socket.on('updateppic', function(data) {
        setTimeout(function() {
            user.changeProfilePic(data.addr, data.ppic, function(ret) {
                if (ret.status) {
                    socket.emit('OK', ret.message);
                } else {
                    socket.emit("KO", ret.message);
                }
            });
        }, 3000);
    });

    socket.on("newOrga", function() {
        socket.emit("newOrgaCode", {
            'abi': BasicOrga.abi,
            'binary': BasicOrga.binary
        });
    });

    socket.on("getOrgaData", function() {
        socket.emit("orgaData", {
            'abi': BasicOrga.abi,
            'binary': BasicOrga.binary
        });
    });

    socket.on("userJoinedOrga", function(data) {
        user.addOrgaAddress(data.userAddr, data.orgAddr, function(ret) {
            if (!ret.status) {
                console.log(ret.message);
            } else {
                console.log(ret.message, ret.object);
            }
        });
        orga.addMemberAddress(data.orgAddr, data.userAddr, function(ret) {
            if (!ret.status) {
                console.log(ret.message);
            } else {
                console.log(ret.message, ret.object);
            }
        });
    });

    socket.on("orgaDeleted", function(data) {
        orga.deleteOrga(data.orgAddr, function(ret) {
            if (!ret.status) {
                console.log(ret.message);
            } else {
                console.log(ret.message, ret.object);
                user.deleteOrgaAddressAllUsers(data.orgAddr, function (ret) {
                    console.log(ret);
                });
            }
        });
    });

    socket.on("newOrgaAddress", function(data) {
        //store data.address in db
        var infos = {
            'name': data.orgName,
            'created': {
                'by': data.userAddr,
                'at': (new Date()).toJSON()
            }
        };
        orga.addOrga(data.orgAddr, function(ret) {
            if (!ret.status) {
                console.log(ret.message);
            } else {
                console.log(ret.message, ret.object);
            }
        }, infos);
        user.addOrgaAddress(data.userAddr, data.orgAddr, function (ret) {
            console.log(ret);
        });
    });

    socket.on("newProject", function(data) {
        proj.addProject(data.projAddr, function(ret) {
            if (!ret.status)
                console.log(ret.message);
            else
                console.log('Project added');
        }, {
            'name': data.projName,
            'description' : data.projDesc,
            'orgaAddress' : data.orgAddr
        });
        orga.addProjectAddress(data.orgAddr, data.projAddr, function (ret) {
            console.log(ret);
        });
    });

    socket.on("getUser", function (data) {
        user.getUser(data.addr, function (ret) {
            if (!ret.status)
                socket.emit("userNotFound", null);
            else
                socket.emit("userData", ret.object);
        });
    });

    socket.on("getProjData", function (data) {
        socket.emit("projData", {
            'abi': Project.abi,
            'binary': Project.binary
        });
    });

    socket.on("userRegisterProj", function(data) {
        // add username:username, userAddr:account, projAddr:contractInstance.address to db
        user.addProjectAddress(data.userAddr, data.projAddr, function (ret) {
            console.log(ret);
        });
        project.addMemberAddress(data.projAddr, data.userAddr, function (ret) {
            console.log(ret);
        });
    });

    socket.on("newProposal", function(data) {
        // add id:tx, propName:name, desc:description, goal:goal, deadline:timeLimit, pdeadline:proposalLimit
    });

    socket.on("newVote", function(data) {
        // add id:id, vote:vote, userAddr:account, projAddr:contractInstance.address
        // add vote au votes pour ou contre de la proposition ayant l'ID id.
    });

    //files
    ss(socket).on("userimg", function(stream, data) {
        var buff;
        stream.on('data', function(lel) {
            buff += lel;
        });
        stream.on('end', function() {
            console.log(buff);
        });
    });

});
