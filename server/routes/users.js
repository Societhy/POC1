var express = require('express');
var router = express.Router();
var user = require('../database/user');

var handlebars = require('handlebars'),
    fs = require('fs');

var pages = {user:"Elements/Profile.hbs"};

function getRender(callback) {
  for (var key in pages)
  {
    fs.readFile(pages[key],'utf-8', function (err, data) {
      pages[key] = data.toString();
    });
  }
  callback();
}

function callback() {
  router.get('/', function(req, res, next) {
    res.render('users', {Title: "Societhy", data:pages});
  });
}


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
getRender(callback);
module.exports = router;
