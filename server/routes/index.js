var express = require('express');
var orga = require('../database/orga');
var router = express.Router();
var    fs = require('fs');


    router.get('/', function(req, res, next) {
        orga.getAllOrgas(function (ret)
        {
            if (!ret.status)
            {
                var err = new Error(ret.message);
                err.status = 404;
                next(err);
                return;
            }
            res.render('index', {Title: "Societhy", orgas:ret.object});
        });
    });


/* GET home page. */

module.exports = router;

