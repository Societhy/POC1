var express = require('express');
var router = express.Router();
var user = require('../database/user');
var fs = require('fs');
var path = require("path");

process.env['VARIABLE'] = 'value';


router.get('/', function(req, res, next) {
    user.getAllUsers(function (ret) {
        if (!ret.status) {
            var err = new Error(ret.message);
            err.status = 404;
            next(err);
            return;
        }
        console.log(ret.object);
        res.render('user', {Title: "Societhy", users: ret.object});
    });
});


router.get('/:addr', function(req, res, next)
{
    var addr = req.params.addr;

    user.getUser(addr, function(ret) {
        if (!ret.status)
        {
            console.log(ret);
            var err = new Error(ret.message);
            err.status = 404;
            next(err);
            return;
        }
        else
            res.render('user', ret.object);
    });
});
module.exports = router;
