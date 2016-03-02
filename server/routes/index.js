var express = require('express');
var orga = require('../database/orga');
var user = require('../database/user');
var router = express.Router();
var    fs = require('fs');


    router.get('/', function(req, res, next) {
        orga.getAllOrgas(function (ret) {
            if (!ret.status) {
                var err = new Error(ret.message);
                err.status = 404;
                next(err);
                return;
            }
            user.getAllUsers(function (retUser) {
                if (!retUser.status) {
                    var err = new Error(retUser.message);
                    err.status = 404;
                    next(err);
                    return;
                }
                res.render('index', {Title: "Societhy", orgas: ret.object, users: retUser.object});
            });
        });
    });


/* GET home page. */

module.exports = router;

