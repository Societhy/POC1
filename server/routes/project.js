/**
 * Created by Roman on 26/02/2016.
 */

var express = require('express');
var router = express.Router();
var project = require('../database/project');

var path = require("path");

router.get('/:id', function (req, res, next)
{
    project.getProject(req.params.id, function (ret) {
        if (!ret.status) {
            var err = new Error(ret.message);
            err.status = 404;
            next(err);
            return;
        }
        console.log(ret.object);
        res.render('project_profile', {project: ret.object});
    });
});

router.get('/', function(req, res, next) {
    project.getAllProjects(function (ret) {
        if (!ret.status) {
            var err = new Error(ret.message);
            err.status = 404;
            next(err);
            return;
        }
        console.log(ret.object);
        res.render('project_homepage', {project: ret.object});
    });
});

module.exports = router;