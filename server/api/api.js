var express = require('express');
var router = express.Router();
var user = require('../database/user');
var orga = require('../database/orga');
var proj = require('../database/project');

router.get('/', function(req, res, next)
{
    res.send('API FOR SOCIETHY. SEE DOCUMENTATION FOR FORMATTING REQUEST');
});

router.get('/user/all', function(req, res, next)
{
    user.getAllUsers(function(ret) {
        if (!ret.status)
        {
            console.log(ret);
            var err = new Error(ret.message);
            err.status = 404;
            next(err);
            return;
        }
        else
            res.send(ret.object);
    });
});

router.get('/user/:addr', function(req, res, next)
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
            res.send(ret.object);
    });
});

router.get('/orga/all', function(req, res, next)
{
    user.getAllOrgas(function(ret) {
        if (!ret.status)
        {
            console.log(ret);
            var err = new Error(ret.message);
            err.status = 404;
            next(err);
            return;
        }
        else
            res.send(ret.object);
    });
});

router.get('/orga/:addr', function(req, res, next)
{
    orga.getOrga(req.params.addr, function (ret)
    {
        if (!ret.status)
        {
            var err = new Error(ret.message);
            err.status = 404;
            next(err);
            return;
        }
        res.send(ret.object);
    });
});

router.get('project/:addr', function(req, res, next)
{
    proj.getProject("0xaa33acc9", function(ret)
    {
        if (!ret.status)
        {
            var err = new Error(ret.message);
            err.status = 404;
            next(err);
            return;
        }
        res.send(ret.object);
    });
});

module.exports = router;
