/**
 * Created by Roman on 26/02/2016.
 */

var express = require('express');
var router = express.Router();
var project = require('../database/project');
var fundraise = require('../database/fundraise');
var handlebars = require('handlebars')
var path = require("path");

router.get('/:id', function (req, res, next)
{console.log(req.params.id);
    project.getProject(req.params.id, function (ret) {
        if (!ret.status) {
            var err = new Error(ret.message);
            err.status = 404;
            next(err);
            return;
        }
        var i = 0;
        var id = 0;
        ret.object.fundDetail = [];
        if (ret.object.fundraiseList.length > 0) {
            for (var addr in ret.object.fundraiseList) {
                fundraise.getFundraise(ret.object.fundraiseList[addr], function (fund) {
                    if (!fund.status) {
                        var err = new Error(fund.message);
                        err.status = 404;
                        next(err);
                        return;
                    }
                    fund.object.id = id;
                    id++;
                    ret.object.fundDetail.push(fund.object);
                    if (i++ == ret.object.fundraiseList.length - 1)
                        res.render('project_profile', {project: ret.object});
                });
            }
        }
        else
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