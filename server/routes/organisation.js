/**
 * Created by Roman on 09/02/2016.
 */

var express = require('express');
var router = express.Router();
var orga = require('../database/orga');


var handlebars = require('handlebars'),
    fs = require('fs');

var pages = {user:"Elements/Orga.hbs"};

function getRender(callback) {
    for (var key in pages) {
        fs.readFile(pages[key], 'utf-8', function (err, data) {
            pages[key] = data;
        });
    }
    callback();
}

function callback() {
    router.get('/', function (req, res, next)
    {
        res.render('organisation_homepage', {data: pages});
    });
}
getRender(callback);

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
