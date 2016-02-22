var express = require('express');
var router = express.Router();
var user = require('../database/newUser')

router.get('/', function(req, res, next)
{
    res.send('API FOR SOCIETHY. SEE DOCUMENTATION FOR FORMATTING REQUEST');
});

router.get('/user/:addr ', function(req, res, next)
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

module.exports = router;
