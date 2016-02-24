/**
 * Created by Roman on 09/02/2016.
 */

var express = require('express');
var router = express.Router();
var orga = require('../database/orga');

var path = require("path");


router.get('/', function (req, res, next)
{

    orga.getAllOrgas(function (ret) {
        if (!ret.status) {
            var err = new Error(ret.message);
            err.status = 404;
            next(err);
            return;
        }
        console.log(ret.object);
        res.render('organisation_homepage', {Title: "Societhy", orgas:ret.object});
    });
});

router.get('/create', function(req, res, next) {
    res.render('organisation_create');
});

router.get('/:addr', function(req, res, next)
{
    var main = res;
    main.render('organisation');

    orga.getOrga(req.params.addr, function (ret) {
        if (!ret.status)
        {
            var err = new Error(ret.message);
            err.status = 404;
            next(err);
            return;
        }
        res.render('organisation', {
            name: ret.object.name,
            address: ret.object.address
        });
    });
});

module.exports = router;
