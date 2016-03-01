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

    socket.on("getProjData", function (data) {
        socket.emit("projData", {
            'abi': Project.abi,
            'binary': Project.binary
        });
    });

    socket.on("getFundraiseData", function() {
        socket.emit("fundraiseData", {
            'abi': Fundraise.abi,
            'binary': Fundraise.binary
        });
    });

    socket.on("userJoinedOrga", function(data) {
        user.addOrgaAddress(data.userAddr, data.orgAddr, function(ret) {
            console.log(ret);
        });
        orga.addMemberAddress(data.orgAddr, data.userAddr, function(ret) {
            console.log(ret);
        });
    });

    socket.on("orgaDeleted", function(data) {
        orga.deleteOrga(data.orgAddr, function(ret) {
            if (!ret.status) {
                console.log(ret.message);
            } else {
                console.log(ret.message, ret.object);
                user.deleteOrgaAddressAllUsers(data.orgAddr, function(ret) {
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
            console.log(ret);
        }, infos);
        user.addOrgaAddress(data.userAddr, data.orgAddr, function(ret) {
            console.log(ret);
        });
    });

    socket.on("newProject", function(data) {
        proj.addProject(data.projAddr, function(ret) {
            console.log(ret);
        }, {
            'name': data.projName,
            'description': data.projDesc,
            'orgaAddress': data.orgAddr
        });
        orga.addProjectAddress(data.orgAddr, data.projAddr, function(ret) {
            console.log(ret);
        });
    });

    socket.on("getUser", function(data) {
        user.getUser(data.addr, function(ret) {
            if (!ret.status)
                socket.emit("userNotFound", null);
            else
                socket.emit("userData", ret.object);
        });
    });

    socket.on("newDonationToOrga", function(data) {
        var transaction = {
            hash: data.userAddr.concat(data.orgAddr),
            date: (new Date()).toJSON(),
            from: data.userAddr,
            to: data.orgAddr,
            amount: data.amount
        };
        user.addTransaction(data.userAddr, transaction, function(ret) {
            console.log(ret);
        });
        orga.addTransaction(data.orgAddr, transaction, function(ret) {
            console.log(ret);
        });
    });

    socket.on("userJoinedProject", function(data) {
        user.addProjectAddress(data.userAddr, data.projAddr, function(ret) {
            console.log(ret);
        });
        proj.addMemberAddress(data.projAddr, data.userAddr, function(ret) {
            console.log(ret);
        });
    });

    socket.on("newProposal", function(data) {
        var proposal = {
            'id': data.id,
            'name': data.name,
            'description': data.description,
            'amount': data.amount,
            'beneficiary': data.beneficiary,
            'timeLimit': data.timeLimit,
            'voteAgainst': 0,
            'voteFor': 0,
            'outcome': false
        };
        proj.addProposal(data.projAddr, proposal, function (ret) {
            console.log(ret);
        });
    });

    socket.on("newVote", function(data) {
        proj.addVoteToProposal(data.projAddr, data.id, data.vote, function (ret) {
            console.log(ret);
        });
    });

    socket.on("newFundraise", function(data) {

    });

    socket.on("projectDeleted", function(data) {
        proj.deleteProject(data.projAddr, function(ret) {
            console.log(ret);
        });
    });

    socket.on("proposalEnded", function(data) {
        proj.endProposal(data.projAddr, data.id, data.outcome, function (ret) {
            console.log(ret);
        });
    });

    socket.on("endFundraise", function(data) {

    });

    socket.on("newDonationToFundraise", function(data) {

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
