/**
 * Created by Roman on 09/02/2016.
 */

var express = require('express');
var router = express.Router();
var orga = require('../database/orga');


var fs = require('fs');
var path = require("path");

var pages = {user:path.join(__dirname, "../views/Elements/Orga.hbs")};

var data = fs.readFileSync(pages.user).toString();

router.get('/', function (req, res, next)
{
    res.render('organisation_homepage', {data: data});
});

router.get('/create', function(req, res, next)
{
    res.render('organisation_create');
});

router.get('/:addr', function(req, res, next)
{
    orga.getOrga(req.params.addr, function (ret) {
        if (!ret.status)
        {
            var err = new Error(ret.message);
            err.status = 404;
            next(err);
            return;
        }
        res.render('organisation', {name: ret.body.name, memberList: ret.body.memberList, address:ret.body.address});
    });
});

module.exports = router;
