var express = require('express');
var router = express.Router();
var user = require('../database/user');
var fs = require('fs');
var path = require("path");

var pages = {user:path.join(__dirname, "../views/Elements/Profile.hbs")};

var data = fs.readFileSync(pages.user).toString();

router.get('/', function(req, res, next) {
res.render('user', {Title: "Societhy", data:data});
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
