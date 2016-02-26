/**
 * Created by Roman on 26/02/2016.
 */

var express = require('express');
var router = express.Router();
var project = require('../database/project');

var path = require("path");

router.get('/:id', function (req, res, next)
{
    res.send(req.params.id);
});

module.exports = router;