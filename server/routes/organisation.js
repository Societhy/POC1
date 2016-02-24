/**
 * Created by Roman on 09/02/2016.
 */

var express = require('express');
var router = express.Router();
var orga = require('../database/orga');


var path = require("path");


router.get('/', function (req, res, next)
{
    var main = res;
    main.render('Elements/Orga');
    res.render('organisation_homepage', {data: main.toString});
});

router.get('/create', function(req, res, next)
{
    res.render('organisation_create');
});

router.get('/:name', function(req, res, next)
{
    orga.getOrgaByName(req.params.name, function (ret)
    {
        if (!ret.status)
        {
            var err = new Error(ret.message);
            err.status = 404;
            next(err);
            return;
        }
        res.render('organisation', {name: ret.body.name, memberList: ret.body.memberList,  });
    });
});

module.exports = router;
