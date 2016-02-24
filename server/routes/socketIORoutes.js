/**
 * Created by grout_r on 17/02/16.
 */

var path = require('path');
var ss =    require('socket.io-stream');
var fs = require('fs');
var user = require('../database/user');

var contractLocation = path.join(__dirname, "../../environments/development/contracts");
var Pudding = require("ether-pudding");
var PuddingLoader = require("ether-pudding/loader");
Pudding.setWeb3(global.web3);
PuddingLoader.load(contractLocation, Pudding, global, function(error, names) {
});

global.io.on('connection', function (socket) {

    ////emit
    //socket.emit('news', { hello: 'world' });
    //
    ////receive
    //socket.on('my other event', function (data) {
    //    console.log(data);
    //});

    console.log(socket);
    //socket.of('/organisation').emit('orgaData', {abi:BasicOrga.abi, binary:BasicOrga.binary, address:BasicOrga.address});

    socket.on('updateppic', function (data) {
        setTimeout(function()
        {
            user.changeProfilePic(data.addr, data.ppic, function(ret) {
                if (ret.status)
                {
                    socket.emit('OK', ret.message);
                }
                else
                {
                    socket.emit("KO", ret.message);
                }
            })
        }, 3000);
    });

    socket.on("newOrga", function () {
        socket.emit("newOrgaCode", {abi:BasicOrga.abi, binary:BasicOrga.binary});
    });

    socket.on("getOrgaData", function () {
        socket.emit("orgaData", {abi:BasicOrga.abi, binary:BasicOrga.binary});
    });

    socket.on("newOrgaAddress", function (data) {
        //store data.address in db
    });


    //files
    ss(socket).on("userimg", function (stream, data) {
        var buff;
        stream.on('data', function (lel) {
            buff += lel;
        });
        stream.on('end', function() {
            console.log(buff);
        });
    });
});
