var express = require('express');

var router = express.Router();
var handlebars = require('handlebars'),
    fs = require('fs');

var pages = {user:"Elements/Profile.hbs"};

function getRender(callback) {
    for (var key in pages)
    {
        fs.readFile(pages[key],'utf-8', function (err, data) {
            pages[key] = data;
        });
    }
    callback();
}

function callback() {
    router.get('/', function(req, res, next) {
        res.render('index', {Title: "Societhy", data:pages});
    });
}


/* GET home page. */
getRender(callback);

module.exports = router;

